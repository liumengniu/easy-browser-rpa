/**
 * @author Kevin
 * @Date: 2024-7-26
 */

const {app, dialog, nativeTheme} = require("electron");
const fs = require("fs");
const path = require("path")
const _ = require("lodash")

const processUtils = {
	userPath: app.getPath("userData"),
	processPath: path.resolve(app.getPath("userData"), "process.txt"),
	
	/**
	 * 保存流程
	 */
	saveProcess: function (data) {
		console.log(this.processPath, '-------------------------------------')
		const configPath = this.processPath;
		if (!fs.existsSync(configPath)) {
			fs.writeFileSync(configPath, data.trim())
		}
	},
	/**
	 * 获取流程
	 */
	getProcess: function (){
	
	},
	/**
	 * 获取全部流程
	 */
	getAllProcess: function (){
	
	},
	/**
	 * 删除流程
	 */
	removeProcess: function (){
	
	},
	/**
	 * 删除全部流程
	 */
	removeAllProcess: function (){
	
	}
}

module.exports = processUtils
