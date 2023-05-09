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

[TODO] 聊天框默认滚动到最底部 
https://bobbyhadz.com/blog/react-scroll-to-bottom
且css属性实现新消息出现滚动到最底， 但是用户滚上去查看历史消息时，新消息不会影响用户体验
https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/




##### 存在的问题

[TODO] 可能是模式问题： 群聊修改modal框总是预先加载被搜索的用户，按想法应该是不加载的

[TODO] createChatModal 移除用户 闪退

[TODO] socket.io 文档 优化chatbox

##### 待加强的功能

[TODO] 关键词搜索出来的用户为空应该有提醒

[TODO] 数据校验

[TODO] private router

[TODO] 聪明的错误提醒

[TODO] 选择用户防抖

[TODO] 接受消息的逻辑提取到全局上

##### 完成
[COMP][TODO] 字体 work sans

[COMP][TODO] 密码眼睛 tabindex改为-1,方便用户使用tab

[COMP][TODO] 聊天框的时间 与当前时间超过一天则显示日期+时间，超过五分钟重新打时间标签

[COMP][TODO] daisyUI: drawer 不能占据全屏拉出来
						 按照官网的结构套好，页面内容在 drawer-content 下

[COMP][TODO] 更加响应式,适配了移动端

[COMP][TODO] loading 防止慢的网络请求和用户的错误点击导致的数据异常， 尤其是群聊修改框  

[COMP][TODO] 聊天框默认滚动到最底部 且css属性实现新消息出现滚动到最底， 但是用户滚上去查看历史消息时，新消息不会影响用户体验
https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/

[COMP][TODO] 发新消息 my chats不及时更新 把chats放进状态管理了

[COMP][TODO] 移动端 聊天框回退不应该是刷新式的

[COMP][TODO] 渲染逻辑有问题，发一条消息会有多个提醒 及时注销message received的监听，避免重复注册 但是应该提取出来称为全局的，事件就不会因为组件的重新渲染而重新反复注册 且群聊的消息接受和个人的消息接受应该分开 namespace

[COMP][TODO] 消息提醒

[COMP][TODO] drawer里的关闭不是相对于屏幕固定的 样式库的问题，最终的解决办法是把关闭按钮放到搜索框左侧

[UNCOMP][TODO] daisyUI countdown failed 不管这个了，用不到