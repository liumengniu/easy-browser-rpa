/**
 * 获取抖音脚本
 * @author Kevin
 * @Date: 2024-6-7
 */
/**
 * 获取当前屏幕全部的数据
 * 每隔2秒加载一屏
 */
function getShortVideoList(...args) {
	const {type} = args[0];
	const interval = setInterval(()=>{
	// todo 抖音网页版window有的版本无法滚动，可能做了特殊设置（比如最外层html对象禁止滚动）。
	// todo 直接找列表容器来滚动，效果一样（不管抖音网页怎么更新，找能滚动的容器节点即可）
		const container = document.querySelector('.route-scroll-container'); // 替换为你的 div 元素的 ID
		container.scrollTo({top: container.scrollHeight, behavior: 'smooth'});
		var doc = document;
		var box = doc.getElementById("waterFallScrollContainer")
		var sections = doc.getElementsByClassName("nFJH7DcV");
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
				type === "本地磁盘" ? window.mainProcess?.saveDisk(shortVideo) : window?.mainProcess?.saveToDB(shortVideo);
			}

		}
	}, 2000);
}

const douyinScript = {
	getShortVideoList
};

export default douyinScript
