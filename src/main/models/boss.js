/**
 * boss直聘表
 * @author Kevin
 * @Date: 2024-7-28
 */

'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Boss extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Boss.init({
		id: {
			primaryKey: true,
			type: DataTypes.UUID
		},
		job_name: {
			type: DataTypes.STRING,
			comment: "职位名称",
		},
		job_area: {
			type: DataTypes.STRING,
			comment: "职位地区",
		},
		salary: {
			type: DataTypes.STRING,
			comment: "薪水",
		},
	}, {
		sequelize,
		modelName: 'Boss',
	});
	return Boss;
};
