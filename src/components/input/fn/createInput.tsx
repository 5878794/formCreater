import { inputCacheType } from '../input.type'
import boxStyle from '../css/box.module.scss'

import text from '../inputs/text'

const inputs: any = {
  text
}

// 创建各种输入框
export default function (cache: inputCacheType, formObj: any) {
  const createInput = () => {
    const type = cache.param!.type
    if (inputs[type]) {
      return inputs[type](cache, formObj)
    } else {
      console.log('input类型未找到：' + type)
      return null
    }
  }

  return {
    createInput
  }
}
