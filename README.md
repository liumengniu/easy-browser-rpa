# <p align="center">通过JS脚本模拟用户操作，获取小红书笔记，BOSS直聘岗位，知乎帖子，b站视频等自媒体平台数据</p>

[//]: # (https://github.com/ikatyang/emoji-cheat-sheet 表情仓库)


> !!!!模拟人工操作不同于其他采集方式，风险极低 

## 🎞️ 项目原理

> 通过electron内嵌chroium浏览器绕过跨域限制，可以注入JS脚本 \
> 通过JS脚本模拟用户操作，获取各种数据。 \
> 通过JS脚本和主进程的通信，存储相关数据。 \
> 通过JS逆向模拟用户操作的方式，获取数据的阻碍小。 \
> 以下是采集的小红书的笔记数据，未经任何修改：
> ![image](screenshot/xiaohongshu.png)
> ![image](screenshot/小红书_sql.png)
> 以下是采集的抖音的视频数据，未经任何修改：
> ![image](screenshot/douyin.png)
> 以下是采集的BOSS直聘的视频数据，未经任何修改：
> ![image](screenshot/BOSS直聘.png)
> 工具app截图：
> ![image](screenshot/app.png)
> 客户端渲染本地采集数据：
> ![image](screenshot/data.png)

## 🎨 运行指南

> 项目运行需要node环境 ，推荐node14+，作者使用的是node 18.20.2 \
> electron依赖比较大，需要科学上网工具或者配置镜像源 \
> 通过webview获取数据的进程通信脚本需要读取本地相对路径(file://),通过BrowserView则不需要 

> 1. 安装依赖

```bash
   npm install
```

> 2. 运行项目

```bash
   npm run startAll
```

> 3. 编译项目

```bash
   npm run build:web 
   npm run build 
```

## 💡 正在开发中的内容

> 正在开发的内容 2024/6/8
>

| 蓝图                       | 完成情况       | 存在问题        |
|--------------------------|------------|-------------|
| 1、小红书脚本          | 完成     | 暂无  |
| 2、BOSS直聘脚本        | 完成    | 暂无  |
| 3、知乎脚本            | 完成    | 数据未去重，原网页没做虚拟列表 |
| 4、bilibili脚本       | 完成    | 数据未去重，原网页没做虚拟列表  |
| 5、抖音脚本            | 完成    | 暂无 |
| 6、可自定义配置脚本      | pending    | 暂无 |
| 7、换一套好看的UI       | pending    | 暂无 |
| 8、做成可视化的数据采集   | pending    | 暂无 |
| 9、账号一键登录         | pending    | 暂无 |

## 🌟 Star History

<br>

[![Star History Chart](https://star-history.com/#liumengniu/crawler-client&Timeline)](https://star-history.com/#liumengniu/crawler-client&Timeline)



