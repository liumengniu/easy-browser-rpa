import './App.less';
import HomePage from "@/renderer/pages/HomePage";
import {
	createBrowserRouter,
	RouterProvider,
	HashRouter,Routes,Route,
} from "react-router-dom";
import Xiaohongshu from "@/renderer/pages/Xiaohongshu";
import BossZhiPin from "@/renderer/pages/BossZhiPin";
import DouYin from "@/renderer/pages/DouYin";
import Result from "@/renderer/pages/Result";
import {ConfigProvider, theme} from "antd";
import {useEffect, useState} from "react";
import ZhiHu from "@/renderer/pages/ZhiHu";
import Bilibili from "@/renderer/pages/Bilibili";
import LayoutContainer from "@/renderer/layout";


const router = createBrowserRouter([
	{path: "/", element: <HomePage/>,},
	{path: "xiaohongshu", element: <Xiaohongshu/>,},
	{path: "boss", element: <BossZhiPin/>,},
	{path: "douyin", element: <DouYin/>,},
	{path: "zhihu", element: <ZhiHu/>,},
	{path: "bilibili", element: <Bilibili/>,},
	{path: "result", element: <Result/>,},
]);


function App() {
	const [mode, setMode] = useState("light")
	
	useEffect(()=>{
		window?.electronAPI?.changeColorMode((_event, mainParams) => {
			setMode(mainParams);
			console.log(_event, '_event_event_event_event_event_event_event_event_event', mainParams)
		})
	}, [])
	
	return (
		<div className={`App ${mode}`}>
			<ConfigProvider
				theme={{
					algorithm: mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
				}}
			>
				{/*<RouterProvider router={router}/>*/}
				<HashRouter>
					<Routes>
						<Route path="/*" element={
							<LayoutContainer />
						} />
					</Routes>
				</HashRouter>
			</ConfigProvider>
		</div>
	)
}

export default App;
