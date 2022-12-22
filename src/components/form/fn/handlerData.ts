import { formItemType } from '../../input/input.type'
import guid from './guid'
import { cloneDeep } from 'lodash'

// 遍历数据添加guid
const handlerData = (setting: formItemType[]) => {
  const data = cloneDeep(setting)
  const fn = (settings: formItemType[]) => {
    // eslint-disable-next-line array-callback-return
    settings.map((item: formItemType) => {
      item.__id__ = guid()
      item.disabled = item.disabled ? item.disabled : false
      item.ruleFn = item.ruleFn || function () {
        return { pass: true }
      }

      if (item.children && item.children.length > 0) {
        fn(item.children)
      }
    })
  }
  fn(data)

  return data
}

export default handlerData
