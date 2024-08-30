/**
 * 系统设置
 * @author Kevin
 * @Date:
 */
import "./index.less"
import {List} from "antd";
import {EditOutlined, RadiusSettingOutlined} from "@ant-design/icons"

function SystemSetting(){
	const data = [
		"修改采集数据磁盘地址",
		"重启软件"
	]

	/**
	 * 系统设置
	 * @param idx
	 */
	const handleEditSetting = (idx) =>{
		console.log(idx, '000000000000000000000000000')
		if(idx === 0){
			window.electronAPI?.changeSavePath()
		} else if(idx === 2){

		}
	}


	return (
		<div className="system-setting">
			<List
				size="small"
				header={<><div>系统配置</div></>}
				bordered
				dataSource={data}
				renderItem={(item, idx) =>(
						<List.Item>
							{item}
							<EditOutlined style={{marginLeft: 10}} onClick={()=>handleEditSetting(idx)}/>
						</List.Item>
				)}
			/>
		</div>
	)
}

export default SystemSetting