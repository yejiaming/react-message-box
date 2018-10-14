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
