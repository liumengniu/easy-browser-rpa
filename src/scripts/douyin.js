/**
 * 获取抖音脚本
 * @author Kevin
 * @Date: 2024-6-7
 */
/**
 * 获取当前屏幕全部的数据
 * 每隔2秒加载一屏
 */
function getScreenList() {
	// 每隔2秒滚动一次
	const interval = setInterval(()=>{
		const scrollOptions = {
			top: document.body.scrollHeight,
			left: 0,
			behavior: 'smooth'
		};
		window.scrollTo(scrollOptions);
		var doc = document;
		var box = doc.getElementById("waterFallScrollContainer")
		var sections = doc.getElementsByClassName("nFJH7DcV");
		// console.log(sections, '=========sections==========')
		for (var i=0;i<sections.length;i++){
			var section = sections[i];
			if(section.id !== 'hotItem'){
				var video = section.querySelector(".waterfall-videoCardContainer");
				console.log(video, '=========videovideovideo==========')
				var video_url = video?.href;
				var videoBgImg = section.querySelector(".efV2zCXp");
				var video_bg_src = videoBgImg?.src
				var author = section.querySelector(".u6iv2BZe")?.textContent;
				var title = section.querySelector(".MR80_HYg")?.textContent;
				var shortVideo = { video_url, video_bg_src, author, title, kindType: '抖音' };
				// window.mainProcess?.saveDisk(shortVideo);
				window.mainProcess?.saveToDB(shortVideo);
			}
			
		}
	}, 2000);
}

/**
 * 将函数主体转为字符串，给 electron 注入代码到嵌入为web层
 * @param fn
 * @returns {string|null}
 */
function getFunctionBody(fn) {
	// 将函数转换为字符串
	const fnString = fn.toString();
	// 使用正则表达式匹配函数主体
	const bodyMatch = fnString.match(/^[^{]*{((.|\n)*)}$/);
	// 提取并返回主体内容
	return bodyMatch ? bodyMatch[1].trim() : null;
}

const douyinScript = getFunctionBody(getScreenList);

export default douyinScript
