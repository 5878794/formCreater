import { inputCacheType } from '../input.type'
import boxStyle from '../css/box.module.scss'

import text from '../inputs/text'
import select from '../inputs/select'

const inputs: any = {
  text, select
}

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
