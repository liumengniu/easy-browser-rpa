/**
 * 获取BOSS直聘数据
 * @author Kevin
 * @Date: 2024-6-7
 */

/**
 * 获取当前屏幕全部的数据
 * 每隔2秒加载一屏
 */
function getJobs() {
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
				var jobName = section.querySelector(".job-name");
				var jobArea = section.querySelector(".job-area");
				var salary = section.querySelector(".salary");
				var tagList = section.querySelector(".tag-list");
				var jobItem = {
					jobName: jobName.textContent,
					jobArea: jobArea.textContent,
					salary: salary.textContent,
					kindType: 'BOSS直聘',
				};
				console.log(jobItem, '==============================')
				window.mainProcess?.saveDisk(jobItem);
			}
		}, 2000)
	}
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

const bossScript = getFunctionBody(getJobs);

export default bossScript
