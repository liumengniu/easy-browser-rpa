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
	 * 菜单配置项
	 * @type {[{label: JSX.Element, key: string}, {label: JSX.Element, key: string}, {label: JSX.Element, key: string}]}
	 */
	const items = [
		{key: '0',label: <a href="https://www.baidu.com">预留功能1</a>},
		{key: '1',label: <a href="https://www.baidu.com">预留功能1</a>},
		{key: '3',label: <a href="https://www.baidu.com">退出登录</a>},
	]

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			<div className={"top-bar-box"}>
				{
					props.collapsed ? <MenuUnfoldOutlined onClick={props.toggle}/> : <MenuFoldOutlined onClick={props.toggle}/>
				}
				<div className={"user-center"}>
					<Avatar src="https://joeschmoe.io/api/v1/random" />
					<Dropdown menu={{items}} arrow>
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
