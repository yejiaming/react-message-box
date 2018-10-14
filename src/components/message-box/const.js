// MessageBox组件的prop的默认值
export const DEFAULT_PROP = {
  show: false,                    // 控制弹窗是否显示
  children: null,
  className: '',                  // 自定义样式名字符串，可以是多个样式名称的集合
  type: 'alert',                  // 弹窗类型
  title: '提示',                   // 弹窗title
  message: '主人未填写任何提示信息',  // 弹窗的提示信息
  timeout: 0,                     // 弹窗自动关闭时间，0表示默认永久显示
  opacity: 'black',               // 弹窗黑色背景的颜色，分为两种，【black,transparent】
  lockScroll: true,               // 是否禁用弹窗滚动事件的穿透，默认是不禁用的
  backgroundFn: false,            // 点击背景弹窗所需要调用的方法，可能为true,false,fn三种情况，如果是fn，可以返回bool值决定是否点击背景关闭
  formatFn: noop,                 // 用于一些弹窗需要让外部控制格式化处理显示的情况
  showConfirmButton: true,        // 默认展示confirm的btn
  showCancelButton: false,        // 默认不展示cancel的btn
  confirmButtonText: '确定',       // 确定按钮的text文案
  cancelButtonText: '取消'         // 取消按钮的text文案
}
// prop入参中opacity的对应关系
export const OPACITY_MAP = {
  black: '0.4',
  transparent: '0.0001'
}

// 空函数
function noop() { }