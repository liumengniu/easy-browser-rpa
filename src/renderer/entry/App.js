import './App.less';
import HomePage from "@/renderer/pages/HomePage";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import WebPage from "@/renderer/pages/WebPage";


const router = createBrowserRouter([
	{path: "/", element: <HomePage/>,},
	{path: "xiaohongshu", element: <WebPage/>,},
]);


function App() {
	
	return (
		<>
			<RouterProvider router={router}/>
		</>
	)
}

export default App;
