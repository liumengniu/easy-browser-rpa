import './App.less';
import HomePage from "@/renderer/pages/HomePage";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Xiaohongshu from "@/renderer/pages/Xiaohongshu";
import BossZhiPin from "@/renderer/pages/BossZhiPin";
import DouYin from "@/renderer/pages/DouYin";
import Result from "@/renderer/pages/Result";


const router = createBrowserRouter([
	{path: "/", element: <HomePage/>,},
	{path: "xiaohongshu", element: <Xiaohongshu/>,},
	{path: "boss", element: <BossZhiPin/>,},
	{path: "douyin", element: <DouYin/>,},
	{path: "result", element: <Result/>,},
]);


function App() {
	
	return (
		<>
			<RouterProvider router={router}/>
		</>
	)
}

export default App;
