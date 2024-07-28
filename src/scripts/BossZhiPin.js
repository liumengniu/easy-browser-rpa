/**
 * 获取BOSS直聘数据
 * @author Kevin
 * @Date: 2024-6-7
 */

/**
 * 获取当前屏幕全部的数据
 * 每隔2秒加载一屏
 */
function getJobs(...args) {
	const type = args[0];
	// 搜索一个岗位
	var jobListBox = document.querySelector(".job-list-box")
	if(jobListBox === null){
		var searchInput = document.querySelector(".ipt-search");
		if (searchInput) searchInput.value = "JAVA开发";
		var btnSearch = document.querySelector(".btn-search");
		if(btnSearch) btnSearch.click()
		// 每隔2秒滚动一次
		const interval = setInterval(()=>{
			var optionsPages = document.querySelector(".options-pages")
			const lastChild = optionsPages.lastElementChild;
			lastChild?.click();
			var doc = document;
			var jobListBox = doc.querySelector(".job-list-box")
			var sections = doc.getElementsByClassName("job-card-wrapper");
			for (var i=0;i<sections.length;i++){
				var section = sections[i];
				// console.log(section, '===========section===========', sections)
				var job_name = section.querySelector(".job-name");
				var job_area = section.querySelector(".job-area");
				var salary = section.querySelector(".salary");
				var tagList = section.querySelector(".tag-list");
				var jobItem = {
					job_name: job_name.textContent,
					job_area: job_area.textContent,
					salary: salary.textContent,
					kindType: 'BOSS直聘',
				};
				console.log(jobItem, '==============================')
				type === "本地磁盘" ? window.mainProcess?.saveDisk(jobItem) : window.mainProcess?.saveToDB(jobItem);
			}
		}, 2000)
	}
}

/**
 * 关键词筛选岗位
 */
function filterJobsByKeyWord(...args){
	const city = args[0];
	const post = args[1];  //岗位
	var jobListBox = document.querySelector(".job-list-box")
	if(jobListBox === null) {
		var searchInput = document.querySelector(".ipt-search");
		// 搜索筛选岗位
		if (searchInput) searchInput.value = post;
		var btnSearch = document.querySelector(".btn-search");
		if (btnSearch) btnSearch.click();
	}
}

/**
 * 细节筛选岗位
 * @param args
 */
function filterJobs(...args){
	const city = args[0];
	const post = args[1];  //岗位
	const salary = args[2];  //薪水
	const education = args[3];  //教育
	const experience = args[4];   //经验
	const type = args[0];
	// 筛选工作经验
	if(experience !== undefined && experience !== null){
		var wrapper = document.querySelector(".search-condition-wrapper");
		var wrapper2 = document.querySelector(".job-search-wrapper");
		var experienceSelect = document.querySelector(".search-condition-wrapper div:nth-child(5)");
		console.log(experienceSelect,'=====experienceSelect=================',wrapper, document,wrapper2)
		if(!experienceSelect) return
		var experienceSelectUl = experienceSelect.querySelector('ul');
		var activeNode = experienceSelectUl.children[Number(experience)];
		activeNode.click();
	}
	// 筛选薪资待遇
	if(salary !== undefined && salary !== null){
		var salarySelect = document.querySelector(".search-condition-wrapper > div:nth-child(6)");
		var salarySelectUl = salarySelect.querySelector('ul');
		var activeNode = salarySelectUl.children[Number(salary)];
		activeNode.click();
	}
	// 筛选学历
	if(education !== undefined && education !== null){
		var educationSelect = document.querySelector(".search-condition-wrapper > div:nth-child(7)");
		var educationSelectUl = educationSelect.querySelector('ul');
		var activeNode = educationSelectUl.children[Number(education)];
		activeNode.click();
	}
}

/**
 * 一键海投简历
 */
function batchDeliveryJobs(){
	try {
		var jobBox = document.querySelector(".job-list-box");
		var jobLiList = jobBox.querySelectorAll(".job-card-wrapper");
		console.log(jobLiList, '===========jobLiList===================')
		// 投递第一页全部30个岗位
		for(var i=0;i<jobLiList.length;i++){
			var jobItem = jobLiList[i];
			var chatDom = jobItem.querySelector(".start-chat-btn");
			if (chatDom) chatDom.click();
			setTimeout(() => {
				var greetDialog = document.querySelector(".greet-boss-dialog");
				console.log(greetDialog, '===========greetDialog===================', document)
				var sureBtn = greetDialog.querySelector(".cancel-btn");
				if (sureBtn) sureBtn.click()
				console.log(sureBtn, '===========sureBtnsureBtn===================')
			}, 500)
		}
		// 翻页，继续投递全部岗位
	}catch (e) {
	
	}
}


const bossScript = {
	getJobs,
	filterJobsByKeyWord,
	filterJobs,
	batchDeliveryJobs,
};

export default bossScript
