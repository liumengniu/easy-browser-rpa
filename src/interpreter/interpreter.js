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
	 * 获取第N个子元素
	 * @param name
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
	 *
	 */
	text: function (){

	},
}

export default interpreter