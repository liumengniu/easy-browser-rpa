/**
 * @author Kevin
 * @Date: 2024-7-21
 */

'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Douyin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Douyin.init({
		id: {
			primaryKey: true,
			type: DataTypes.UUID
		},
		video_url: {
			type: DataTypes.STRING,
			comment: "短视频链接",
		},
		video_bg_src: {
			type: DataTypes.STRING,
			comment: "短视频背景图地址",
		},
		author: {
			type: DataTypes.STRING,
			comment: "短视频博主",
		},
		title: {
			type: DataTypes.STRING,
			comment: "短视频标题",
		}
	}, {
		sequelize,
		modelName: 'Douyin',
	});
	return Douyin;
};
