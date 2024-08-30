/**
 * @author Kevin
 * @Date: 2024-6-7
 */
const { contextBridge, ipcRenderer} = require("electron");
const interpreter = require("./../interpreter");

/**
 * description： 嵌入web（包括内部网页和第三方外部网页）的browserView 和 主进程/网页视图 交互事件
 * @author Kevin
 * @date 2022/6/13
 */


contextBridge.exposeInMainWorld("mainProcess", {
	/**
	 * 存储到磁盘
	 * @param params
	 * @returns {Promise<any>}
	 */
	saveDisk: (params) => {
		console.log("browserView传递给主进程通信事件", params)
		return ipcRenderer.invoke("saveDisk", params)
	},
	/**
	 * 存储到数据库
	 * @param params
	 * @returns {Promise<any>}
	 */
	saveToDB: (params) => {
		console.log("browserView传递给主进程通信事件", params)
		return ipcRenderer.invoke("saveToDB", params)
	},
	interpreter: interpreter,
	/**
	 * 脚本解释器相关方法
	 */
	...interpreter,
})
