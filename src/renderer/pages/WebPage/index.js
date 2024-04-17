/**
 * @author Kevin
 * @Date: 2024-4-17
 */

import {useEffect} from "react";

function WebPage(props) {
	useEffect(() => {
		let webIns = document.getElementById('webview');
		webIns.addEventListener('dom-ready', () => {
			webIns.openDevTools();
			// webIns.executeJavaScript(webviewScripts.getScript(_.toNumber(data?.systemId), data?.account, data?.password));
		});
	}, [])
	
	return (
		<webview id="webview" src={"https://www.xiaohongshu.com/explore"}/>
	)
}

export default WebPage
