/**
 * BOSS直聘
 * @author Kevin
 * @Date: 2024-6-9
 */


import {memo, useEffect, useMemo, useState} from "react";
import webviewScripts from "@/scripts";
import {useLocation} from "react-router-dom";
import "./index.less"
import {Button, Form, Input, Modal, Select, Space} from "antd";
import mockData from "@/renderer/mock";
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

function BossZhiPin() {
	const location = useLocation();
	const [path, setPath] = useState(null);
	const [form] = Form.useForm()
	const [form2] = Form.useForm()
	
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
			if (!path) return;
			let webIns = document.getElementById('webview2');
			webIns.openDevTools();
			webIns.executeJavaScript(webviewScripts?.getJobs(values?.type), true);
		}catch (e) {
			console.log(e, '======eeeeeeeeeeeeeeeeeeeeeeee===========')
		}
	}
	
	/**
	 * 开始筛选
	 */
	const handleSearch = async () => {
		const values = await form2.getFieldsValue(true);
		let webIns = document.getElementById('webview2');
		console.log(values, '======values===========')
		webIns.openDevTools();
		webIns.executeJavaScript(webviewScripts?.filterJobsByKeyWord(values?.city, values?.post), true);
		// 监听导航事件
		// webIns.addEventListener('did-navigate', (e) => {
		// 	console.log(e, 'urlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurl')
		// 	if (e.url.indexOf("https://www.zhipin.com/web/geek/job") > -1) {  // 开始进入筛选界面
		// 		webIns.openDevTools();
		// 		webIns.executeJavaScript(webviewScripts?.filterJobs(values?.city, values?.post, values?.salary, values?.education, values?.experience), true);
		// 	}
		// });
		webIns.addEventListener('did-finish-load', (e) => {
			console.log(e, '999999999999999999999999999999999')
			if (e.target?.src?.indexOf("https://www.zhipin.com/web/geek/job") > -1) {  // 开始进入筛选界面
				console.log(e, '888888888888888888888888888888888888888',values)
				webIns.openDevTools();
				webIns.executeJavaScript(webviewScripts?.filterJobs(values?.city, values?.post, values?.salary, values?.education, values?.experience), true);
			}
		})
		if(webIns){
			// webIns.openDevTools();
			webIns.executeJavaScript(webviewScripts?.filterJobs(values?.city, values?.post, values?.salary, values?.education, values?.experience), true);
		}
	}
	
	/**
	 * 一键海投
	 */
	const handleDelivery = () =>{
		confirm({
			centered: true,
			title: '确认一键海投?',
			icon: <ExclamationCircleFilled />,
			content: '确保您已登录BOSS直聘，并且已完善相关信息，否则BOSS官方会阻止投递',
			okText: '投递',
			cancelText: '撤回',
			onOk() {
				console.log("handleDelivery")
				if (!path) return;
				let webIns = document.getElementById('webview2');
				webIns.openDevTools();
				webIns.executeJavaScript(webviewScripts?.batchDeliveryJobs(), true);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}
	
	return (
		<div className="xiaohongshu">
			<div  className="xiaohongshu-options">
				<Form form={form} labelCol={{ span: 8 }} labelWrap={true}>
					<Form.Item label="存储形式" name="type" rules={[{required: true, message: '请选择存储形式!'}]}>
						<Select options={options}/>
					</Form.Item>
					<Form.Item wrapperCol={{offset: 8, span: 16,}}>
						<Button type="primary" onClick={handleCollection}>
							开始采集
						</Button>
					</Form.Item>
				</Form>
				<Form form={form2} labelCol={{ span: 8 }}>
					<Form.Item label="切换城市" name="city" initialValue={"长沙"}>
						<Input />
					</Form.Item>
					<Form.Item label="岗位" name="post" initialValue={"JAVA开发"}>
						<Input />
					</Form.Item>
					<Form.Item label="薪资范围" name="salary">
						<Select options={mockData.salary}/>
					</Form.Item>
					<Form.Item label="学历" name="education">
						<Select options={mockData.education}/>
					</Form.Item>
					<Form.Item label="经验" name="experience">
						<Select options={mockData.experience}/>
					</Form.Item>
					<Form.Item wrapperCol={{offset: 8, span: 16,}}>
						<Space>
							<Button type="primary" onClick={handleSearch}>开始筛选</Button>
							<Button type="primary" onClick={handleDelivery}>一键海投</Button>
						</Space>
					</Form.Item>
				</Form>
			</div>
			<div className="xiaohongshu-webview">
				{
					path && <webview
						id="webview2"
						className="webview"
						nodeintegration="yes"
						allowpopups="yes"
						nodeintegrationinsubframes="yes"
						allowrunninginsecurecontent="yes"
						disablewebsecurity="yes"
						webpreferences="contextIsolation=no"
						src={location?.state?.src || "https://www.zhipin.com/"}
						preload={path}
					/>
				}
			</div>
		</div>
	)
}

function isEqual(prevProps, nextProps) {
	return prevProps.path === nextProps.path
}

export default memo(BossZhiPin, isEqual)
