/**
 * BOSS直聘
 * @author Kevin
 * @Date: 2024-6-9
 */


/**
 * @author Kevin
 * @Date: 2024-4-17
 */

import {memo, useEffect, useMemo, useState} from "react";
import webviewScripts from "@/scripts";
import {useLocation} from "react-router-dom";

function BossZhiPin() {
	const location = useLocation();
	const [path, setPath] = useState(null);
	
	
	useEffect(() => {
		console.log("执行次数")
		if(!path) return
		let webIns = document.getElementById('webview2');
		webIns.addEventListener('did-finish-load', () => {
			webIns.openDevTools();
			webIns.executeJavaScript(webviewScripts?.bossScript);
		});
	}, [path])
	
	useEffect(() => {
		getPathFn();
	}, [])
	
	
	/**
	 * 通过主进程获取预加载文件路径
	 * @returns {Promise<void>}
	 */
	const getPathFn = async () => {
		let fileAbPath = await window?.electronAPI?.getPathFn("preload3.js")
		setPath(fileAbPath)
	}
	
	return (
		<>
			{
				path !== null && <webview
					id="webview2"
					className="webview"
					nodeintegration="yes"
					allowpopups="yes"
					nodeintegrationinsubframes="yes"
					allowRunningInsecureContent="yes"
					disablewebsecurity="yes"
					webpreferences="contextIsolation=no"
					src={"https://www.zhipin.com/"}
					preload={path}
				/>
			}
		</>
	)
}

function isEqual(prevProps, nextProps) {
	return prevProps.path === nextProps.path
}

export default memo(BossZhiPin, isEqual)
