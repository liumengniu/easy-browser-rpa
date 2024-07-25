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
	{title: 'Home',path: "/", element: <HomePage/>,},
	{path: "xiaohongshu", element: <Xiaohongshu/>,},
	{path: "boss", element: <BossZhiPin/>,},
	{path: "douyin", element: <DouYin/>,},
	{path: "zhihu", element: <ZhiHu/>,},
	{path: "bilibili", element: <Bilibili/>,},
	{path: "result", element: <Result/>,},
]

export default routers
