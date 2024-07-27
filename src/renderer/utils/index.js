/**
 * 工具的入口
 * @author Kevin
 * @Date: 2024-6-7
 */

import saveDB from "@/renderer/utils/saveDB";
import saveDisk from "@/renderer/utils/saveDisk";

/**
 * 判断值是不是一个json数据
 * @param str
 */
function isJson(str) {
	if (typeof str == 'string') {
		try {
			let obj = JSON.parse(str)
			if (typeof obj == 'object' && obj) {
				return true
			} else {
				return false
			}
		} catch (e) {
			return false
		}
	}
}


export {saveDB, saveDisk, isJson}
