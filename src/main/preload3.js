/**
 * @author Kevin
 * @Date: 2024-6-10
 */
const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("mainProcess", {
	saveJobs: (params) => {
		console.log("browserView传递给主进程通信事件", params)
		return ipcRenderer.invoke("saveDisk", params)
	},
})
