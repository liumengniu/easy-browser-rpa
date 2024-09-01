/**
 * 解释器
 * 将"流程数据"解析为可执行的JS
 * 由于xpath解析document获取元素太慢，且目标网页是后加载元素，需要大量的延时等待，此处我们自己通过JS语法获取
 * @author Kevin
 * @Date:
 */

const interpreter = {
	/**
	 * 浏览器导航至当前网页
	 * @param url
	 */
	get: function (url){

	},
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
	 * 获取第N个子元素
	 * @param element
	 * @param num
	 * @returns {*}
	 */
	find_child_by_number: function (element, num){
		return element.children[Number(num)]
	},
	/**
	 * 点击操作
	 * @param name
	 */
	click: function (name){
		element?.click();
	},
	/**
	 * 获取文本内容
	 */
	getText: function (dom){
		return dom?.textContent || "";
	},
	/**
	 * 获取图片地址
	 * @param img
	 * @returns {*}
	 */
	getImageHref: function (img){
		return img?.src;
	},
	/**
	 * 绑定事件
	 */
	bindEvent: function (type, element, detail){
		const event = new CustomEvent("customEvent", detail);
		element.dispatchEvent(event)
	},
	/**
	 * 改变元素输入框的值
	 */
	send_keys: function (element,val){
		if(_.isEmpty(val)) return
		element.value = val;
		return true
	},
	/**
	 * 清除元素框的值
	 * @param element
	 */
	clear: function (element){
		element.value = ''
	},
	/**
	 * 获取元素的属性
	 * @param element
	 * @param name
	 * @returns {*}
	 */
	get_attribute: function (element, name){
		return element.getAttribute(name);
	},
}

module.exports = interpreter