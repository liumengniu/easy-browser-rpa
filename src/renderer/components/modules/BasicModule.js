/**
 * @author Kevin
 * @Date:
 */
import "./BasicModule.less"
import {ChromeOutlined, CheckCircleTwoTone, HeartTwoTone, ArrowDownOutlined} from "@ant-design/icons"

function BasicModule(props) {
	console.log(props, '=========props==================')

	return (
		<div className="basic-module">
			<HeartTwoTone twoToneColor="#eb2f96" style={{marginTop: 2}} />
			<div className="basic-module-info">
				<div className="basic-module-info-title">
					{props?.text}
				</div>
				<div className="basic-module-info-subtitle">
					{props?.subtitle}
				</div>
			</div>
			<div className="sort-num">
				<ArrowDownOutlined />
			</div>
		</div>
	)
}

export default BasicModule