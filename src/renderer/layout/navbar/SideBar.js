/**
 * description：
 * @author Kevin
 * @date 2022/4/14
 */
import routers from "@/renderer/routers"
import {Menu} from "antd";
import {Link, useLocation} from "react-router-dom";

function SideBar(){
	const location = useLocation()
	console.log(location,'0000000000000000000000000000')

	return (
		<Menu
			defaultSelectedKeys={['/banner-management']}
			mode="inline"
			theme="dark"
		>
			{
				routers.map((route,idx) => !route.hidden && <Menu.Item key={route.path} icon={route.icon}><Link to={route.path}>{route.title}</Link></Menu.Item>)
			}
		</Menu>
	)
}

export default SideBar
