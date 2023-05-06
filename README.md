##### 技术栈
使用 React的基本特性 做一个聊天室

使用 Vite 作为框架

使用 tailwindCSS+daisyui 作为样式库：
	tailwindcss配置文件使用commandJS，否则不生效

使用 clsx 来计算样式

使用 axios 进行网络请求

使用 socket.io 实现实时聊天网络请求

##### 功能点：
验证邮箱的真实性；

侧边栏可以拉出搜索框，点击搜索结果中的用户即可进行一对一聊天

点击头像查看登录用户的profile和登出

http作为一对一聊天的网络请求方式

socket 作为群聊的网络请求方式

适配手机移动端

##### 第一次应用或者遇到不熟练或者容易出错的地方

[TODO] React组件子传父: 组件PasswordToggle

[TODO] 邮箱验证(主要是后端程序)
https://www.jianshu.com/p/a8fde99d2561
https://www.ujcms.com/documentation/351.html

[TODO] 状态函数更新器: 组件VerifyCodeSendBTN

[TODO] react-toastify: 通知在跳转间保留 导入css文件才生效

[TODO] vite 实现 hmr 组件export的格式要求：
https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports
https://github.com/ArnaudBarre/eslint-plugin-react-refresh

[TODO] 请求头属性大小写敏感 utils/httpRequest.ts

[TODO] 请求体里的数组的JSON.stringfy: chat service createGroupChat

[TODO] 应用redux进行状态管理正确地更新状态的方式，在组件里另定义状态来承接store里的状态，使代码整洁，想法很美好，但是实现不了
因为状态初始化只在组件第一次渲染的时候跑一次，不是每次组件渲染就执行一次的

[TODO] 刷新页面 不会导致noti丢失 navigate(0)


##### 存在的问题

[TODO] daisyUI countdown failed 

[TODO] createChatModal 移除用户 闪退

[TODO] 移动端 聊天框回退不应该是刷新式的

[TODO] 发新消息 my chats不及时更新

[TODO] socket.io 文档 优化chatbox

##### 待加强的功能

[TODO] 数据校验

[TODO] 聊天框默认滚动到最底部

[TODO] private router

[TODO] 更加响应式

[TODO] loading 防止慢的网络请求和用户的错误点击导致的数据异常， 尤其是群聊修改框

[TODO] 消息提醒

[TODO] 聪明的错误提醒

[TODO] 选择用户防抖

##### 完成
[COMP][TODO] 字体
[COMP][TODO] 密码眼睛 tabindex改为-1
[COMP][TODO] 聊天框的时间
[COMP][TODO] daisyUI: drawer 不能占据全屏拉出来
						 按照官网的结构套好，页面内容在 drawer-content 下
