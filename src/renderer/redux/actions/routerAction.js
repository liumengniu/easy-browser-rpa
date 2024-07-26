/**
 * 描述： 路由相关的action
 * @author liumengniu
 * @date 2021/12/17
 */
import { createAction } from "@reduxjs/toolkit"
import ActionType from "@/renderer/redux/actions/index"

/**
 * 快捷导航标签
 * @type {PayloadActionCreator<void, "SET_SIDE_ROUTER">}
 */
const addRouter = createAction(ActionType.ADD_ROUTER)
const removeRouter = createAction(ActionType.REMOVE_ROUTER)
const setCurrentRouter = createAction(ActionType.SET_CURRENT_ROUTER)

export { addRouter, removeRouter, setCurrentRouter }
