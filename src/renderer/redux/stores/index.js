/**
 * 描述： 全局状态 store 配置
 * @author liumengniu
 * @date 2021/12/13
 */

import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducers from "../reducers"
import appReducer from "../reducers/appReducer"
/**
 * store的入口服务
 * @author liumengniu
 * @date $
 */

/**
 * 中间件的集合
 * @type {*[]}
 */
const middlewares = []
const sagaMiddleware = createSagaMiddleware()

if (process.env.NODE_ENV === "development") {
	const { logger } = require(`redux-logger`)
	middlewares.push(logger)
}

middlewares.push(sagaMiddleware)

function configureStore(preloadedState) {
	const middlewareEnhancer = applyMiddleware(...middlewares)
	return createStore(rootReducers, preloadedState, middlewareEnhancer)
}

const appStore = configureStore()

//启动saga 中间件
// sagaMiddleware.run(sagas);

export default appStore
