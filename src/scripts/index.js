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
	getFunctionBody: function(fn, type){
		console.log(fn, '-------------',type,'============')
		// 将函数转换为字符串
		const fnString = fn.toString();
		// 使用正则表达式匹配函数参数和主体
		const fnMatch = fnString.match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m);
		// const params = fnMatch[1].split(',').map(param => param.trim()).join(', ');
		const params = fnMatch[1];
		const bodyMatch = fnString.match(/^[^{]*{((.|\n)*)}$/);
		const fnBody = bodyMatch ? bodyMatch[1].trim() : null;
		console.log(params, '-------------',fnBody,'============')
		// 构建最终的注入脚本
		const scriptContent = `
			(function() {
		    const fn = function(${params}) {
		        ${fnBody}
		    };
		    fn('${type}');
			})();
		`;
		return scriptContent;
	},
	["xiaohongshuScript"]: function (type) {
		return this.getFunctionBody(xiaohongshuScript, type);
	},
	["bossScript"]: bossScript,
	["douyinScript"]: douyinScript,
	["zhihuScript"]: zhihuScript,
	["bilibiliScript"]: bilibiliScript
}

export default webviewScripts
