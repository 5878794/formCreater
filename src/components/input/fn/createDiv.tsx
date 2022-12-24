import { inputCacheType } from '../input.type'
import boxStyle from '../css/box.module.scss'

// canMdf=false 时渲染
export default function (cache: inputCacheType) {
  const createDiv = () => {
    // TODO canMdf=false 时
    return null
  }

  return {
    createDiv
  }
}
