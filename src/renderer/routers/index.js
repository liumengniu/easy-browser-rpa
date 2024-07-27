import HomePage from "@/renderer/pages/HomePage";
import Xiaohongshu from "@/renderer/pages/Xiaohongshu";
import BossZhiPin from "@/renderer/pages/BossZhiPin";
import DouYin from "@/renderer/pages/DouYin";
import ZhiHu from "@/renderer/pages/ZhiHu";
import Bilibili from "@/renderer/pages/Bilibili";
import Result from "@/renderer/pages/Result";
import NewScript from "@/renderer/pages/Xiaohongshu/NewScript";

import {HomeOutlined,SettingOutlined, ChromeOutlined,ZhihuOutlined, TikTokOutlined,BilibiliOutlined,RobotOutlined } from "@ant-design/icons"

/**
 * 路由入口
 * @author Kevin
 * @Date: 2024-6-9
 */

const routers = [
	{label: '首页', path: "/", element: <HomePage/>, icon: <HomeOutlined/>},
	{
		label: '小红书', path: "/xiaohongshu", element: <Xiaohongshu/>, icon: <ChromeOutlined/>,
		children: [
			{label: '打开网页', path: "/xiaohongshu/open-website", element: <Xiaohongshu/>,},
			{label: '新建脚本', path: "/xiaohongshu/new-script", element: <NewScript/>,},
			{label: '我的脚本列表', path: "/xiaohongshu/my-script", element: <NewScript/>,},
		]
	},
	{
		label: 'BOSS直聘', path: "/boss", element: <BossZhiPin/>, icon: <ChromeOutlined/>,
		children: [
			{label: '打开网页', path: "/boss/open-website", element: <BossZhiPin/>,},
		]
	},
	{
		label: '抖音', path: "/douyin", element: <DouYin/>, icon: <TikTokOutlined/>,
		children: [
			{label: '打开网页', path: "/douyin/open-website", element: <DouYin/>,},
		]
	},
	{
		label: '知乎', path: "/zhihu", element: <ZhiHu/>, icon: <ZhihuOutlined />,
		children: [
			{label: '打开网页', path: "/zhihu/open-website", element: <ZhiHu/>,},
		]
	},
	{
		label: 'B站', path: "/bilibili", element: <Bilibili/>, icon: <BilibiliOutlined/>,
		children: [
			{label: '打开网页', path: "/bilibili/open-website", element: <Bilibili/>,},
		]
	},
	{label: '结果', path: "/result", element: <Result/>,icon: <RobotOutlined />},
	{label: '系统设置', path: "/setting", element: <Result/>, icon: <SettingOutlined/>},
]

export default routers
