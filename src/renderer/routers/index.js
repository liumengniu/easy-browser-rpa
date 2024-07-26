import HomePage from "@/renderer/pages/HomePage";
import Xiaohongshu from "@/renderer/pages/Xiaohongshu";
import BossZhiPin from "@/renderer/pages/BossZhiPin";
import DouYin from "@/renderer/pages/DouYin";
import ZhiHu from "@/renderer/pages/ZhiHu";
import Bilibili from "@/renderer/pages/Bilibili";
import Result from "@/renderer/pages/Result";
import NewScript from "@/renderer/pages/Xiaohongshu/NewScript";

/**
 * 路由入口
 * @author Kevin
 * @Date: 2024-6-9
 */

const routers = [
	{label: '首页',path: "/", element: <HomePage/>,},
	{
		label: '小红书',path: "/xiaohongshu", element: <Xiaohongshu/>,
		children: [
			{label: '打开网页',path: "/xiaohongshu/open-website", element: <Xiaohongshu/>,},
			{label: '新建脚本',path: "/xiaohongshu/new-script", element: <NewScript/>,},
			{label: '我的脚本列表',path: "/xiaohongshu/my-script", element: <NewScript/>,},
		]
	},
	{label: 'BOSS直聘',path: "/boss", element: <BossZhiPin/>,},
	{label: '抖音',path: "/douyin", element: <DouYin/>,},
	{label: '知乎',path: "/zhihu", element: <ZhiHu/>,},
	{label: 'B站',path: "/bilibili", element: <Bilibili/>,},
	{label: '结果',path: "/result", element: <Result/>,},
]

export default routers
