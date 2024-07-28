import {Route, Routes} from "react-router-dom";
import React from "react";
import _ from "lodash";
import routers from "@/renderer/routers";

/**
 * description：
 * @author Kevin
 * @date 2022/4/14
 */

function ContainerMain(){
	/**
	 * 渲染底层路由
	 * @param route
	 * @returns {JSX.Element}
	 */
	const renderRoute = route => <Route key={route.path} exact path={route.path} element={
		<div style={{ background: "#fff" }}>{route.element}</div>}
	/>
	
	/**
	 * 渲染次级路由
	 * @param routes
	 */
	const renderRoutes = (routes) => routes.map(r=>{
		if(!_.isEmpty(r.children)){
			return renderRoutes(r.children);
		} else {
			return renderRoute(r);
		}
	})
	
	const renderFirstLevelRoute = (routes) => routes.map(r=> renderRoute(r));
	
	return (
		<>
			<Routes>
				{renderRoutes(routers)}
			</Routes>
		</>
	)
}

export default ContainerMain
