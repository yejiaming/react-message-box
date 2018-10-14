import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MessageBoxEl } from './index.jsx';
import { DEFAULT_PROP } from './const';
// 弹窗的实例管理
const MessageBoxInstance = {
  // 目的是为了存储多个实例弹窗，如果为空就建一个新的实例，如果为1，并且
  boxs: [],
  // 获取一个实例
  getInstance() {
    let boxs = this.boxs;
    // 当只有一个实例，并且该实例还是隐藏的时候就取出来，否则都是去新建新的实例
    if (boxs.length === 1 && boxs[0].isShowing === false) {
      return boxs[0];
    }
    return {};
  },
  // 创建一个新的实例
  setInstance(instance, domEl) {
    this.boxs.push({
      isShowing: true,
      domEl: domEl,
      instance: instance
    })
    return this.boxs.length - 1;
  },
  // 创建之后就需要移除才行
  removeInstance(index) {
    // 保留一个实例，这样就不需要经常创建新的节点了
    if (this.boxs.length === 1) {
      this.boxs[0].isShowing = false;
      return;
    }
    let box = this.boxs[index];
    document.body.removeChild(box.domEl);
    this.boxs.splice(index, 1);
  },
  render(options) {
    let { instance } = this.getInstance();
    let that = this;
    return new Promise((resolve, reject) => {
      let currentIndex;
      let callback = function (action, data) {
        that.removeInstance(currentIndex);
        if (action === 'confirm') {
          resolve(data);
        } else {
          reject(data);
        }
      }
      options.callback = callback;
      if (instance) {
        // 如果找到未使用的实例，那就直接更新实例的参数即可
        instance.update(options);
        currentIndex = 0;
      } else {
        // 如果没有在弹窗实例数组中找到，那就创建一个
        let domEl = document.createElement('div');
        document.body.appendChild(domEl);
        instance = ReactDOM.render(<MessageBoxEl ref={(t) => { instance = t }} {...options} />, domEl)
        // 存储实例
        currentIndex = this.setInstance(instance, domEl);
      }
    })
  }
}

/**
 * 该组件是用于公共弹窗组件，JS直接调用形式
 */
export const MessageBox = {
  // alert 弹窗
  alert: (message, options = {}) => {
    if (!React.isValidElement(message) && typeof message === 'object') {
      options = message;
    }
    return MessageBoxInstance.render(Object.assign({}, DEFAULT_PROP, {
      message: message,
      type: 'alert',
      showCancelButton: true,
      show: true,
    }, options));
  },
  // confirm 弹窗
  confirm: (message, options = {}) => {
    if (!React.isValidElement(message) && typeof message === 'object') {
      options = message;
    }
    return MessageBoxInstance.render(Object.assign({}, DEFAULT_PROP, {
      message: message,
      type: 'confirm',
      showCancelButton: true,
      show: true,
    }, options));
  },
  // toast 弹窗
  toast: (message, options = {}) => {
    if (!React.isValidElement(message) && typeof message === 'object') {
      options = message;
    }
    return MessageBoxInstance.render(Object.assign({}, DEFAULT_PROP, {
      message: message,
      timeout: 2000,
      opacity: 'transparent',
      type: 'toast',
      show: true,
    }, options));
  },
  // 自定义弹窗
  custom: (message, options = {}) => {
    if (!React.isValidElement(message) && typeof message !== 'function' && typeof message === 'object') {
      options = message;
    }
    return MessageBoxInstance.render(Object.assign({}, DEFAULT_PROP, {
      message: message,
      type: 'custom',
      show: true,
    }, options));
  }
}

export default MessageBox;