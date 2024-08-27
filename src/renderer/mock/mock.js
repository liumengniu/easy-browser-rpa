/**
 * description：
 * @author Kevin
 * @date 2024/3/16
 * Last edited on: 2024/3/16
 */
import {v4 as uuidV4} from 'uuid'

const componentsData = {
	1: {
		id: uuidV4(),
		type: 'open_browser',
		text: "打开网页",
		subtitle:'通过rpa，打开目标浏览器网页',
		options: [
			{id: 1, label: '答案1', value: '答案1'},
			{id: 2, label: '答案2', value: '答案2'},
			{id: 3, label: '答案3', value: '答案3'}
		]
	},
	2: {
		id: uuidV4(),
		type: 'find_element',
		text: "获取节点元素",
		subtitle:'通过rpa，获取节点元素',
		options: [
			{id: 1, label: '唱', value: '唱'},
			{id: 2, label: '跳', value: '跳'},
			{id: 3, label: 'rap', value: 'rap'},
			{id: 4, label: '篮球', value: '篮球'}
		]
	},
	3: {
		id: uuidV4(),
		type: 'click',
		text: "点击元素",
		subtitle:'通过rpa，对获取到的节点元素执行点击操作',
	},
	4: {
		id: uuidV4(),
		type: 'send_keys',
		text: "填写输入框",
		subtitle:'通过rpa，对获取到的输入框填写内容',
	},
	5: {
		id: uuidV4(),
		type: 'clear',
		text: "清除输入框",
		subtitle:'通过rpa，清除输入框的内容',
	},
	6: {
		id: uuidV4(),
		type: 'text',
		text: "获取文本内容",
		subtitle:'通过rpa，获取文本的具体内容',
	},
	7: {
		id: uuidV4(),
		type: 'timepicker',
		text: "获取图片链接",
		subtitle:'通过rpa，获取图片的资源地址',
	},
	8: {
		id: uuidV4(),
		type: 'rate',
		text: "获取详情链接",
		subtitle:'通过rpa，获取详情地址',
	},
	101: {
		id: uuidV4(),
		type: 'name',
		text: "采集数据",
		subtitle:'通过rpa，采集相关数据，并存储值磁盘或数据库',
	},
	102: {
		id: uuidV4(),
		type: 'gender',
		text: "采集评论",
		subtitle:'通过rpa，采集相关评论，并存储值磁盘或数据库',
	},
	103: {
		id: uuidV4(),
		type: 'phone',
		text: "批量操作",
		subtitle:'通过rpa，对相关自媒体平台执行批量操作',
	},

	201: {
		id: uuidV4(),
		type: 'income',
		text: "年收入",
		options: [
			{id: 1, label: '0~10W', value: '0~10W'},
			{id: 2, label: '10~30W', value: '10~30W'},
			{id: 3, label: '30~50W', value: '30~50W'},
			{id: 3, label: '50~100W', value: '50~100W'},
			{id: 3, label: '100W以上', value: '100W以上'}
		]
	},
	202: {
		id: uuidV4(),
		type: 'clothes_size',
		text: "衣服尺码",
		options: [
			{id: 1, label: 'S码', value: 'S码'},
			{id: 1, label: 'M码', value: 'M码'},
			{id: 1, label: 'L码', value: 'L码'},
			{id: 1, label: 'XL码', value: 'XL码'},
			{id: 1, label: 'XXL码', value: 'XXL码'},
			{id: 1, label: 'XXXL码', value: 'XXXL码'},
		]
	}
}

export default componentsData

