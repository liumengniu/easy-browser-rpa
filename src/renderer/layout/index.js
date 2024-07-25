import React, {useState} from "react";
import {Layout} from "antd";
import {useNavigate} from "react-router-dom";
import TopBar from "@/renderer/layout/navbar/TopBar";
import "./index.less"
//-------------------- static --------------------
import logo from "@/renderer/statics/common/logo.png"
import SideBar from "@/renderer/layout/navbar/SideBar";
import ContainerMain from "@/renderer/layout/content";
// import TokenManager from "@/renderer/utils/TokenManager";
/**
 * description：layout index
 * @author Kevin
 * @date 2022/4/14
 */
const { Sider, Header, Content } = Layout;

function LayoutContainer(){
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false)
	/**
	 * logout
	 */
	const logout = () =>{
		navigate('/login', { replace: true});
		// TokenManager.removeAll();
	}
	/**
	 * toggle
	 */
	const toggle = () => {
		console.log(collapsed, '5555555555555555555555555555555555555555555555555555')
		setCollapsed(!collapsed)
	};

	return (
		<Layout className={"layout-main"}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="ant-pro-global-header-logo">
					<a className={collapsed ? 'collapsed' : ''}>
						<img src={logo} alt=""/>
						{
							!collapsed && <h1>数据采集</h1>
						}
					</a>
				</div>
				<SideBar />
			</Sider>
			<Layout className="site-layout">
				<TopBar collapsed={collapsed} toggle={toggle} logout={logout}/>
				<Content
					className="site-layout-background"
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
					}}
				>
					<ContainerMain />
				</Content>
			</Layout>
		</Layout>
	)
}

export default LayoutContainer
