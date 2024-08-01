/**
 * 抖音
 * @author Kevin
 * @Date: 2024-6-10
 */

import {useEffect, useState} from "react";
import webviewScripts from "@/scripts";
import { useLocation } from "react-router-dom"
import douyinScript from "@/scripts/douyin";
import "./index.less"
import {Button, Form, Input, Select, Space} from "antd";

function DouYin() {
	const location = useLocation();
	const [_path, setPath] = useState(null);
	const [form] = Form.useForm()
	
	
	// useEffect(() => {
	// 	if (!_path) return
	// 	let webIns = document.getElementById('webview');
	// 	webIns.addEventListener('dom-ready', () => {
	// 		webIns.openDevTools();
	// 		webIns.executeJavaScript(webviewScripts?.getShortVideoList("本地数据库"), true);
	// 	});
	// }, [_path])
	
	useEffect(() => {
		getPathFn();
	}, [])

	const options = [
		{label: '本地磁盘', value: '本地磁盘'},
		{label: '本地数据库', value: '本地数据库'}
	]



	/**
	 * 通过主进程获取预加载文件路径
	 * @returns {Promise<void>}
	 */
	const getPathFn = async () => {
		let fileAbPath = await window?.electronAPI?.getPathFn("preload2.js")
		setPath(fileAbPath)
	}

	/**
	 * 搜索
	 */
	const handleSearch = () =>{
		const values = form.getFieldsValue(true);
	}

	/**
	 * 数据采集
	 */
	const handleCollection = async () =>{
		const values = await form.getFieldsValue(true);
		console.log(values, '======values===========')
		if (!_path) return;
		let webIns = document.getElementById('webview');
		webIns.openDevTools();
		webIns.executeJavaScript(webviewScripts?.getShortVideoList(values?.type), true);
	}
	
	return (
		<div className="xiaohongshu">
			<div  className="xiaohongshu-options">
				<Form labelCol={{ span: 8 }}  labelWrap={true} form={form}>
					<Form.Item label="存储形式" name="type" rules={[{required: true, message: '请选择存储形式!'}]}>
						<Select options={options}/>
					</Form.Item>
					<Form.Item wrapperCol={{offset: 8, span: 16,}}>
						<Space>
							<Button type="primary" onClick={handleSearch}>开始筛选</Button>
							<Button type="primary" onClick={handleCollection}>开始采集</Button>
						</Space>
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
						src={location?.state?.src || "https://www.douyin.com/discover"}
						preload={_path}
					/>
				}
			</div>
		</div>
	)
}

export default DouYin
