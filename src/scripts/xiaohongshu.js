import interpreter from "@/interpreter";

/**
 * @author Kevin
 * @Date: 2024-6-7
 */
const xiaohongshuScript = {
	/**
	 * 获取笔记列表
	 */
	getNoteList: function (...args){
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
			}
		}, 2000);
	},
	/**
	 * 筛选笔记
	 */
	filterNotes: function (...args){
		var type = args[0];
		var keyword = args[1];
		var tag = args[2];
		var searchInput = document.getElementById("search-input");
		if(keyword !== null && keyword !== undefined) {
			searchInput.value = keyword;
			var inputButton = document.querySelector(".search-icon");
			inputButton.click();
		}
		if(tag !== null && tag !== undefined){
			var contentContainer = document.querySelector(".content-container");
			var activeContent = contentContainer.children[Number(tag)];
			if(activeContent) activeContent.click();
		}

		// const { find_element, click, send_keys } = window?.mainProcess;
		// var keyword = args[1];
		// var tag = args[2];
		// var searchInput = find_element('#search-input');
		// if(keyword !== null && keyword !== undefined) {
		// 	send_keys(searchInput, keyword)
		// 	var inputButton = find_element('.search-icon');
		// 	click(inputButton)
		// }
		// if(tag !== null && tag !== undefined){
		// 	var contentContainer = find_element('.content-container');
		// 	var activeContent = contentContainer.children[Number(tag)];
		// 	click(activeContent)
		// }
	},

	/**
	 * 获取笔记列表和详情
	 */
	getNoteListDetail: async function (...args){
		function sleep(ms){
			return new Promise(resolve=> setTimeout(resolve, ms))
		}
		async function asyncInterval(callback, interval, times = 1000000) {
			for (let i = 0; i < times; i++) {
				await callback();
				await sleep(interval);
			}
		}
		var idx = 0;
		var type = args[0];
		await asyncInterval(async ()=>{
			window.scrollTo({top: document.body.scrollHeight,behavior: 'smooth'});
			var sections = document.getElementsByClassName("note-item");
			idx = idx + (sections.length - 1);
			for (var i = 0; i < sections.length; i++) {
				var section = sections[i];
				var coverDom = section.querySelector(".cover")
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
				coverDom.click();
				// await sleep(2000)
				var listContainer = document.querySelector(".list-container");
				console.log(listContainer, '==========listContainer===============')
				var comments = [];
				if(listContainer){
					var listContainerChildren = listContainer.children;
					for(var j=0;j<listContainerChildren.length; j++){
						var parentComment = listContainerChildren[j];
						var commentItem = parentComment.querySelector(".comment-item")
						var avatarItem = commentItem.querySelector(".avatar-item");
						var comment_avatar = avatarItem.src;
						var comment_author = commentItem.querySelector(".right>.author-wrapper>.author> a");
						var comment_author_name = comment_author.textContent;
						var comment_content = commentItem.querySelector(".right>.content").textContent;
						var obj = { comment_avatar, comment_author_name, comment_content};
						comments.push(obj);
					}
				}
				var note = {title: textContent, img_src, href, comments,kindType: '小红书'};
				var noteDetailMask = document.querySelector(".note-detail-mask");
				var closeBox = document.querySelector(".close-box");
				await sleep(1000)
				if (noteDetailMask) noteDetailMask.click();
				if(closeBox) closeBox.click();
				console.log(noteDetailMask, '===============noteContainer=======================', comments,window)
				type === "本地磁盘" ? window.mainProcess?.saveDisk(note) : window?.mainProcess?.saveToDB(note);
			}
		},1000)
	},
	/**
	 * 延时操作
	 * @param ms
	 * @returns {Promise<unknown>}
	 */
	sleep: function (ms){
		return new Promise(resolve=> setTimeout(resolve, ms))
	},
	/**
	 * 定时器
	 * @param callback
	 * @param interval
	 * @param times
	 * @returns {Promise<void>}
	 */
	asyncInterval: async function (callback, interval, times = 1000000) {
		for (let i = 0; i < times; i++) {
			await callback();
			await this.sleep(interval);
		}
	}
};

export default xiaohongshuScript
