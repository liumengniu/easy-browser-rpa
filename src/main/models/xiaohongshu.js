/**
 * @author Kevin
 * @Date: 2024-7-21
 */
'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Xiaohongshu extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Xiaohongshu.init({
		id: {
			primaryKey: true,
			type: DataTypes.UUID
		},
		img_src: {
			type: DataTypes.STRING,
			comment: "笔记封面",
		},
		title: {
			type: DataTypes.STRING,
			comment: "小红书标题",
		},
		href: {
			type: DataTypes.STRING,
			comment: "笔记详情链接地址",
		},
		comments: {
			type: DataTypes.JSON,
			comment: "评论列表",
		}
	}, {
		sequelize,
		modelName: 'Xiaohongshu',
	});
	return Xiaohongshu;
};
