import ActionType from "@/renderer/redux/actions"
import { createReducer, current } from "@reduxjs/toolkit"

/**
 * 描述： 路由的reducer
 * @author liumengniu
 * @date 2021/12/13
 */

let initialState = {
	/**
	 * 顶部选中导航信息
	 */
	topRouter: {},
	sideRouter: {},
	tagsView: []
}

/**
 * 路由操作旧state的reducer的集合，返回新的 state
 * createReducer调用immer库执行了不可变更新，可以改变深层数据，如 state.todos[3].completed = true
 */
export const routerReducer = createReducer(initialState, builder => {
	builder
		.addCase(ActionType.SET_CURRENT_ROUTER, (state, action) => {
			state.tagsView = action.payload
		})
		.addCase(ActionType.ADD_ROUTER, (state, action) => {
			state.tagsView.push(action.payload)
		})
		.addCase(ActionType.REMOVE_ROUTER, (state, action) => {
			state.tagsView = _.filter(_.get(current(state), "tagsView"), (o, i) => i !== action.payload)
		})

		.addDefaultCase((state, action) => {})
})
