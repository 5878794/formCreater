// 控件类型
const inputTypes = {
  input: '',
  select: '',
  radio: '',
  checkbox: '',
  color: '',
  button: '',
  date: '',
  time: '',
  dateTime: '',
  file: '',
  img: '',
  password: '',
  repeat: '',
  table: '', // 特殊的repeat输入
  customCom: '', // 自定义组件
  group: ''
}

// main
const props1 = {
  canMdf: '',
  labelWidth: '',
  serverData: {},
  formJson: []
}
export const fn = {
  getData: '',
  checkForm: '',
  find: ''
}

// input
const props = {
  type: '',
  key: '', // key   不一定唯一 有repeat或层级
  label: '', // 标签
  labelWidth: '', // 标签宽度
  canMdf: '', // 是否编辑模式
  disabled: '', // 是否可输入
  placeholder: '',
  val: '', // 值
  unit: '', // 单位
  unitOption: [], // 单位下拉选择
  options: [], // select、radio、checkbox  的选项
  style: '', // 样式
  errMsg: '', // 验证错误信息

  ruleFn: '', // 验证函数
  clickFn: '', // button 点击触发
  uploadFn: '', // file、img 上传时执行
  changeFn: '', // 值变化时执行
  setupFn: '' // 初始执行
}
export const fn1 = {
  checkFiled: '',
  getVal: '',
  find: ''
}
