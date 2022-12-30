import { inputCacheType } from '../input.type'
import boxStyle from '../css/box.module.scss'

// 动态加载 ../inputs/*.tsx 文件
const inputFiles = require.context('../inputs/', false, /\.tsx$/)
const inputs:any = {}
inputFiles.keys().forEach((key:any) => {
  const moduleKey = key.replace(/(\.\/|\.tsx)/g, '')
  inputs[moduleKey] = inputFiles(key).default
})

// 创建各种输入框
export default function (cache: inputCacheType, checkFiled: any, root: any) {
  const createInput = () => {
    const type = cache.param!.type
    if (inputs[type]) {
      return inputs[type](cache, checkFiled, root)
    } else {
      console.error('input类型未找到：' + type)
      return null
    }
  }

  return {
    createInput
  }
}
