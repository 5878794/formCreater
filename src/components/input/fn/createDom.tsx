import { inputCacheType } from '../input.type'
import boxStyle from '../css/box.module.scss'

export default function (cache: inputCacheType) {
  const createDiv = () => {
    return null
  }

  const createInput = () => {
    return <div class={[boxStyle.boxflex1]}>{cache.valObj.value}</div>
  }

  return {
    createDiv, createInput
  }
}
