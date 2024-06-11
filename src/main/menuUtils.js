/**
 * 系统菜单操作
 * @author Kevin
 * @Date: 2024-6-11
 */

const {app, dialog, nativeTheme} = require("electron");
const fs = require("fs");
const path = require("path")
const ini = require('ini');
const _ = require("lodash")

const menuUtils = {
	userPath: app.getPath("userData"),
	configPath: path.resolve(app.getPath("userData"), "config.ini"),
	/**
	 * 初始化系统默认配置
	 */
	initSetting: function () {
		const configPath = this.configPath;
		const iniContent = `[Settings] \ntheme=dark \nsavePath=D:\\ \nautosave=true`;
		if (!fs.existsSync(configPath)) {
			fs.writeFileSync(configPath, iniContent.trim())
		}
	},
	/**
	 * 读取系统配置
	 */
	readSetting: function () {
		let content = fs.readFileSync(this.configPath, {encoding: "utf-8"});
		const config = ini.parse(content);
		const setting = config?.Settings;
		const savePath = setting?.savePath;
		return setting;
	},
	/**
	 * 修改数据存储地址
	 */
	changeSavePath: function () {
		let setting = menuUtils.readSetting();
		dialog.showOpenDialog(null, {
			defaultPath: setting?.savePath,
			properties: ['openFile', 'openDirectory']
		}).then(result => {
			if (!result.canceled) {
				if(_.isEmpty(setting)){
					setting = {};
				}
				setting.savePath = path.resolve(result.filePaths[0]);
				const newConfig = ini.stringify(setting, {section: 'Settings'})
				menuUtils.writeSetting(newConfig)
			}
			console.log(result.canceled)
			console.log(result.filePaths)
		}).catch(err => {
			console.log(err)
		})
	},
	/**
	 * 编写配置
	 */
	writeSetting: function (params) {
		fs.writeFileSync(this.configPath, params)
	},
	/**
	 * 切换黑暗/白天模式
	 */
	changeColorMode: function (mainWindow) {
		if (nativeTheme.shouldUseDarkColors) {
			nativeTheme.themeSource = 'light'
			mainWindow.webContents.send("changeColorMode", 'light');
		} else {
			nativeTheme.themeSource = 'dark'
			mainWindow.webContents.send("changeColorMode", 'dark');
		}
	},
	/**
	 * 重启程序
	 */
	reloadApp: function () {
	
	},
	/**
	 * 退出程序
	 */
	exitApp: function () {
	
	},
	/**
	 * 程序的描述说明
	 */
	showAppDescription: function () {
		dialog.showMessageBox(null, {message: '本软件是一款桌面应用，通过内嵌web网页，模拟用户操作来采集自媒体平台数据'})
	}
}
module.exports = menuUtils
