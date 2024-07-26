/**
 * 描述： 所有reducer的入口
 * @author liumengniu
 * @date 2021/12/13
 */

import { combineReducers } from "redux";
//路由的reducer
import {routerReducer} from "./routerReducer";
import monitorReducerEnhancer from "./monitorReducer";
import apiReducer from "./apiReducer";
import appReducer from "./appReducer";
import screenReducer from "./screenReducer";

/**
 * 应用启动时永远加载的 reducer，保存的项目相关的reducer
 * @type {{appReducer: {}}}
 */
const staticReducers = {
	appReducer,
}

const rootReducers = combineReducers({
	...staticReducers,
	// monitor 的reducer
	monitorReducerEnhancer,
	// 路由的reducer
	routerReducer,
	// 请求相关 reducer
	apiReducer,
	// UI相关reducer
	screenReducer
})

export default rootReducers;