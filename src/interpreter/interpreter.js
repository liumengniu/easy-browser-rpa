/**
 * 脚本解释器
 * @author Kevin
 * @Date:
 */

const interpreter = {
	/**
	 * 获取dom节点
	 */
	find_element: function (name){
		const query = document.querySelector.bind(document);
		return query(name)
	},
	/**
	 * 获取当前元素子节点中的dom节点
	 * @param element
	 * @param name
	 * @returns {*}
	 */
	find_child_element: function (element, name){
		const query = element.querySelector.bind(element);
		return query(name)
	},
	/**
	 * 查找相同class名的全部元素
	 * @param name
	 * @returns {HTMLCollectionOf<Element>}
	 */
	find_elements_by_classname: function (name){
		const query = document.getElementsByClassName.bind(document);
		return query(name)
	},
	/**
	 * 遍历操作
	 * @param list
	 * @param cb
	 */
	for_each: function (list, cb){
		Array.from(list).forEach((node, idx) => {
			var coverDom = window.mainProcess?.find_child_element(node, '.cover');
			var footer = window.mainProcess?.find_child_element(node, '.footer');
			var titleSpan = window.mainProcess?.find_child_element(footer, 'span');
			console.log(coverDom, '----------', titleSpan)
		})
	},
	/**
	 * 获取第N个子元素
	 * @param element
	 * @param num
	 * @returns {*}
	 */
	find_child_by_number: function (element, num){
		console.log(element, '=========element===============', num, '000000',element?.children[Number(num)])
		return element?.children[Number(num)]
	},
	/**
	 * 点击操作
	 * @param element
	 */
	click: function (element){
		console.log(element, '=======[[[[[[[[[[==element===-[[[[[[[[[============')
		element?.click();
	},
	/**
	 * 填充输入框
	 */
	send_keys: function (name, value){

	},
	/**
	 * 获取节点的文本内容
	 */
	text: function (element){
		return element.textContent || element.innerText
	},
	/**
	 * 获取图片的链接地址
	 * @param element
	 * @returns {any}
	 */
	img_url: function (element){
		return element.textContent || element.innerText
	},
	/**
	 * 滚动道底部
	 */
	scroll_to_bottom: function (){
		window.scrollTo({top: document.body.scrollHeight,behavior: 'smooth'});
	}
}

export default interpreter