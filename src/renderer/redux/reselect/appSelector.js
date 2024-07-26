import _ from "lodash";
import { createSelector } from "@reduxjs/toolkit";

/**
 * 描述：全局数据的 reselect
 * @author liumengniu
 * @date 2021/12/29
 */

const appState = state => _.get(state, 'appReducer');   //获取app的state信息
/**
 * 获取用户角色
 */
const getRole = createSelector(appState, a=> {
  return a.userReducer.role;
})

export {
  getRole
}
