/**
 * 数据库相关服务层
 * @author Kevin
 * @Date: 2024-7-21
 */

const models = require("../../renderer/models");
const Xiaohongshu = models.Xiaohongshu;
const { v4: uuidv4 } = require('uuid');
const _ = require("lodash")

const DBService = {
	/**
	 * 存储数据
	 */
	insertData: function (kindType, data){
		const tableData = {
			id: uuidv4(),
			...data
		}
		Xiaohongshu.create(tableData)
	},
	queryData: function (){
	
	},
	/**
	 * 获取全部字段
	 */
	getFields: function (){
	
	}
}

module.exports = DBService;
