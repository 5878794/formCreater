export interface selectItemType {
  label: string,
  value: string
}

export interface checkResultType {
  pass: boolean,
  msg: string
}

export interface uploadRsType {
  name: string
}

export interface inputValueObjType {
  value: any,
  oldValue?: any
}

export interface unitValueObjType {
  value: string,
  oldValue: string
}

export interface formItemType {
  __id__?: string,
  __keyLv__?: string, // key的层级 中间用.分隔
  children?: formItemType[],
  type: 'text' | 'password' | 'select' | 'radio' | 'checkbox' | 'color' |
    'button' | 'date' | 'time' | 'dateTime' | 'file' | 'img' | 'password' |
    'repeat' | 'table' | 'customCom' | 'group',
  key: string, // key   不一定唯一 有repeat或层级
  label: string, // 标签
  labelWidth: string, // 标签宽度  default:120px
  canMdf: boolean, // 是否编辑模式 default:true
  disabled: boolean, // 是否可输入 default:false
  placeholder: string,
  value: any, // 初始值
  unit: string, // 显示单位
  unitOption: selectItemType[], // 单位下拉选择
  options: selectItemType[], // select、radio、checkbox  的选项
  style: string, // 样式
  errMsg: string, // 验证错误信息
  unitValObj?: unitValueObjType,

  ruleFn: (value: any, formData: any) => checkResultType, // 验证函数
  clickFn: (formObj: any, formData: any) => Promise<any>, // button 点击触发
  uploadFn: (file: File) => Promise<uploadRsType>, // file、img 上传时执行
  changeFn: (value: any, formObj: any, formData: any) => void, // 值变化时执行
  setupFn: (prop: formItemType) => Promise<any> // 初始执行
}

export interface inputCacheType {
  param?: formItemType | null,
  valObj: inputValueObjType
}
