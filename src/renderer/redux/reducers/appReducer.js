/**
 * 描述：项目app相关的 reducer的集合，如需要，可以继续拆分
 * @author liumengniu
 * @date 2021/12/15
 */
import { combineReducers } from "redux"

let initialState = {
	//app版本
	versionName: "",
	//用户id
	userId: "",
	//用户token
	token: "",
	//全局配置
	configs: {},
	role: "superuser"
}
/**
 * 更新用户user的reducer
 * @param state
 * @param action
 * @returns {{configs: {}, versionName: string, userId: string, token: string}}
 */
const userReducer = (state = initialState, action) => {
	return { ...state }
}
/**
 * 更新项目配置reducer
 * @param state
 * @param action
 * @returns {{configs: {}, versionName: string, userId: string, token: string}}
 */
const configReducer = (state = initialState, action) => {
	return { ...state }
}

const appReducer = combineReducers({
	userReducer,
	configReducer
})

export default appReducer
