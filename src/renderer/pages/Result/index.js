/**
 * 查看采集的数据
 * @author Kevin
 * @Date: 2024-6-11
 */

import {Image, Table, Tooltip} from "antd";
import {useEffect, useState} from "react";
import _ from "lodash"
import utils from "@utils";

function Result() {
	const [data, setData] = useState([])
	
	useEffect(()=>{
		initData()
	}, [])
	
	const initData = async () =>{
		const originalString = await window?.electronAPI?.getCollectionData({kindType: "小红书"})
		const list = _.split(originalString, '\n')
		const hashList = _.map(list, o=> {
			let item = o;
			if(utils.isJson(o)){
				item = JSON.parse(o)
			}
			return item
		});
		setData(hashList)
	}
	
	const columns = [
		{
			title: '笔记封面',
			dataIndex: 'img_src',
			key: 'img_src',
			ellipsis: true,
			width: 100,
			render: (text, record) => <Image width={50} height={50} src={text}/>
		},
		{
			title: '笔记标题',
			dataIndex: 'title',
			key: 'title',
			ellipsis: true,
			render:  text=> <Tooltip placement="top" title={text}><span>{text}</span></Tooltip>
		},
		{
			title: '笔记地址',
			dataIndex: 'href',
			key: 'href',
			ellipsis: true,
			render:  text=> <Tooltip placement="top" title={text}><span>{text}</span></Tooltip>
		},
	];
	
	
	return <><Table dataSource={data} columns={columns}/></>
}

export default Result
