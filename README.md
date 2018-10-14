# MessageBox 弹窗组件
## 安装

```bash
npm i -S react-msg-box
```

## 参数说明

```js
export const DEFAULT_PROP = {
  show: false,                    // 控制弹窗是否显示
  children: null,
  className: '',                  // 自定义样式名字符串，可以是多个样式名称的集合
  type: 'alert',                  // 弹窗类型
  title: '提示',                   // 弹窗title
  message: '主人未填写任何提示信息',  // 弹窗的提示信息
  timeout: 0,                     // ◊弹窗自动关闭时间，0表示默认永久显示
  opacity: 'black',               // 弹窗黑色背景的颜色，分为两种，【black,transparent】
  lockScroll: true,               // 是否禁用弹窗滚动事件的穿透，默认是不禁用的
  backgroundFn: false,            // 点击背景弹窗所需要调用的方法，可能为true,false,fn三种情况，如果是fn，可以返回bool值决定是否点击背景关闭
  formatFn: noop,                 // 用于一些弹窗需要让外部控制格式化处理显示的情况
  showConfirmButton: true,        // 默认展示confirm的btn
  showCancelButton: false,        // 默认不展示cancel的btn
  confirmButtonText: '确定',       // 确定按钮的text文案
  cancelButtonText: '取消'         // 取消按钮的text文案
}
```

## 用法1：使用 JS 方式调用

```jsx
import { MessageBox } from 'react-msg-box';
MessageBox.confirm('显示自定义样式弹窗弹窗', {
  className: 'reset-confirm'
}).then(()=>{
  console.log('成功');
},()=>{
  console.log('失败');
});
```

## 用法2：使用 jsx 方式调用

```jsx
import { MessageBoxEl } from 'react-msg-box';
<MessageBoxEl type="confirm" key="messagebox" show={showFlag}>
  <div><input onBlur={this.onBlur} placeholder="请输入名字" /></div>
</MessageBoxEl>
```

## 发布
* 本项目可以作为平常的开发项目来使用，用法如下：
  1. 把该项目`git clone`到本地
  2. `npm install`
  3. `npm run start` 或者 `npm run page`
  4. 浏览器打开：`http://localhost:8080/message-box`，就可以看到`react-message-box`的开发原始案例了
  5. 开发完成要发布上线的话，可以运行` npm run build `即可在本地dist目录下看到压缩之后的发布包了

* 本项目也可以作为开发自己的 `react library` 来使用，用法如下：
  1. 这里如果要开发自己的`react library`，就可以修改`components` 目录下的组件，开发自己的组件即可
  2. npm run publish 发布开发好的包到本地 lib 目录下
  3. 自己本地开发完成要发布npm的话，查看下面npm publish 流程

## npm publish

```bash
 # 如果npm设置了国内镜像，要先设置成npm原来的镜像地址，否则不用这一步
npm config set registry https://registry.npm.taobao.org
# 登录 npm，没有的话需要去 npm 官网注册一个账号
npm login
# 发布，这里如果重新发布，需要加大package.json中的version，这里要注意如果报错了，那可能是package.json中的name（name不能大写）属性和第三方的重名了，需要修改成唯一才能发布
npm publish
```