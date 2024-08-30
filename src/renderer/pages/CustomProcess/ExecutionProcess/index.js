/**
 * 执行流程
 * @author Kevin
 * @Date:
 */
import "./index.less"
import {Button, Form, Input, Select, Space, message} from "antd";
import mockData from "@/renderer/mock";
import {useEffect, useRef, useState} from "react";
import _ from "lodash";
import utils from "@utils";
import interpreter from "@/interpreter/interpreter"


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
	const handleProcess = async () => {
		try{
			console.log(processItem, '----------')
			const values = await form.validateFields();
			const processData = JSON.parse(processItem);
			const webIns = document.getElementById("webview")
			webIns.src = 'https://www.xiaohongshu.com/explore'
			// 自定义流程数据 -> 脚本 -> 脚本字符串
			const customScript = data2script(_.filter(processData, o=>o.type !== 'open_browser'))
			console.log(customScript, '==========customScript===========',webIns)
			webIns.preload = _path;
			webIns.addEventListener('dom-ready', (e) => {
				webIns.openDevTools();
				webIns.executeJavaScript(customScript, true);
			});

		}catch (e){

		}
	}

	/**
	 * 拼接流程全部函数字符串
	 * @param processData
	 * @returns {string}
	 */
	const data2script = (processData) =>{
		return getChainableFunStr(processData.map(step => {
			return {
				name: step.type,
				args: step.type === 'find_element' ? [step.name] :  'find_child_by_number' ? [step.name, step.num] : [step.num || step.value]
			}
		}))
	};


	const getFunStr = (methodName, ...args) => {
		try {
			if (_.isFunction(interpreter[methodName])) {
				// 获取方法体并将其注入到 webview 中
				const funcBody = interpreter[methodName].toString();
				const argsStr = args.map(arg => JSON.stringify(arg)).join(', ');
				const script = `
                (function() {
                    const method = ${funcBody};
                    return method(${argsStr});
                })();
            `;
				return script;
			} else {
				throw new Error(`Method ${methodName} is not a function`);
			}
		} catch (error) {
			console.error('Error generating script for method:', error);
			return `console.error('Error generating script for method ${methodName}: ${error.message}')`;
		}
	}

	/**
	 * 链式调用 -> 函数字符串
	 * @param methodNamesAndArgs
	 * @returns {string}
	 */
	const getChainableFunStr = (methodNamesAndArgs) => {
		try {
			let script = '(function() {';
			script += `let result;`; // 初始化 result 变量，用于存储中间结果

			methodNamesAndArgs.forEach(({ name, args }, index) => {
				if (_.isFunction(interpreter[name])) {
					const funcBody = interpreter[name].toString();

					// 如果是第一个函数调用，直接使用参数；否则，将 result 作为第一个参数传递
					const argsStr = args.map((arg, i) => {
						return index === 0 ? JSON.stringify(arg) : (i === 0 ? 'result' : JSON.stringify(arg));
					}).join(',');

					script += `result = (${funcBody})(${argsStr});`;
				} else {
					throw new Error(`Method ${name} is not a function`);
				}
			});

			script += 'return result; })();'; // 返回最终的结果
			return script;
		} catch (error) {
			console.error('Error generating script for method:', error);
			return `console.error('Error generating script for method ${methodNamesAndArgs.map(m => m.name).join(' -> ')}: ${error.message}')`;
		}
	};

	return (
		<div className="execution-process">
			<div className="xiaohongshu">
				<div className="xiaohongshu-options">
					<Form  form={form} labelCol={{ span: 8 }} labelWrap={true}>
						<Form.Item label="选择流程" name="process" rules={[{required: true, message: '请选择流程!'},]}>
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
						_path &&  <webview
							id="webview"
							nodeintegration="yes"
							allowpopups="yes"
							nodeintegrationinsubframes="yes"
							allowrunninginsecurecontent="yes"
							disablewebsecurity="yes"
							webpreferences="contextIsolation=no"
							preload={_path}
						/>
					}
				</div>
			</div>
		</div>
	)
}

export default ExecutionProcess