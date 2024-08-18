/**
 * 将"流程"解析为可执行的JS
 * @author Kevin
 * @Date:
 */

const interpreter = {
	/**
	 * 获取dom节点
	 */
	getDom: function (){
		document.querySelector();
	},
	/**
	 * 获取文本内容
	 */
	getText: function (dom){
		return dom?.textContent || "";
	},

	getImageHref: function (img){
		return img?.src;
	},
	/**
	 * 获取事件
	 */
	bindEvent: function (type){

	},
	/**
	 * 存储
	 */
	bindSave: function (){

	}
}

export default interpreter