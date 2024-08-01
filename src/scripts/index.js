/**
 * @author Kevin
 * @Date: 2024-6-7
 */

import xiaohongshuScript from "@/scripts/xiaohongshu";
import bossScript from "@/scripts/BossZhiPin";
import douyinScript from "@/scripts/douyin";
import zhihuScript from "@/scripts/zhihuScript";
import bilibiliScript from "@/scripts/bilibiliScript";

const webviewScripts = {
	/**
	 * 将函数转为str类型，方便注入网页JS代码
	 */
	getFunctionBody: function(fn, ...args){
		// 将函数转换为字符串
		const fnString = fn.toString();
		// // 使用正则表达式匹配函数参数和主体
		// const fnMatch = fnString.match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m);
		// const params = fnMatch[1].split(',').map(param => param.trim()).join(', ');
		// const bodyMatch = fnString.match(/^[^{]*{((.|\n)*)}$/);
		// const fnBody = bodyMatch ? bodyMatch[1].trim() : null;
		// 使用正则表达式匹配函数主体
		const bodyMatch = fnString.match(/^[^{]*{((.|\n)*)}$/);
		const fnBody = bodyMatch ? bodyMatch[1].trim() : null;
		
		// 构建最终的注入脚本
		const scriptContent = `
			(async function() {
		    const fn = async function(...args) {
		        ${fnBody}
		    };
	      await fn(...${JSON.stringify(args)});
			})();
		`;
		return scriptContent;
	},
	["getNoteList"]: function (type) {
		return this.getFunctionBody(xiaohongshuScript.getNoteList, type);
	},
	["filterNotes"]: function (type, keyword, tag) {
		return this.getFunctionBody(xiaohongshuScript.filterNotes, type, keyword, tag);
	},
	["getNoteListDetail"]: function (type, keyword, tag) {
		return this.getFunctionBody(xiaohongshuScript.getNoteListDetail, type, keyword, tag);
	},
	["getJobs"]:  function (type) {
		return this.getFunctionBody(bossScript?.getJobs, type);
	},
	['filterJobsByKeyWord']:  function (city, post) {
		return this.getFunctionBody(bossScript?.filterJobsByKeyWord, city, post);
	},
	["filterJobs"]: function (city, post, salary, education, experience) {
		return this.getFunctionBody(bossScript?.filterJobs, city, post, salary, education, experience);
	},
	["batchDeliveryJobs"]: function () {
		return this.getFunctionBody(bossScript?.batchDeliveryJobs);
	},
	["getShortVideoList"]: function (type){
		return this.getFunctionBody(douyinScript?.getShortVideoList, type);
	},
	["zhihuScript"]: zhihuScript,
	["bilibiliScript"]: bilibiliScript
}

export default webviewScripts
