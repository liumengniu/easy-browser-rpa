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
				setTimeout(()=>{
					var doc = document;
					var exploreFeeds = doc.getElementById("exploreFeeds")
					var sections = doc.getElementsByClassName("note-item");
					console.log(sections, "sections=========")
					for (var i=0;i<sections.length;i++){
						const section = sections[i];
						var footer = section.querySelector(".footer");
						var title = footer.querySelector(".title");
						var titleSpan = footer.querySelector("span");
						// 1、获取小红书标题
						const textContent = titleSpan?.textContent;
						// 2、获取每个帖子图片、帖子地址、帖子详情
						var aElement = section.querySelector("a.mask");
						var aImg = aElement.querySelector("img");
						var imgSrc = aImg.src;      //帖子图片
						var aHref = aElement.href;  //帖子详情
						var styleObj = aElement.style;
						console.log(aElement, '9999', aHref, '555', styleObj, '000', imgSrc)
					}
				}, 10000)
			`)
		});
	}, [])
	
	return (
		<webview
			id="webview"
			nodeintegration="yes"
			allowpopups="yes"
			nodeintegrationinsubframes="yes"
			allowRunningInsecureContent="yes"
			disablewebsecurity="yes"
			webpreferences="contextIsolation=no"
			src={"https://www.xiaohongshu.com/explore"}/>
	)
}

export default App;
