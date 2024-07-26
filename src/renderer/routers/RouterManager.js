/**
 * 路由操作方法
 * @author Kevin
 * @Date: 2024-7-26
 */
import _ from "lodash"

const RouterManager = {
	/**
	 * 根据path获取 routers 数据源的某个route
	 * @param list
	 * @param key
	 * @returns {{children}|*}
	 */
	getItemByPath: function (list, key) {
		let item
		for (let i = 0; i < list.length; i++) {
			let o = list[i]
			if (o.children) {
				item = this.getItemByPath(o.children, key)
				if (!_.isEmpty(item)) {
					break
				}
			} else {
				if (o.path === key) {
					item = o
					break
				}
			}
		}
		return item
	},
	/**
	 * 渲染菜单item
	 * @param label
	 * @param key
	 * @param icon
	 * @param children
	 * @returns {{children, icon, label, key}}
	 */
	getItem: function (label, key, icon, children) {
		return {
			key,
			icon,
			children,
			label
		}
	},
	
	/**
	 * 获取菜单配置的items
	 */
	getItems: function (list) {
		if (_.isEmpty(list)) {
			return []
		}
		return _.map(
			_.filter(_.cloneDeep(list), o => !o.hidden), //筛选需要显示在导航栏的路由
			item => {
				if (!_.isEmpty(item.children)) {
					item.children = this.getItems(item.children)
				}
				item = this.getItem(item.label, item.path, item.icon, item.children)
				return _.cloneDeep(item)
			}
		)
	}
}

export default RouterManager
