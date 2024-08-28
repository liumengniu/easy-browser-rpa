import HomePage from "@/renderer/pages/HomePage";
import Xiaohongshu from "@/renderer/pages/Xiaohongshu";
import BossZhiPin from "@/renderer/pages/BossZhiPin";
import DouYin from "@/renderer/pages/DouYin";
import Result from "@/renderer/pages/Result";
import MyProcess from "@/renderer/pages/MyProcess";
import CustomProcess from "@/renderer/pages/CustomProcess";
import ExecutionProcess from "@/renderer/pages/CustomProcess/ExecutionProcess";

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
		label: '自定义流程', path: "/custom-process",icon: <RobotOutlined/>,
		children: [
			{label: '配置流程', path: "/custom-process/custom-process", element: <CustomProcess/>,},
			{label: '执行流程', path: "/custom-process/execution-process", element: <ExecutionProcess/>,},
		]
	},
	{label: '我的流程列表', path: "/my-process", element: <MyProcess/>,icon: <RobotOutlined />},
	{label: '本地磁盘数据', path: "/result", element: <Result/>,icon: <RobotOutlined />},
	{label: '系统设置', path: "/setting", element: <Result/>, icon: <SettingOutlined/>},
]

export default routers
