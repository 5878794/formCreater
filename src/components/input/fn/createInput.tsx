import { inputCacheType } from '../input.type'
import boxStyle from '../css/box.module.scss'

const inputFiles = require.context('../inputs/', false, /\.tsx$/)
const inputs:any = {}
inputFiles.keys().forEach((key:any) => {
  const moduleKey = key.replace(/(\.\/|\.tsx)/g, '')
  inputs[moduleKey] = inputFiles(key).default
})

// 创建各种输入框
export default function (cache: inputCacheType, checkFiled: any) {
  console.log(cache)
  const createInput = () => {
    const type = cache.param!.type
    if (inputs[type]) {
      return inputs[type](cache, checkFiled)
    } else {
      console.error('input类型未找到：' + type)
      return null
    }
  }

  return {
    createInput
  }
}
