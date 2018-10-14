# MessageBox 弹窗组件
## 参数说明

```js
MessageBoxEl.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.any,
    lockScroll: PropTypes.bool,
    showConfirmButton: PropTypes.bool,
    showCancelButton: PropTypes.bool,
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    cls: PropTypes.string
}
```
* type：用于判断弹窗类型（暂时无用）
* title：用于指定弹窗的标题（暂时无用）
* message：用于指定弹窗内容
* lockScroll：用于指定是否锁定屏幕，不让屏幕滚动，防止滚动透传
* showConfirmButton：用于显示确定按钮
* showCancelButton：显示取消按钮
* cancelButtonText：自定义取消按钮的text
* confirmButtonText：自定义确定按钮的text
* cls：自定义类名


## 用法

```jsx
// 引用
import { MessageBox } from 'components/message-box/index.jsx'

export default class AuthorizationSetting extends Component {
    constructor(props) {
        super(props)
    }
    showMsgBox() {
        // 调用
        MessageBox.confirm({
            message: <div className="m-reset-content">是否确定取消授权支付宝归集发票？</div>,
        }).then(() => {
            console.log('确定')
        }, () => {
            console.log('取消')
        });
    }
}
```
## 另一种用法
> 如果组件内的内容需要变化，使用下面这种用法

```jsx

import MessageBoxEl from 'components/message-box/index.jsx'

<MessageBoxEl 
    message={this.getSendCon()}
    show={this.state.sendBoxShow}
    callback={this.sendBoxCb}
    showConfirmButton={true}
    showCancelButton={true}
    confirmButtonText='确定'
    cancelButtonText='取消'
    disableConfirm={!this.state.emailAddr}
/>
```

* 这里使用promise.then来执行确定或者取消的回调


