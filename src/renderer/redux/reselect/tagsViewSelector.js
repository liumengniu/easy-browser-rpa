import _ from "lodash"
import { createSelector } from "@reduxjs/toolkit"

/**
 * description：
 * @author Kevin
 * @date 2022/11/8
 */

const currentRouter = state => _.get(state, "routerReducer") //获取state的当前路由信息

/**
 * 获取标签路由导航集合
 */
const getTagsView = createSelector(currentRouter, o => {
	return o.tagsView
})

export default getTagsView
