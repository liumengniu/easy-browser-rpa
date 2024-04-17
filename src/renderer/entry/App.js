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

const menuData = [
	{
		"name": "系统管理",
		"icon": <CrownFilled/>,
		"path": "/",
		component: "@/pages/HomePage" ,
		"locale": "menu.system",
		"routes": [
			{
				"path": "/menu-manager",
				"name": "菜单管理",
				"exact": true,
				"locale": "menu.system.menu-manager",
			},
			{
				"path": "/role-manager",
				"name": "角色管理",
				"exact": true,
				"locale": "menu.system.role-manager",
			},
			{
				"path": "/user-manager",
				"name": "用户管理",
				"exact": false,
				"locale": "menu.system.user-manager",
				component: "@/pages/user-manager" ,
			}
		]
	},
]

function App() {
	useEffect(() => {
		let webIns = document.getElementById('webview');
		webIns.addEventListener('dom-ready', () => {
			webIns.openDevTools();
			// webIns.executeJavaScript(webviewScripts.getScript(_.toNumber(data?.systemId), data?.account, data?.password));\
			webIns.executeJavaScript(`
			
			`)
		});
	}, [])
	
	return (
		<webview id="webview" src={"https://www.zhihu.com/"}/>
	)
}

export default App;
