# 开发事项
项目除公开预览用户关注列表外其余功能已经全部开发完成,可下载后本地调试
目前做Next.js网站开发,博客系统先放一放
# BreadBlog
基于React开发的博客系统 [项目演示视频](https://www.bilibili.com/video/BV1k5411m7bf)
该项目为[BreadNote](https://github.com/Watish/BreadNote)项目升级改版,将笔记功能融合进博客
### 技术栈:
* React 18 with hooks
* React Router V6
* TypeScript
* Less
* Ant-Design
* postpx-to-rem(屏幕分辨率适配)
### 包含以下功能
#### 1. 公共文章
  * 文章按热度随机最新推送
  * 提供热度文章分类，按分类获取文章
  * 作者热度排行榜
#### 2. 用户管理
  * 文章列表(对用户已有的文章进行更新并重新发布)
  * 用户资料修改支持头像上传
  * 用户自定义背景(支持裁剪上传,比例要求7:2)
  * 用户收藏夹
  * 用户草稿箱(对用户未发布的草稿文章编辑并重新发布)
  * 文章垃圾箱
  * 用户页预览
  * 用户通知
  * 用户垃圾箱
  * 用户文章分类管理
#### 3. 文章
  * Markdown和普通富文本文章撰写
  * 提供文章草稿保存功能，可在用户草稿界面访问最近编辑的文章和最近的10个更新版本
#### 4. 文章预览
  * 匿名与公开评论发送
  * 追评回复发表
  * 评论点赞
  * 收藏文章
#### 5. 其他
  * 敏感词匹配:所有文章或评论中包含敏感词将会默认被删除并会发送用户警告通知
## 安装
 * 请前往[后端仓库](http://server.watish.xyz:5880/watish/BreadBlog)下载源码并根据文档自行部署后台
 * 请自行搭建create-react-app后`npm run eject`,复制源码到当前脚手架中运行
 * 请根据package.json中的依赖自行安装所需依赖,webpack.config.js中有自定义的打包配置，不使用可能会有报错并且会影响css样式和界面布局
## 注意事项
 main下当前为最新进度的[TypeScript分支](https://github.com/ChineseBread/BreadBlog/tree/React-18-ts)分支版本
 
 JSX最新进度版本请参考[React-18分支](https://github.com/ChineseBread/BreadBlog/tree/React-18)
 TSX版本为当前最新维护进度版本,请参考[TypeScript分支](https://github.com/ChineseBread/BreadBlog/tree/React-18-ts)
 
 博客手机端已经基本适配完成,手机访问部分功能无法使用，请尽量使用电脑端
 
 开发进度和更新内容会写在[更新日志](https://github.com/ChineseBread/BreadBlog/blob/main/UPDATE-LOG.md)中

## 项目支持
如果觉得软件用的还挺顺手的话可以请开发者喝杯奶茶🤪

项目赞助请联系微信:17366201379(疑问可以`issue`或`disscusion`)
