import HomePage from "@/renderer/pages/HomePage";
import Xiaohongshu from "@/renderer/pages/Xiaohongshu";
import BossZhiPin from "@/renderer/pages/BossZhiPin";
import DouYin from "@/renderer/pages/DouYin";
import ZhiHu from "@/renderer/pages/ZhiHu";
import Bilibili from "@/renderer/pages/Bilibili";
import Result from "@/renderer/pages/Result";

/**
 * 路由入口
 * @author Kevin
 * @Date: 2024-6-9
 */

const routers = [
	{title: '首页',path: "/", element: <HomePage/>,},
	{title: '小红书',path: "/xiaohongshu", element: <Xiaohongshu/>,},
	{title: 'BOSS直聘',path: "/boss", element: <BossZhiPin/>,},
	{title: '抖音',path: "/douyin", element: <DouYin/>,},
	{title: '知乎',path: "/zhihu", element: <ZhiHu/>,},
	{title: 'B站',path: "/bilibili", element: <Bilibili/>,},
	{title: '结果',path: "/result", element: <Result/>,},
]

export default routers
