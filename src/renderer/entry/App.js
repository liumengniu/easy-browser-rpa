import './App.less';
import {useEffect} from "react";
import {PageContainer, ProCard, ProLayout, DefaultFooter} from '@ant-design/pro-components';
import {Button, Input} from 'antd';
import {
	ChromeFilled,
	CrownFilled,
	SmileFilled,
	TabletFilled,
} from '@ant-design/icons';
import {useState} from 'react';
import {CheckCard} from '@ant-design/pro-components';
import _ from "lodash"
import mockData from "@/renderer/mock";
import HomePage from "@/renderer/pages/HomePage";
import webviewScripts from "@/scripts";


function App() {
	const [_path, setPath] = useState(null);
	
	
	useEffect(() => {
		if(!_path) return
		let webIns = document.getElementById('webview');
		webIns.addEventListener('dom-ready', () => {
			webIns.openDevTools();
			webIns.executeJavaScript(webviewScripts?.xiaohongshuScript);
		});
	}, [_path])
	
	useEffect(()=>{
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
					src={"https://www.xiaohongshu.com/explore"}
					preload={_path}
				/>
			}
		</>
	)
}

export default App;
