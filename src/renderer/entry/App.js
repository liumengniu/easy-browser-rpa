import './App.less';
import {useEffect} from "react";
import { PageContainer, ProCard, ProLayout, DefaultFooter } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import {
	ChromeFilled,
	CrownFilled,
	SmileFilled,
	TabletFilled,
} from '@ant-design/icons';
import { useState } from 'react';
import { CheckCard } from '@ant-design/pro-components';
import _ from "lodash"

const defaultProps = {
	route: {
		path: '/',
			routes: [
			{
				path: '/welcome',
				name: '欢迎',
				icon: <SmileFilled />,
				component: './Welcome',
			},
			{
				path: '/admin',
				name: '管理页',
				icon: <CrownFilled />,
				access: 'canAdmin',
				component: './Admin',
				routes: [
					{
						path: '/admin/sub-page1',
						name: '一级页面',
						icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
						component: './Welcome',
					},
					{
						path: '/admin/sub-page2',
						name: '二级页面',
						icon: <CrownFilled />,
						component: './Welcome',
					},
					{
						path: '/admin/sub-page3',
						name: '三级页面',
						icon: <CrownFilled />,
						component: './Welcome',
					},
				],
			},
			{
				name: '列表页',
				icon: <TabletFilled />,
				path: '/list',
				component: './ListTableList',
				routes: [
					{
						path: '/list/sub-page',
						name: '列表页面',
						icon: <CrownFilled />,
						routes: [
							{
								path: 'sub-sub-page1',
								name: '一一级列表页面',
								icon: <CrownFilled />,
								component: './Welcome',
							},
							{
								path: 'sub-sub-page2',
								name: '一二级列表页面',
								icon: <CrownFilled />,
								component: './Welcome',
							},
							{
								path: 'sub-sub-page3',
								name: '一三级列表页面',
								icon: <CrownFilled />,
								component: './Welcome',
							},
						],
					},
					{
						path: '/list/sub-page2',
						name: '二级列表页面',
						icon: <CrownFilled />,
						component: './Welcome',
					},
					{
						path: '/list/sub-page3',
						name: '三级列表页面',
						icon: <CrownFilled />,
						component: './Welcome',
					},
				],
			},
			{
				path: 'https://ant.design',
				name: 'Ant Design 官网外链',
				icon: <ChromeFilled />,
			},
		],
	},
	location: {
		pathname: '/',
	},
	appList: [
		{
			icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
			title: 'Ant Design',
			desc: '杭州市较知名的 UI 设计语言',
			url: 'https://ant.design',
		},
		{
			icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
			title: 'AntV',
			desc: '蚂蚁集团全新一代数据可视化解决方案',
			url: 'https://antv.vision/',
			target: '_blank',
		},
		{
			icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
			title: 'Pro Components',
			desc: '专业级 UI 组件库',
			url: 'https://procomponents.ant.design/',
		},
		{
			icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
			title: 'umi',
			desc: '插件化的企业级前端应用框架。',
			url: 'https://umijs.org/zh-CN/docs',
		},
		
		{
			icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
			title: 'qiankun',
			desc: '可能是你见过最完善的微前端解决方案🧐',
			url: 'https://qiankun.umijs.org/',
		},
		{
			icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
			title: '语雀',
			desc: '知识创作与分享工具',
			url: 'https://www.yuque.com/',
		},
		{
			icon: 'https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg',
			title: 'Kitchen ',
			desc: 'Sketch 工具集',
			url: 'https://kitchen.alipay.com/',
		},
		{
			icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
			title: 'dumi',
			desc: '为组件开发场景而生的文档工具',
			url: 'https://d.umijs.org/zh-CN',
		},
	],
};

function App() {
	// useEffect(() => {
	// 	let webIns = document.getElementById('webview');
	// 	webIns.addEventListener('dom-ready', () => {
	// 		webIns.openDevTools();
	// 		webIns.executeJavaScript(webviewScripts.getScript(_.toNumber(data?.systemId), data?.account, data?.password));
	// 	});
	// }, [])
	
	const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
  
  return (
    <div className="App">
      {/*<webview id="webview" src={"https://www.xiaohongshu.com/explore"} />*/}
	
	    <ProLayout
		    {...defaultProps}
		    style={{
			    height: '100vh',
		    }}
		    breakpoint={false}
		    collapsed
		    location={{
			    pathname: '/welcome',
		    }}
		    footerRender={() => (
			    <DefaultFooter
				    links={[
					    { key: 'test', title: 'layout', href: 'www.alipay.com' },
					    { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
				    ]}
				    copyright="这是一条测试文案"
			    />
		    )}
	    >
		    <PageContainer content="欢迎使用">
			    <CheckCard.Group
				    onChange={(value) => {
					    console.log('value', value);
				    }}
				    defaultValue="A"
			    >
				    {
					    _.map(new Array(30), (item, idx) => {
						    return <CheckCard
							    key={idx}
							    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
							    title="示例一"
							    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
							    onChange={(checked) => {
								    console.log('checked', checked);
							    }}
							    defaultChecked
							    onClick={() => {
								    console.log('clicked');
							    }}
						    />
					    })
				    }
			    </CheckCard.Group>
		    </PageContainer>
	    </ProLayout>
    </div>
  );
}

export default App;
