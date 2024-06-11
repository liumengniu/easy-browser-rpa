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
		var box = doc.getElementById("TopstoryContent")
		var sections = box.getElementsByClassName("Feed");
		for (var i=0;i<sections.length;i++){
			var section = sections[i];
			var ContentItem = section.querySelector(".ContentItem");
			var itemprop = section.querySelector("[itemprop='zhihu:question']");
			var questionNameEle = itemprop?.querySelector("[itemprop='name']")
			var question = questionNameEle?.content;
			var questionUrlEle = ContentItem.querySelector("[itemprop='url']")
			var questionUrl = questionUrlEle?.content;
			var commentCountEle = ContentItem.querySelector("[itemprop='commentCount']")
			var commentCount = commentCountEle?.content;
			var questionItem = { question, questionUrl, commentCount, kindType: '知乎'};
			window.mainProcess?.saveDisk(questionItem);
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

const zhihuScript = getFunctionBody(getScreenList);

export default zhihuScript
