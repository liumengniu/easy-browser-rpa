/**
 * electron入口文件
 * @author Kevin
 * @Date: 2024-4-16
 */
const {app, BrowserWindow, BrowserView, Menu, ipcMain, shell, dialog} = require("electron");
const path = require("path");
const cmd = require("node-cmd");
const mode = process.argv[2];
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
const fs = require("fs");
const menuUtils = require('./menuUtils')
log.transports.file.level = "debug";


let mainWindow;

/**
 * 崩溃日志上报
 * 崩溃报告在上传之前会临时存放在应用程序的用户数据目录下（Windows 和 MacOS 上文件夹名为 "Crashpad"，Linux 上是 "Crash Reports"）
 */
// crashReporter.start({ submitURL: 'http://localhost:4000/crashReporter', productName: 'electron-start' })

/**
 *=========================================================================
 *=                                                                       =
 *=                          1.创建window                                  =
 *=                                                                       =
 *=========================================================================
 */
const createWindow = () => {
	
	const Menus = [
		{
			label: '设置',
			submenu: [
				{label: '修改采集文件保存地址', click: menuUtils.changeSavePath},
			]
		},
		{
			label: '帮助',
			submenu: [
				{label: '黑暗模式', click: () =>menuUtils.changeColorMode(mainWindow)},
				{label: '说明', click: menuUtils.showAppDescription},
				{
					label: '重启软件', click: () => {
						app.relaunch();
						if (process.platform !== "darwin") app.quit();
						app.exit(0);
					}
				},
				{
					label: '退出', click: () => {
						if (process.platform !== "darwin") app.quit();
						app.exit(0);
					}
				}
			]
		},
	];
	
	/**
	 * 1、实例化桌面窗口
	 * @type {Electron.Menu}
	 */
	const mainMenu = Menu.buildFromTemplate(Menus);
	Menu.setApplicationMenu(mainMenu);
	mainWindow = new BrowserWindow({
		// transparent: true,
		// useContentSize: true,
		// frame: false,
		icon: process.platform === "linux" ? path.join(__dirname, "../../", "./static/icons/256x256.png") : path.join(__dirname, "../../", `./static/icons/favicon.ico`),
		webPreferences: {
			webviewTag: true,
			preload: path.join(__dirname, "preload.js"),
			// 不设置这行，会报 require is not defined
			nodeIntegration: true,
			contextIsolation: true,
			allowRunningInsecureContent: true,
		},
	});
	
	mainWindow.on("ready-to-show", function () {
		mainWindow.show(); // 初始化后再显示
	});
	
	// mainWindow.maximize();
	
	// 加载 index.html
	if (mode === "dev") {
		mainWindow.loadURL("http://localhost:1819");
	} else if (mode === "test") {
		mainWindow.loadFile(path.join(__dirname, "../../", "./build/index.html"));
	} else {
		mainWindow.loadFile(path.join(__dirname, "../../", "./build/index.html")); // 测试环境
	}
	
	// 开发/测试环境，打开开发者工具
	if (mode === "dev" || mode === "test") {
		// mainWindow.webContents.openDevTools();
	}
	/**
	 * 初始化默认配置
	 */
	menuUtils.initSetting()
};

/**
 *=========================================================================
 *=                                                                       =
 *=                          2.主进程的回调                                 =
 *=                                                                       =
 *=========================================================================
 */

/**
 * 单例窗体
 * @type {boolean}
 */
const goTheLock = app.requestSingleInstanceLock();
if (!goTheLock) {
	app.quit();
} else {
	app.on("second-instance", (event, commandLine, workingDirectory) => {
		// 当运行第二个实例时,将会聚焦到mainWindow这个窗口
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
			mainWindow.show();
		}
	});
	app.whenReady().then(() => {
		createWindow();
		app.on("activate", () => {
			if (BrowserWindow.getAllWindows().length === 0) createWindow();
		});
	});
	app.on("window-all-closed", () => {
		if (process.platform !== "darwin") app.quit();
	});
	app.on('before-quit', () => {
	
	});
	app.on("quit", () => {
		if (process.platform !== "darwin") app.quit();
	});
}

/**
 *=========================================================================
 *=                                                                       =
 *=                       3.渲染进程的回调                                   =
 *=                                                                       =
 *=========================================================================
 */

/**
 * 2、路由切换
 */
function changeWidth(mainWindow) {
	if (!mainWindow.isFullScreen()) {
		mainWindow.maximize();
		mainWindow.setMinimumSize(500, 360);
	}
}

/**
 * 3、接收路由切换的通讯
 */
ipcMain.on("currentRouter", (event, arg) => {
	// 动态调整宽度
	if (arg === "/home") {
		changeWidth(mainWindow);
	} else if (arg === "change-password") {
		changeWidth(mainWindow);
	} else if (arg === "/login") {
		changeWidth(mainWindow);
		if (!mainWindow.isFullScreen()) {
			// mainWindow.unmaximize()
		}
	}
});

/**
 * 4、最小化
 */
ipcMain.on("window-min", (event, arg) => {
	mainWindow.minimize();
});
/**
 *  5、最大化
 */
ipcMain.on("window-max", (event, arg) => {
	if (mainWindow.isMaximized()) {
		mainWindow.restore();
	} else {
		mainWindow.maximize();
	}
});
/**
 *  6、关闭
 */
ipcMain.on("window-close", (event, arg) => {
	mainWindow.close();
	app.quit();
});

/**
 *  7、webview
 */
ipcMain.on("init-browser-view", (event, arg) => {
	const { screen } = require("electron");
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	const view = new BrowserView();
	mainWindow.setBrowserView(view);
	
	view.setBounds({ x: 260, y: 130, width: width - 260, height: height - 160 });
	view.webContents.loadURL(arg);
});

/**
 *  8、在用户的默认浏览器中打开 URL
 */
ipcMain.on("openExternal", (event, arg) => {
	shell.openExternal(arg);
});

/**
 *  9、打开浏览器
 */
function openBrowser(url) {
	shell.openExternal(url);
}

/**
 *  10、执行cmd脚本
 */
ipcMain.on("shellCmd", (event, arg) => {
	let cmdStr = "";
	const { systemId, params, url } = arg;
	let resPath = process.resourcesPath + "/extraResources";
	//todo  path.resolve在 ubuntu19（估计linux内核都会） 下不会自动转换分隔符，不会自动修复成正确路径，需要路径分隔符统一用 "/"，不要使用转义符 "\\"
	let scriptPath = path.resolve(resPath + `/${systemId}.py`);
	try {
		fs.exists(scriptPath, function (isExists) {
			if (isExists) {
				// cmdStr = `"python"` + " " + scriptPath + " " + params;
				cmdStr = `python ${scriptPath} ${params}`;
				if (cmdStr) {
					cmd.run(cmdStr, function (err, data, stderr) {
						if (err) {
							dialog.showErrorBox("执行脚本异常", stderr);
						}
					});
				}
			} else {
				openBrowser(url);
			}
		});
	} catch (e) {
		dialog.showErrorBox("异常信息", "未知异常，请联系相关人员.");
	}
});
/**
 *  11、拖拽窗体顶部
 */
ipcMain.on("moveApplication", (event, pos) => {
	mainWindow && mainWindow.setPosition(pos.posX, pos.posY);
});
/**
 *  12、窗体重新加载 url
 */
ipcMain.on("reload", (event, pos) => {
	mainWindow && mainWindow.reload();
});

/**
 *  13、获取版本号（package.json）
 * @returns {string}
 */
function getVersion() {
	return app.getVersion();
}
ipcMain.handle("getVersion", getVersion);


/**
 * 14、保存至磁盘
 */
function saveDisk(event, arg){
	const setting = menuUtils.readSetting();
	const savePath = setting?.savePath;
	let filePath = path.normalize(`${savePath}${arg?.kindType}.txt`)
	const isExist = fs.existsSync(filePath);
	delete arg.kindType;
	if(isExist) {
		fs.appendFileSync(filePath,JSON.stringify(arg) + '\n')
	} else {
		fs.writeFileSync(filePath, JSON.stringify(arg) + '\n')
	}
}
ipcMain.handle("saveDisk", saveDisk);

/**
 * 15、获取 preload.js 相对路径
 */
ipcMain.handle("getPathFn", (event, arg) =>{
	let _path = mode === "dev" ? path.resolve(app.getAppPath(), `src/main/${arg}`) : path.resolve(process.resourcesPath, `src/main/${arg}`);
	return `file://${_path.replace(/\\/g, '/')}`;
})

/**
 * 16、获取采集的数据（保存在本地）
 */
ipcMain.handle("getCollectionData", (event, arg) =>{
	const setting = menuUtils.readSetting();
	const savePath = setting?.savePath;
	const filePath = path.normalize(`${savePath}${arg?.kindType}.txt`)
	const data = fs.readFileSync(filePath, {encoding: "utf-8"});
	return data || [];
})

/**
 *=========================================================================
 *=                                                                       =
 *=                       4.桌面应用自动更新                                 =
 *=                                                                       =
 *=========================================================================
 */

function sendUpdateMessage(text) {
	mainWindow.webContents.send("message", text);
}

let message = {
	error: "检查更新出错",
	checking: "正在检查更新……",
	updateAva: "检测到新版本，正在下载……",
	updateNotAva: "现在使用的就是最新版本，不用更新",
};

autoUpdater.setFeedURL({
	provider: "generic",
	url: "https://xxx/client",
});

autoUpdater.on("error", function (error) {
	mainWindow.webContents.send("updateError");
});
autoUpdater.on("checking-for-update", function () {
	sendUpdateMessage(message.checking);
});
autoUpdater.on("update-available", function (info) {
	mainWindow.webContents.send("updateAvailable");
});
autoUpdater.on("update-not-available", function (info) {
	mainWindow.webContents.send("updateNotAvailable");
});

// 更新下载进度事件
autoUpdater.on("download-progress", function (progressObj) {
	mainWindow.webContents.send("downloadProgress", progressObj);
});
autoUpdater.on(
	"update-downloaded",
	function (
		event,
		releaseNotes,
		releaseName,
		releaseDate,
		updateUrl,
		quitAndUpdate
	) {
		autoUpdater.quitAndInstall();
	}
);

ipcMain.on("checkUpdate", () => {
	autoUpdater.logger = log;
	autoUpdater.checkForUpdates();
});
