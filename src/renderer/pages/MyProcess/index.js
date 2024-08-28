/**
 * 我的流程列表
 * @author Kevin
 * @Date:
 */
import {useEffect, useState} from "react";
import {Button, Space, Table} from "antd";
import _ from "lodash";
import utils from "@utils";
import {useNavigate} from "react-router-dom"

function MyProcess() {
	const navigate = useNavigate()

	const [data,setData] = useState([])

	useEffect(() => {
		getProcess()
	}, [])

	/**
	 * 查询/编辑 流程
	 */
	const viewAndEdit = (type, record) =>{
		console.log(type, record, '999999999999999')
		navigate("/custom-process/custom-process", { state: record });
	}

	const columns = [
		{ title: '序号', dataIndex: 'idx', key: 'idx',  render: (text,record, index) => <span>{index+1}</span>},
		{ title: '流程', dataIndex: 'questionnaireTitle', key: 'questionnaireTitle',},
		{ title: '流程描述', dataIndex: 'questionnaireSubTitle', key: 'questionnaireSubTitle',},
		{ title: '流程详情', dataIndex: 'data', key: 'data',ellipsis: true, render: text => <span>{JSON.stringify(text)}</span>},
		{
			title: '操作', dataIndex: 'data', key: 'data',width: 200, render: (text,record) => {
				return (<Space><Button type="primary" onClick={()=>viewAndEdit(1, record)}>查看</Button>
					<Button type="primary" onClick={()=>viewAndEdit(2, record)}>编辑</Button></Space>)
			}
		},
	]

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
				item.key = idx + 1
			}
			return item
		});
		setData(hashList)
	}


	return (
		<div>
			<Table columns={columns} dataSource={data}/>
		</div>
	)
}

export default MyProcess