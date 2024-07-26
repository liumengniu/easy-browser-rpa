/**
 * 描述： 对store的数据进行分发，控制UI元素的刷新和渲染
 * @author liumengniu
 * @date 2021/12/13
 */
import { createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import routers from "@/renderer/routers"

//state
const allState = state => state

/**
 * 获取路由
 * @param state
 */
const currentRouter = state => _.get(state, "routerReducer") //获取state的当前路由信息

export {}
