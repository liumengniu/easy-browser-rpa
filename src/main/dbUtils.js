/**
 * 数据库相关操作
 * @author Kevin
 * @Date: 2024-7-21
 */
const { sequelize } = require("./../renderer/models");

const dbUtils = {
	/**
	 * 初始化表
	 */
	initDB: async function (){
		// await sequelize.drop({ force: true });
		await sequelize.sync({ force: true });
	}
}

module.exports = dbUtils;
