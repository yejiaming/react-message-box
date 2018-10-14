import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { MessageBox, MessageBoxEl } from '@components';
import { MessageBox, MessageBoxEl } from 'react-msg-box';
require('./style.less');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFlag: false
    }
  }
  showAlertMsgBox() {
    MessageBox.alert('显示alert弹窗', {
      backgroundFn: function () {
        return true;
      }
    });
  }
  showConfirmMsgBox() {
    MessageBox.confirm('显示confirm弹窗');
  }
  showMsgBoxEl() {
    this.setState({
      showFlag: true
    })
  }
  showMsgBoxClassname() {
    MessageBox.confirm('显示自定义样式弹窗弹窗', {
      className: 'reset-confirm'
    });
  }
  showToastMsgBox() {
    MessageBox.toast('显示toast弹窗');
  }
  showCustomMsgBoxFn() {
    var sheet = [
      { key: 1, value: '申通' },
      { key: 2, value: '中通' },
      { key: 3, value: '韵达' },
      { key: 4, value: '菜鸟' },
    ]
    const handleAction = function (instance, item) {
      instance.close();
      console.log(item);
    }
    MessageBox.custom((instance) => {
      return (
        <div className="m-sheet">
          <div className="m-content">
            {
              sheet.map((item, index) => {
                return <div className="sheet" key={index} onClick={handleAction.bind(this, instance, item)}>{item.value}</div>
              })
            }
          </div>
        </div>
      )
    }, {
        backgroundFn: true
      });
  }
  showCustomMsgBox() {
    var sheet = [
      { key: 1, value: '申通' },
      { key: 2, value: '中通' },
      { key: 3, value: '韵达' },
      { key: 4, value: '菜鸟' },
    ]
    const handleAction = function (item) {
      console.log(item);
    }
    MessageBox.custom((
      <div className="m-sheet">
        <div className="m-content">
          {
            sheet.map((item, index) => {
              return <div className="sheet" key={index} onClick={handleAction.bind(this, item)}>{item.value}</div>
            })
          }
        </div>
      </div>
    ), {
        backgroundFn: true
      });
  }
  onBlur(e) {
    alert('输入的名字是，' + e.target.value);
  }
  render() {
    let { showFlag } = this.state;
    return [
      <div className='App' key="app">
        <div><button onClick={this.showAlertMsgBox}> 显示alert弹窗 </button></div>
        <div><button onClick={this.showConfirmMsgBox}> 显示confirm弹窗 </button></div>
        <div><button onClick={this.showToastMsgBox}> 显示toast弹窗 </button></div>
        <div><button onClick={this.showCustomMsgBoxFn}> 显示自定义弹窗(message = function) </button></div>
        <div><button onClick={this.showCustomMsgBox}> 显示自定义弹窗(message = reactNode) </button></div>
        <div><button onClick={this.showMsgBoxEl.bind(this)}> 通过MessageBoxEl调用方式显示弹窗 </button></div>
        <div><button onClick={this.showMsgBoxClassname.bind(this)}> MessageBox自定义样式 </button></div>
      </div>,
      <MessageBoxEl type="confirm" key="messagebox" show={showFlag}>
        <div><input onBlur={this.onBlur} placeholder="请输入名字" /></div>
      </MessageBoxEl>
    ]
  }
};
ReactDOM.render(<App />, document.getElementById('app'));

// react-hot-loader
if (module.hot) {
  module.hot.accept();
}