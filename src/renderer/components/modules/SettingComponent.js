import {Form, Input} from "antd";

/**
 * @author Kevin
 * @Date:
 */

function SettingComponent(props) {
	const {clickItemType} = props;
	if (clickItemType === "open_browser") {
		return (
			<Form.Item label="网页地址" name="url">
				<Input/>
			</Form.Item>
		)
	} else if (clickItemType === "find_element") {
		return (
			<Form.Item label="元素标识" name="name">
				<Input/>
			</Form.Item>
		)
	} else if (clickItemType === "find_elements_by_classname") {
		return (
			<Form.Item label="元素标识" name="name">
				<Input/>
			</Form.Item>
		)
	} else if (clickItemType === "click") {
		return (
			<Form.Item label="元素标识" name="name">
				<Input/>
			</Form.Item>
		)
	} else if (clickItemType === "send_keys") {
		return (
			<>
				<Form.Item label="元素标识" name="name">
					<Input/>
				</Form.Item>
				<Form.Item label="输入关键词" name="keyword">
					<Input/>
				</Form.Item>
			</>
		)
	} else if (clickItemType === "find_child_by_number") {
		return (
			<Form.Item label="第几个子元素" name="num">
				<Input/>
			</Form.Item>
		)
	} else {
		return null
	}
}

export default SettingComponent