/**
 * @author Kevin
 * @Date: 2024-6-11
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
		var box = doc.querySelector(".container")
		var sections = box.getElementsByClassName("bili-video-card");
		for (var i=0;i<sections.length;i++){
			var section = sections[i];
			var cardInfo = section.querySelector(".bili-video-card__info--right");
			var h3Ele = cardInfo?.querySelector(".bili-video-card__info--tit");
			var title = h3Ele?.title;
			var authorBox = section.querySelector(".bili-video-card__info--bottom");
			var authorEle = authorBox?.querySelector(".bili-video-card__info--author");
			var author = authorEle?.textContent;
			var coverBox = section.querySelector(".bili-video-card__image--wrap");
			var picture = coverBox?.querySelector(".bili-video-card__cover");
			var coverEle = picture?.querySelector('img')
			var cover = coverEle?.src;
			var videoItem = { title, author, cover,kindType: 'b站'};
			window.mainProcess?.saveDisk(videoItem);
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

const bilibiliScript = getFunctionBody(getScreenList);

export default bilibiliScript
