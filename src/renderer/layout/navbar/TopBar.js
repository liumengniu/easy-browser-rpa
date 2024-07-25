import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined} from "@ant-design/icons";
import {Avatar, Layout, Dropdown, Menu} from "antd";


const { Header } = Layout;
/**
 * description：
 * @author Kevin
 * @date 2022/4/14
 */

function TopBar(props){
	/**
	 * menu
	 * @type {JSX.Element}
	 */
	const menu = (
		<Menu>
			<Menu.Item key="0">
				<a href="https://www.baidu.com">预留功能1</a>
			</Menu.Item>
			<Menu.Item key="1">
				<a href="https://www.baidu.com">预留功能2</a>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="3" onClick={props.logout}>退出登录</Menu.Item>
		</Menu>
	);

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			<div className={"top-bar-box"}>
				{
					props.collapsed ? <MenuUnfoldOutlined onClick={props.toggle}/> : <MenuFoldOutlined onClick={props.toggle}/>
				}
				<div className={"user-center"}>
					<Avatar src="https://joeschmoe.io/api/v1/random" />
					<Dropdown overlay={menu} arrow>
						<a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color: 'white', marginLeft: '20px'}}>
							<span className={"user-name"}>Joe Biden</span> <DownOutlined />
						</a>
					</Dropdown>
				</div>
			</div>

		</Header>
	)
}

export default TopBar
