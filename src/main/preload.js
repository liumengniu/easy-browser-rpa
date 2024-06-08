/**
 * description： electron预加载方法，进程通信
 * @author Kevin
 * @Date: 2024-4-16
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	/**
	 * ====================================  渲染进程 -> 主进程（单向）  =======================================
	 */
	/**
	 * 设置当前路由
	 * @param title
	 */
	setRouter: title => ipcRenderer.send('currentRouter', title),
	/**
	 * 窗体最小化
	 */
	setWinMin: () => ipcRenderer.send('window-min'),
	/**
	 * 窗体最大化
	 */
	setWinMax: () => ipcRenderer.send('window-max'),
	/**
	 * 关闭视窗
	 */
	setWinClose: () => ipcRenderer.send('window-close'),
	
	/**
	 * 初始化 BrowserView （视图，和webview 有点点不同）
	 * @param url
	 */
	initBrowserView:(url) => ipcRenderer.send('init-browser-view', url),
	/**
	 * 打开浏览器
	 * @param url
	 */
	openExternal: url =>ipcRenderer.send('openExternal', url),
	/**
	 * 唤起cmd脚本
	 */
	shellCmd: systemId => ipcRenderer.send('shellCmd', systemId),
	
	/**
	 * 拖拽窗体顶部
	 */
	moveApplication: position => ipcRenderer.send('moveApplication', position),
	/**
	 * 检查更新
	 */
	checkUpdate: () => ipcRenderer.send('checkUpdate'),
	/**
	 * 重新加载(web端有缓存)
	 */
	reload: () => ipcRenderer.send('reload'),
	/**
	 * ====================================== 渲染进程 -> 主进程(双向)  =======================================
	 */
	/**
	 * 获取版本
	 * @returns {Promise<any>}
	 */
	getVersion: () => ipcRenderer.invoke('getVersion'),
	/**
	 * 获取preload.js相对路径
	 * @returns {Promise<any>}
	 */
	getPathFn: fileName => ipcRenderer.invoke('getPathFn', fileName),
	/**
	 * 保存至磁盘
	 * @returns {Promise<any>}
	 */
	saveDisk: params => ipcRenderer.invoke('saveDisk', params),
	/**
	 * ====================================== 主进程 -> 渲染进程（单向）  =======================================
	 */
	downloadProgress: (callback) => ipcRenderer.on('downloadProgress', callback),
	isUpdateNow: (callback) => ipcRenderer.on('isUpdateNow', callback),
	confirmUpdate: (callback) => ipcRenderer.on('confirmUpdate', callback),
	updateAvailable: (callback) => ipcRenderer.on('updateAvailable', callback),
	updateNotAvailable: (callback) => ipcRenderer.on('updateNotAvailable', callback),
	updateError: (callback) => ipcRenderer.on('updateError', callback),
})
