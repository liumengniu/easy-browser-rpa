/**
 * @author Kevin
 * @Date: 2024-4-17
 */

import {useEffect, useState} from "react";
import webviewScripts from "@/scripts";
import { useLocation } from "react-router-dom"

function WebPage(props) {
	const location = useLocation();
	const [_path, setPath] = useState(null);
	
	
	useEffect(() => {
		if (!_path) return
		let webIns = document.getElementById('webview');
		webIns.addEventListener('dom-ready', () => {
			webIns.openDevTools();
			webIns.executeJavaScript(webviewScripts?.xiaohongshuScript);
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
					id="webview"
					nodeintegration="yes"
					allowpopups="yes"
					nodeintegrationinsubframes="yes"
					allowRunningInsecureContent="yes"
					disablewebsecurity="yes"
					webpreferences="contextIsolation=no"
					src={location?.state?.src}
					preload={_path}
				/>
			}
		</>
	)
}

export default WebPage
