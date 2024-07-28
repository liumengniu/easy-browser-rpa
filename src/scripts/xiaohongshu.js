/**
 * @author Kevin
 * @Date: 2024-6-7
 */

/**
 * 获取当前屏幕全部的数据
 * 每隔2秒加载一屏
 */
function getScreenList(...args) {
	console.log(args, '===================type====================')
	const type = args[0];
	// 每隔2秒滚动一次
	const interval = setInterval(() => {
		const scrollOptions = {
			top: document.body.scrollHeight,
			left: 0,
			behavior: 'smooth'
		};
		window.scrollTo(scrollOptions);
		var doc = document;
		var exploreFeeds = doc.getElementById("exploreFeeds")
		var sections = doc.getElementsByClassName("note-item");
		for (var i = 0; i < sections.length; i++) {
			var section = sections[i];
			var footer = section.querySelector(".footer");
			var title = footer.querySelector(".title");
			var titleSpan = footer.querySelector("span");
			// 1、获取小红书标题
			var textContent = titleSpan?.textContent;
			// 2、获取每个帖子图片、帖子地址、帖子详情
			var aElement = section.querySelector("a.mask");
			var aImg = aElement.querySelector("img");
			var img_src = aImg.src;      //帖子图片
			var href = aElement.href;  //帖子详情
			var styleObj = aElement.style;
			var note = {title: textContent, img_src, href, kindType: '小红书'};
			type === "本地磁盘" ? window.mainProcess?.saveDisk(note) : window?.mainProcess?.saveToDB(note)
			// 3、前往详情页
			// (function (index, aElement) {
			// 	setTimeout(function () {
			// 		aElement.click();
			// 	}, index*1000);
			// })(i, aElement);
		}
	}, 2000);
}


const xiaohongshuScript = getScreenList;

export default xiaohongshuScript
