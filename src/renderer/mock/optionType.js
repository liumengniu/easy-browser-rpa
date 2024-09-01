/**
 * description：
 * @author Kevin
 * @date 2024/3/16
 * Last edited on: 2024/3/16
 */

const optionList = {
  basic: [
    { id: 1, text: '打开网页' },
    { id: 2, text: '获取节点元素' },
    { id: 3, text: '批量获取元素' },
    { id: 4, text: '第N个子元素' },
    { id: 5, text: '点击元素' },
    { id: 6, text: '填写输入框' },
    { id: 7, text: '清除输入框' },
    { id: 8, text: '获取文本内容' },
    { id: 9, text: '获取图片链接' },
    { id: 10, text: '获取详情链接' },
  ],
  commonlyUsed: [
    { id: 101, text: '采集数据' },
    { id: 102, text: '采集评论' },
	  { id: 103, text: '批量操作' },
  ],
  builtInTemplates: [
    { id: 201, text: '定时器操作' },
	  { id: 202, text: '滚动到底部' },
    { id: 203, text: '遍历数据' },
  ]
}

export default optionList
