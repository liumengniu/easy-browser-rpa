import { Menu } from "antd"
import React, { Fragment } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { addRouter } from "@/renderer/redux/actions/routerAction"
import routers from "@/renderer/routers"
import RouterManager from "@/renderer/routers/RouterManager"

function SideBar() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()
	
	/**
	 * 1、点击最底层菜单栏
	 * @param item
	 * @param key
	 * @param keyPath
	 * @param selectedKeys
	 * @param domEvent
	 */
	const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
		navigate(key)
		let realPath = key || location?.pathname
		let payload = RouterManager.getItemByPath(routers, realPath)
		dispatch(addRouter(payload))
	}
	
	/**
	 * 2、获取需要打开的菜单
	 */
	const getOpenKeys = pathname => {
		// filter是清除pathname 里的undefined，null等无效数据
		let hash = _.filter(_.split(pathname, "/"))
		let key = ""
		let openKeys = []
		_.map(hash, v => {
			key = key + `/${v}`
			openKeys.push(key)
		})
		return openKeys
	}
	
	/**
	 * 3、根据导航栏路由获取左侧展开菜单
	 */
	const getOpenKeysByPath = () => {
		const pathname = location?.pathname
		return getOpenKeys(pathname)
	}
	
	/**
	 * 4、根据导航栏路由获取选中最底层菜单
	 */
	const getSelectedKeysByPath = () => {
		return location?.pathname
	}
	
	return (
		<Fragment>
			<Menu
				items={RouterManager.getItems(routers)}
				onSelect={onSelect}
				selectedKeys={getSelectedKeysByPath()}
				defaultOpenKeys={getOpenKeysByPath()}
				mode="inline"
				style={{ borderRight: 0 }}
				theme="light"
			/>
		</Fragment>
	)
}

function isEqual(prevProps, nextProps) {
	return prevProps.path !== nextProps.path
}

export default React.memo(SideBar, isEqual)
