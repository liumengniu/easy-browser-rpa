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
		return `${query(name)}`
	},
	/**
	 * 点击操作
	 * @param element
	 */
	click: function (element){
		element?.click();
	},
	/**
	 *
	 */
	text: function (){

	},
}

module.exports = interpreter