#### 技术栈:

使用 React 的基本特性 做一个聊天室

使用 Vite 作为脚手架

样式方案: tailwindCSS daisyUI 样式库 clsx 计算样式

使用 socket.io 实现实时聊天网络请求

#### 比较有意思的功能点：

适配了 web 端和移动端

加盐密文传输数据

[TODO] updateModal 最好只在需要的需要挂载

[TODO] 数据校验

[TODO] private router

[TODO] 聪明的错误提醒

[TODO] MessagesShower 防抖渲染 HOC 防抖 限制消息条数

[TODO] 接受消息的逻辑提取到全局上

[TODO] 移动端浏览器刷新会把本地缓存都丢掉

##### 完成

[COMP] 字体 work sans

[COMP] 密码眼睛 tabindex 改为-1,方便用户使用 tab

[COMP] 聊天框的时间 与当前时间超过一天则显示日期+时间，超过五分钟重新打时间标签

[COMP] daisyUI: drawer 不能占据全屏拉出来
按照官网的结构套好，页面内容在 drawer-content 下

[COMP] 更加响应式,适配了移动端

[COMP] loading 防止慢的网络请求和用户的错误点击导致的数据异常， 尤其是群聊修改框

[COMP] 聊天框默认滚动到最底部 且 css 属性实现新消息出现滚动到最底， 但是用户滚上去查看历史消息时，新消息不会影响用户体验
https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/

[COMP] 发新消息 my chats 不及时更新 把 chats 放进状态管理了

[COMP] 移动端 聊天框回退不应该是刷新式的

[COMP] 渲染逻辑有问题，发一条消息会有多个提醒 及时注销 message received 的监听，避免重复注册 但是应该提取出来称为全局的，事件就不会因为组件的重新渲染而重新反复注册 且群聊的消息接受和个人的消息接受应该分开 namespace

[COMP] 消息提醒

[COMP] drawer 里的关闭不是相对于屏幕固定的 样式库的问题，最终的解决办法是把关闭按钮放到搜索框左侧

[COMP] 关键词搜索出来的用户为空应该有提醒

[UNCOMP] daisyUI countdown failed 不管这个了，用不到

[UNCOMP] 选择用户防抖 还是应该服务端来控制，前端防抖节流里遇到网络慢还是异常
