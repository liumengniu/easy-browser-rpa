/**
 * @author Kevin
 * @Date: 2024-4-17
 */

import {useEffect, useState} from "react";
import webviewScripts from "@/scripts";
import { useLocation } from "react-router-dom"
import "./index.less"
import {Button, Form, Input, Select} from "antd";

function WebPage(props) {
	const location = useLocation();
	const [_path, setPath] = useState(null);
	const [form] = Form.useForm()
	
	// useEffect(() => {
	// 	if (!_path) return
	// 	let webIns = document.getElementById('webview');
	// 	webIns.addEventListener('dom-ready', () => {
	// 		webIns.openDevTools();
	// 		webIns.executeJavaScript(webviewScripts?.xiaohongshuScript);
	// 	});
	// }, [_path])
	
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
	
	const options = [
		{label: '本地磁盘', value: '本地磁盘'},
		{label: '本地数据库', value: '本地数据库'}
	]
	
	/**
	 * 数据采集
	 */
	const handleCollection = async () =>{
		try {
			const values = await form.validateFields();
			console.log(values, '======values===========')
			if (!_path) return;
			let webIns = document.getElementById('webview');
			webIns.openDevTools();
			webIns.executeJavaScript(webviewScripts?.xiaohongshuScript(values?.type), true);
		}catch (e) {
			console.log(e, '======eeeeeeeeeeeeeeeeeeeeeeee===========')
		}
	}
	
	return (
		<div className="xiaohongshu">
			<div  className="xiaohongshu-options">
				<Form form={form}>
					<Form.Item label="选择流程(开发中)" name="process">
						<Input />
					</Form.Item>
					<Form.Item label="存储形式" name="type" rules={[{required: true, message: '请选择存储形式!'}]}>
						<Select options={options}/>
					</Form.Item>
					<Form.Item wrapperCol={{offset: 8, span: 16,}}>
						<Button type="primary" onClick={handleCollection}>
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
						allowrunninginsecurecontent="yes"
						disablewebsecurity="yes"
						webpreferences="contextIsolation=no"
						src={location?.state?.src || 'https://www.xiaohongshu.com/explore'}
						preload={_path}
					/>
				}
			</div>
			
			
		</div>
	)
}

export default WebPage
