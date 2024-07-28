/**
 * @author Kevin
 * @Date: 2024-4-17
 */

import {PageContainer, CheckCard} from "@ant-design/pro-components";
import mockData from "@/renderer/mock";
import {useNavigate} from "react-router-dom"
import _ from "lodash"
import {Button, Space, Typography} from "antd";

const { Text, Link } = Typography;

function HomePage() {
	const navigate = useNavigate();
	const navToDetail = item => {
		if (item?.title === "小红书") {
			navigate("/xiaohongshu/open-website", {state: {src: item?.url}})
		} else if (item?.title === "BOSS直聘") {
			navigate("/boss/open-website", {state: {src: item?.url}})
		} else if (item?.title === "抖音") {
			navigate("/douyin/open-website", {state: {src: item?.url}})
		} else if (item?.title === "知乎") {
			navigate("/zhihu/open-website", {state: {src: item?.url}})
		} else if (item?.title === "b站") {
			navigate("/bilibili/open-website", {state: {src: item?.url}})
		}
	}
	
	return (
		<PageContainer content="欢迎使用">
			<CheckCard.Group
				onChange={(value) => {
					console.log('value', value);
				}}
				defaultValue="A"
			>
				{
					_.map(mockData?.webs, (item, idx) => {
						return <CheckCard
							key={idx}
							avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
							title={item?.title}
							description={item?.description}
							onChange={(checked) => {
								console.log('checked', checked);
							}}
							onClick={() => navToDetail(item)}
						/>
					})
				}
			</CheckCard.Group>
		</PageContainer>
	)
}

export default HomePage
