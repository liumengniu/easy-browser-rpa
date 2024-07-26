/**
 * @author Kevin
 * @Date: 2024-4-17
 */

import {useEffect, useState} from "react";
import webviewScripts from "@/scripts";
import { useLocation } from "react-router-dom"
import "./index.less"
import {Button, Form, Input} from "antd";

function WebPage(props) {
	const location = useLocation();
	const [_path, setPath] = useState(null);
	
	
	useEffect(() => {
		if (!_path) return
		let webIns = document.getElementById('webview');
		webIns.addEventListener('dom-ready', () => {
			webIns.openDevTools();
			webIns.executeJavaScript(webviewScripts?.xiaohongshuScript);
		});
	}, [_path])
	
	useEffect(() => {
		getPathFn();
	}, [])
	
	
	/**
	 * 通过主进程获取预加载文件路径
	 * @returns {Promise<void>}
	 */
	const getPathFn = async () => {
		let fileAbPath = await window?.electronAPI?.getPathFn("preload2.js")
		setPath(fileAbPath)
	}
	
	return (
		<div className="xiaohongshu">
			<div  className="xiaohongshu-options">
				<Form>
					<Form.Item label="选择流程" name="username" rules={[{required: true, message: 'Please input your username!'}]}>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{offset: 8, span: 16,}}>
						<Button type="primary" htmlType="submit">
							开始采集
						</Button>
					</Form.Item>
				</Form>
			</div>
			<div className="xiaohongshu-webview">
				{
					_path && <webview
						id="webview"
						nodeintegration="yes"
						allowpopups="yes"
						nodeintegrationinsubframes="yes"
						allowRunningInsecureContent="yes"
						disablewebsecurity="yes"
						webpreferences="contextIsolation=no"
						src={location?.state?.src}
						preload={_path}
					/>
				}
			</div>
			
			
		</div>
	)
}

export default WebPage
