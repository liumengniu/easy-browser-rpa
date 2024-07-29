/**
 * @author Kevin
 * @Date: 2024-4-17
 */

const mockData = {
	webs: [
		{title: "小红书", description: '点击加载web，开始采集数据', url: 'https://www.xiaohongshu.com/explore'},
		{title: "BOSS直聘", description: '点击跳转web，开始采集数据', url: 'https://www.zhipin.com/'},
		{title: "抖音", description: '点击跳转web，开始采集数据', url: 'https://www.douyin.com/discover'},
		// {title: "b站", description: '点击跳转web，开始采集数据', url: 'https://www.bilibili.com/'},
		// {title: "知乎", description: '点击跳转web，开始采集数据', url: 'https://www.zhihu.com/'},
	],
	city: [
		{label: "全国", value: '全国'},
		{label: "北京", value: '北京'},
		{label: "上海", value: '上海'},
		{label: "广州", value: '广州'},
		{label: "深圳", value: '深圳'},
		{label: "杭州", value: '杭州'},
		{label: "天津", value: '天津'},
		{label: "西安", value: '西安'},
		{label: "苏州", value: '苏州'},
		{label: "武汉", value: '武汉'},
		{label: "厦门", value: '厦门'},
		{label: "长沙", value: '长沙'},
		{label: "成都", value: '成都'},
		{label: "郑州", value: '郑州'},
		{label: "重庆", value: '重庆'},
		{label: "佛山", value: '佛山'},
		{label: "合肥", value: '合肥'},
		{label: "济南", value: '济南'},
		{label: "青岛", value: '青岛'},
		{label: "南京", value: '南京'},
		{label: "东莞", value: '东莞'},
		{label: "昆明", value: '昆明'},
		{label: "南昌", value: '南昌'},
		{label: "石家庄", value: '石家庄'},
		{label: "宁波", value: '宁波'},
		{label: "福州", value: '福州'},
	],
	salary: [
		{label: "不限", value: 0},
		{label: "3K以下", value: 1},
		{label: "3-5K", value: 2},
		{label: "5-10K", value: 3},
		{label: "10-20K", value: 4},
		{label: "20-50K", value: 5},
		{label: "50K以上", value: 6},
	],
	experience: [
		{label: "不限", value: 0},
		{label: "在校生", value: 1},
		{label: "应届生", value: 2},
		{label: "经验不限", value: 3},
		{label: "1年以内", value: 4},
		{label: "1-3年", value: 5},
		{label: "3-5年", value: 6},
		{label: "5-10年", value: 7},
		{label: "10年以上", value: 8},
	],
	education: [
		{label: "不限", value: 0},
		{label: "初中及以下", value: 1},
		{label: "中专/中技", value: 2},
		{label: "高中", value: 3},
		{label: "大专", value: 4},
		{label: "本科", value: 5},
		{label: "硕士", value: 6},
		{label: "博士", value: 7},
	]
}

export default mockData
