# PDCA前端工程
<!-- TOC -->

- [PDCA前端工程](#pdca前端工程)
    - [说明](#说明)
    - [效果图](#效果图)
        - [登入界面](#登入界面)
        - [功能主界面](#功能主界面)
        - [项目管理界面](#项目管理界面)
        - [任务管理界面](#任务管理界面)
        - [文件管理界面](#文件管理界面)
        - [语言切换功能](#语言切换功能)
        - [锁屏功能](#锁屏功能)
        - [消息中心](#消息中心)
        - [修改主题](#修改主题)
        - [异常页面](#异常页面)

<!-- /TOC -->
## 说明
该系统是由[ivewUI模板](https://github.com/iview/iview-admin "ivewUI模板")整合再进行修改并结合[PDCA(后台)](https://github.com/halu886/pdca "PDCA(后台)")接口实现联动.

## 效果图  
### 登入界面
&nbsp;&nbsp;&nbsp;&nbsp;该界面是用户登入界面，存在一个表单，以及一个登入按钮，通过判断用户账号密码基于用户所对应权限
![登入界面效果图](/src/images/登入界面效果图.png "登入界面效果图")
### 功能主界面
&nbsp;&nbsp;&nbsp;&nbsp;功能包括：项目模块，文件模块，任务模块，索引模块，权限模块五个主要的模块。
![首页效果图](/src/images/首页效果图.png "首页效果图")
### 项目管理界面
&nbsp;&nbsp;&nbsp;&nbsp;该模块展示相关项目信息，通过一个分页控件对项目信息进行分页，也对一个增加按钮绑定新增事件实现新增功能。
![项目管理效果图](/src/images/项目管理效果图.png "项目管理效果图")  

### 任务管理界面  
&nbsp;&nbsp;&nbsp;&nbsp;先对项目下拉框选择所需要操作的项目，系统通过选择的项目进行返回相关任务的树状结构任务。  
&nbsp;&nbsp;&nbsp;&nbsp;点击树状节点，右边表单显示详细信息，点击完结按钮实现完结功能，页面自动刷新。树状节点相关节点数据更新。
![操作任务效果图](/src/images/操作任务效果图.png "操作任务效果图")
### 文件管理界面
&nbsp;&nbsp;&nbsp;&nbsp;该模块主界面修改文件功能，右边存在文件索引功能。且能够修改文件状态以及公开度相关字段，且存在发布，保存草稿，预览等香瓜功能按钮，文见相关描述实现富文本编辑。
![文件管理效果图](/src/images/文件管理效果图.png "文件管理效果图")

### 语言切换功能
&nbsp;&nbsp;&nbsp;&nbsp;该功能实现切换系统表现层中文章的繁体，简体，英文切换。
![切换语言效果图](/src/images/切换语言效果图.png "切换语言效果图")
### 锁屏功能
&nbsp;&nbsp;&nbsp;&nbsp;当点击锁屏按钮页面后实现暂时退出，锁定功能。需要输入密码才能重新登入该系统。
![锁屏效果图](/src/images/锁屏效果图.png "锁屏效果图")
### 消息中心
&nbsp;&nbsp;&nbsp;&nbsp;消息中心存在三种类型信息：未读、已读、已删除。未读消息标记已读则归档置已读消息中。对已读消息删除后，信息归档至回收站。
![消息效果图](/src/images/消息效果图.png "消息效果图")
### 修改主题
&nbsp;&nbsp;&nbsp;&nbsp;该功能能够对系统的主题进行修改，以及功能栏主题和界面背景。
### 异常页面
&nbsp;&nbsp;&nbsp;&nbsp;访问不存在页面时，跳转至404页面，且给予返回上一页和返回首页的功能。
