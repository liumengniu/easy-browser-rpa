/**
 * @author Kevin
 * @Date:
 */

import './index.less';
import mockData from "@/renderer/mock/mock.js"
import optionType from "@/renderer/mock/optionType.js"
import {useState} from "react";
import _ from "lodash"
import {
	HeartTwoTone,
	GroupOutlined,
	StarOutlined,
} from '@ant-design/icons';
import {Modal} from "antd";

import BasicComponent from "@/renderer/components/modules/BasicModule";

function App() {
	// 问卷题目集合
	const [data, setData] = useState([])
	// 问卷标题
	const [questionnaireTitle, setQuestionnaireTitle] = useState("问卷")
	// 问卷副标题
	const [questionnaireSubTitle, setQuestionnaireSubTitle] = useState("感谢您抽出几分钟时间填写以下内容，现在我们开始吧")
	// 拖拽组件id
	const [dragCompId, setDragCompId] = useState(null)
	// 展示组件索引
	const [dragItemComIdx, setDragItemComIdx] = useState(null)
	const [targetItemIdx, setTargetItemIdx] = useState(null)

	/**
	 * 元拖拽事件
	 * @param e
	 * @param componentId
	 */
	const dragstart = (e, componentId) => {
		setDragCompId(componentId)
	}
	/**
	 * 元拖拽事件结束
	 */
	const dragend = () => {
		setDragCompId(null)
	}
	/**
	 * 拖拽 - 放置事件
	 */
	const handleDrop = () => {
		dragCompId && addComponent()
	}
	/**
	 * 允许拖拽元素放置在该区域
	 * @param event
	 */
	const allowDrop = event => {
		event.preventDefault(); // 允许拖拽元素放置在该区域
	}
	/**
	 * 增加组件
	 */
	const addComponent = () => {
		const data_item = mockData[dragCompId]
		setData([...data, data_item])
	}

	/**
	 * 编辑问卷标题
	 * @param e
	 * @param idx
	 */
	const handleQuestionnaireTitle = (e, idx) => {
		const textContent = e?.target?.textContent;
		setQuestionnaireTitle(textContent)
	}
	/**
	 * 编辑问卷副标题
	 * @param e
	 * @param idx
	 */
	const handleQuestionnaireSubTitle = (e, idx) => {
		const textContent = e?.target?.textContent;
		setQuestionnaireSubTitle(textContent)
	}

	/**
	 * 拖拽展示组件
	 * @param e
	 * @param idx
	 * @param item
	 */
	const handleItemDragStart = (e, idx, item) => {
		setDragItemComIdx(idx)
	}
	/**
	 * 停止挪动展示组件为止
	 */
	const handleItemDragEnd = () => {
		setDragItemComIdx(null)
	}
	/**
	 * 展示组件进入其他展示组件区域
	 * @param idx
	 */
	const handleItemDragEnter = idx => {
		setTargetItemIdx(idx)
	}
	/**
	 * 展示组件互相移动位置
	 */
	const handleItemDrop = () => {
		if (dragCompId) return
		if (dragItemComIdx === targetItemIdx) return
		data.splice(dragItemComIdx, 1, ...data.splice(targetItemIdx, 1, data[dragItemComIdx]))
	}

	/**
	 * 编辑单个组件标题
	 */
	const handleTitle = (e, idx) => {
		const textContent = e?.target?.textContent;
		_.set(data, `${idx}.text`, textContent);
	}
	/**
	 * 多项组件 - 编辑某子项 - 编辑完成（失焦）
	 * @param e
	 * @param idx
	 * @param childIdx
	 */
	const handleChildItemCompBlur = (e, idx, childIdx) => {
		const textContent = e?.target?.textContent;
		let childOptions = _.get(data, `${idx}.options`);
		_.set(childOptions, `${childIdx}.label`, textContent)
		_.set(childOptions, `${childIdx}.value`, textContent)
		_.set(data, `${idx}.options`, childOptions);
		setData([...data])
	}
	/**
	 * 多项组件 - 删除某子项
	 * @param e
	 * @param idx
	 * @param childIdx
	 */
	const handleChildItemDelete = (e, idx, childIdx) => {
		let childOptions = _.get(data, `${idx}.options`);
		childOptions = _.filter(childOptions, (o, index) => index !== childIdx);
		_.set(data, `${idx}.options`, childOptions);
		setData([...data])
	}

	/**
	 * 添加子项
	 * @param e
	 * @param idx
	 */
	const addChildItem = (e, idx) => {
		let childOptions = _.get(data, `${idx}.options`);
		childOptions?.push({id: 1, label: '', value: ''},)
		_.set(data, `${idx}.options`, childOptions);
		setData([...data])
	}

	/**
	 * 移除当前组件
	 * @param e
	 * @param idx
	 */
	const removeItem = (e, idx) => {
		let newData = _.filter(data, (o, index) => idx !== index)
		setData([...newData])
	}

	/**
	 * 显示schema数据
	 */
	const showSchema = () => {
		Modal.info({
			title: '查询scheme',
			content: (<div>{JSON.stringify({questionnaireTitle, questionnaireSubTitle, data})}</div>),
		});
	}

	return (
		<div className="new-process">
			<div className="auto-form">
				{/*操作区域*/}
				<div className="auto-form-options">
					<div className="auto-form-options-basic">
						<div className="auto-form-options-title">
							基础操作
						</div>
						<div className="auto-form-options-basic-box">
							{
								optionType?.basic?.map(item => (
									<div key={item?.id} className="drag-handle" draggable={true}
									     onDragStart={($event) => dragstart($event, item.id)}
									     onDragEnd={($event) => dragend($event, item.id)}>
										<HeartTwoTone twoToneColor="#eb2f96"/>
										<span>{item?.text}</span>
									</div>
								))
							}
						</div>
					</div>
					<div className="auto-form-options-basic">
						<div className="auto-form-options-title">
							复杂操作
						</div>
						<div className="auto-form-options-basic-box">
							{
								optionType?.commonlyUsed?.map(item => (
									<div key={item?.id} className="drag-handle" draggable={true}
									     onDragStart={($event) => dragstart($event, item.id)}
									     onDragEnd={($event) => dragend($event, item.id)}>
										<HeartTwoTone twoToneColor="#eb2f96"/>
										<span>{item?.text}</span>
									</div>
								))
							}
						</div>
					</div>
					<div className="auto-form-options-basic">
						{
							!_.isEmpty(optionType?.builtInTemplates) &&
								<div className="auto-form-options-title">
									备用操作
								</div>
						}
						<div className="auto-form-options-basic-box">
							{
								optionType?.builtInTemplates?.map(item => (
									<div key={item?.id} className="drag-handle" draggable={true}
									     onDragStart={($event) => dragstart($event, item.id)}
									     onDragEnd={($event) => dragend($event, item.id)}>
										<HeartTwoTone twoToneColor="#eb2f96"/>
										<span>{item?.text}</span>
									</div>
								))
							}
						</div>
					</div>
				</div>
				{/*展示区域*/}
				<div className="auto-form-workspace drag-box">
					<div className="auto-form-questionnaire" onDrop={handleDrop} onDragOver={allowDrop}>
						<img className="auto-form-questionnaire-img"
						     src="https://aliyuncdn.antdv.com/form/usercontent/account/63eb343c554e0004/default-header-size-w=1276-h=379.jpeg"/>
						<div className="auto-form-questionnaire-header">
							<div className="questionnaire-title" suppressContentEditableWarning contentEditable={true}
							     onBlur={handleQuestionnaireTitle}>流程标题
							</div>
							<div className="questionnaire-description" suppressContentEditableWarning
							     contentEditable={true} onBlur={handleQuestionnaireSubTitle}>请一句话描述该流程的详情
							</div>
						</div>
						<div className="auto-form-questionnaire-wrapper">
							{
								data?.map((item, idx) => {
									return (
										<div key={idx} className="auto-form-questionnaire-wrapper-item" draggable={true}
										     onDragStart={e => handleItemDragStart(e, idx, item)} onDragEnd={handleItemDragEnd}
										     onDragEnter={() => handleItemDragEnter(idx)} onDrop={handleItemDrop}>
											<BasicComponent handleTitle={e => handleTitle(e, idx)} idx={idx} text={item?.text} subtitle={item?.subtitle}
											                addChildItem={e => addChildItem(e, idx)}
											                removeItem={e => removeItem(e, idx)} type={item?.type}/>
										</div>
									)
								})
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
