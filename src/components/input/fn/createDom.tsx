import { inputCacheType } from '../input.type'
import boxStyle from '../css/box.module.scss'

export default function (cache: inputCacheType) {
  const createDiv = () => {
    // TODO canMdf=false 时
    return null
  }

  const createInput = () => {
    // TODO 创建各类输入框
    return <div class={[boxStyle.boxflex1]}>{cache.valObj.value}</div>
  }

  return {
    createDiv, createInput
  }
}
