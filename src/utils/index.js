/**
 * @author Kevin
 * @Date: 2024-6-11
 */

const utils = {
	/**
	 * 判断是否是JSON串
	 * @param str
	 */
	isJson: function (str){
		if (typeof str !== 'string') {
			return false;
		}
		
		try {
			JSON.parse(str);
			return true;
		} catch (e) {
			return false;
		}
	}
}

export default utils
