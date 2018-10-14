import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_PROP, OPACITY_MAP } from './const.js'
import './index.less';

export class MessageBoxEl extends Component {
  constructor(props) {
    super(props)
    this.timer = null;
    this.state = {
      ...this.props,
    }
  }
  componentDidMount() {
    this.changeLockScroll();
    this.timeOutFn();
  }
  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }
  // 为了直接可以实现直接调用MessageBoxEl方式
  componentWillReceiveProps(next) {
    this.setState({
      ...next
    })
  }
  // 锁住屏幕，不让滚动
  changeLockScroll() {
    let { lockScroll } = this.state;
    if (lockScroll) {
      if (document.body.style.overflow !== 'hidden') {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
  // 定时关闭
  timeOutFn() {
    let { timeout } = this.state;
    if (timeout) {
      this.timer = setTimeout(() => {
        this.handleAction('confirm');
      }, timeout)
    }
  }
  // 确定/取消回调
  handleAction(action, data) {
    let { callback } = this.state;
    this.close(() => {
      this.changeLockScroll();
      typeof callback === 'function' && callback(action, data);
    })
  }
  // 更新弹窗内容
  update(options) {
    this.open();
    this.setState({
      ...options,
    }, () => {
      this.changeLockScroll();
      this.timeOutFn();
    });
  }
  // 打开弹窗
  open(cb) {
    this.setState({
      show: true
    }, () => {
      typeof cb === 'function' && cb();
    })
  }
  // 关闭弹窗
  close(cb) {
    this.setState({
      show: false
    }, () => {
      typeof cb === 'function' && cb();
    })
  }
  // 背景弹窗的事件
  backgroundFunc(e) {
    let { backgroundFn } = this.state;
    if (e.target === e.currentTarget && backgroundFn) {
      if (backgroundFn === true) {
        this.handleAction('cancel');
        return;
      }
      let flag = typeof backgroundFn === "function" && backgroundFn()
      if (flag === true) {
        this.handleAction('cancel');
      }
    }
  }
  render() {
    let { className, type, show, opacity } = this.state;
    let clsN = 'm-messagebox-container ' + (className || '');
    let styles = { display: show ? 'block' : 'none', background: `rgba(0, 0, 0, ${OPACITY_MAP[opacity]})` };
    return (
      <div onClick={this.backgroundFunc.bind(this)} className={clsN} style={styles}>
        {
          type === "confirm" &&
          <Confirm {...this.state} handleAction={this.handleAction.bind(this)} />
        }
        {
          type === "alert" &&
          <Alert {...this.state} handleAction={this.handleAction.bind(this)} />
        }
        {
          type === "toast" &&
          <Toast {...this.state} />
        }
        {
          type === "custom" &&
          <Custom {...this.state} instance={this} />
        }
      </div>
    )
  }
}
/**
 * alert组件
 */
export const Alert = (props) => {
  let { showConfirmButton, handleAction, title, message, confirmButtonText, children } = props;
  return (
    <div className="m-alert">
      <div className="m-msgbox-header">
        <div className="m-msgbox-title">{title}</div>
      </div>
      <div className="m-msgbox-content">
        <div className="m-msgbox-message">{children || message}</div>
      </div>
      <div className="m-msgbox-btn">
        {showConfirmButton && <div className={"m-confirm-btn"} onClick={handleAction.bind(this, 'confirm')}>{confirmButtonText}</div>}
      </div>
    </div>
  )
}
/**
 * confirm组件
 */
export const Confirm = (props) => {
  let { cancelButtonText, showCancelButton, showConfirmButton, handleAction, title, message, confirmButtonText, children } = props;
  return (
    <div className="m-confirm">
      <div className="m-msgbox-header">
        <div className="m-msgbox-title">{title}</div>
      </div>
      <div className="m-msgbox-content">
        <div className="m-msgbox-message">{children || message}</div>
      </div>
      <div className="m-msgbox-btn">
        {showCancelButton && <div className="m-cancel-btn" onClick={handleAction.bind(this, 'cancel')}>{cancelButtonText}</div>}
        {showConfirmButton && <div className={"m-confirm-btn"} onClick={handleAction.bind(this, 'confirm')}>{confirmButtonText}</div>}
      </div>
    </div>
  )
}
/**
 * Toast组件
 */
export const Toast = (props) => {
  let { message, children } = props;
  return (
    <div className="m-toast">
      <div className="m-content">
        {children || message}
      </div>
    </div>
  )
}
/**
 * Custom自定义组件
 */
export const Custom = (props) => {
  let { message, instance, children } = props;
  return (
    <div className="m-custom">
      {children || (typeof message === 'function' ? message(instance) : message)}
    </div>
  )
}

// 设置参数类型
MessageBoxEl.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string,
  type: PropTypes.oneOf(['alert', 'confirm', 'toast', 'custom']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  timeout: PropTypes.number,
  opacity: PropTypes.oneOf(['black', 'transparent']),
  lockScroll: PropTypes.bool,
  backgroundFn: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  formatFn: PropTypes.func,
  showConfirmButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  customCallback: PropTypes.func,
}
// 设置参数默认值
MessageBoxEl.defaultProps = {
  ...DEFAULT_PROP
}