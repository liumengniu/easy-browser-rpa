/**
 * @author Kevin
 * @Date: 2024-4-17
 */

import {PageContainer, CheckCard} from "@ant-design/pro-components";
import mockData from "@/renderer/mock";
import { useNavigate } from "react-router-dom"
import _ from "lodash"

function HomePage() {
	const navigate = useNavigate();
	const navToDetail = () => {
		navigate("xiaohongshu")
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
							defaultChecked
							onClick={() => navToDetail(item)}
						/>
					})
				}
			</CheckCard.Group>
		</PageContainer>
	)
}

export default HomePage
