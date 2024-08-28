/**
 * 执行流程
 * @author Kevin
 * @Date:
 */
import "./index.less"
import {Button, Form, Input, Select, Space} from "antd";
import mockData from "@/renderer/mock";
import {useEffect, useState} from "react";
import _ from "lodash";
import utils from "@utils";


function ExecutionProcess(){
	const [form] = Form.useForm();
	const [data, setData] = useState([])
	const [_path, setPath] = useState(null);
	const processItem = Form.useWatch('process', form);

	useEffect(() => {
		getProcess()
	}, [])

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

	/**
	 * 获取流程数据
	 */
	const getProcess = async () => {
		const originalString = await window.electronAPI?.getProcess();
		const list = _.split(_.trim(originalString), '\n')
		const hashList = _.map(list, (o, idx)=> {
			let item = o;
			if(utils.isJson(o)){
				item = JSON.parse(o)
				item.label = item.questionnaireTitle
				item.value = JSON.stringify(item.data)
			}
			return item
		});
		setData(hashList)
	}

	/**
	 * 开始执行流程
	 */
	const handleProcess = () =>{
		const processData  = JSON.parse(processItem);
		console.log(processData, '==========================================')
	}


	return (
		<div className="execution-process">
			<div className="xiaohongshu">
				<div className="xiaohongshu-options">
					<Form  form={form} labelCol={{ span: 8 }} labelWrap={true}>
						<Form.Item label="选择流程" name="process">
							<Select options={data}/>
						</Form.Item>
						<Form.Item label=" " colon={false}>
							<Space>
								<Button type="primary" onClick={handleProcess}>执行流程</Button>
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
							webPreferences="contextIsolation=no"
							// src={location?.state?.src || 'https://www.xiaohongshu.com/explore'}
							preload={_path}
						/>
					}
				</div>


			</div>
		</div>
	)
}

export default ExecutionProcess