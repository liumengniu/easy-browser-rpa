/**
 * 脚本解释器
 * @author Kevin
 * @Date:
 */
const _ = require("lodash")

const interpreter = {
	/**
	 * 获取dom节点
	 */
	find_element: function (name){
		const query = document.querySelector.bind(document);
		return query(name)
	},
	/**
	 * 获取第N个子元素
	 * @param element
	 * @param num
	 * @returns {*}
	 */
	find_child_by_number: function (element, num){
		return element.children[_.toNumber(num)]
	},
	/**
	 * 点击操作
	 * @param name
	 */
	click: function (name){
		element?.click();
	},
	/**
	 * 填充输入框
	 */
	send_keys: function (name, value){

	},
	/**
	 *
	 */
	text: function (){

	},
}

module.exports = interpreter