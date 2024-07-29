/**
 * 知乎页
 * @author Kevin
 * @Date: 2024-6-11
 */

import {useEffect, useState} from "react";
import webviewScripts from "@/scripts";
import { useLocation } from "react-router-dom"


function ZhiHu() {
	const location = useLocation();
	const [_path, setPath] = useState(null);
	
	
	useEffect(() => {
		if (!_path) return
		let webIns = document.getElementById('webview4');
		webIns.addEventListener('dom-ready', () => {
			webIns.openDevTools();
			webIns.executeJavaScript(webviewScripts?.zhihuScript);
		});
	}, [_path])
	
	useEffect(() => {
		getPathFn();
	}, [])
	
	
	/**
	 * 通过主进程获取预加载文件路径
	 * @returns {Promise<void>}
	 */
	const getPathFn = async () => {
		let fileAbPath = await window?.electronAPI?.getPathFn("preload2.js")
		setPath(fileAbPath)
	}
	
	return (
		<>
			{
				_path && <webview
					id="webview4"
					nodeintegration="yes"
					allowpopups="yes"
					nodeintegrationinsubframes="yes"
					allowrunninginsecurecontent="yes"
					disablewebsecurity="yes"
					webpreferences="contextIsolation=no"
					src={location?.state?.src}
					preload={_path}
				/>
			}
		</>
	)
}

export default ZhiHu
