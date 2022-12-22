import { formItemType } from '../../input/input.type'
import guid from './guid'
import { cloneDeep } from 'lodash'

// 遍历数据添加guid
const handlerData = (setting: formItemType[]) => {
  const data = cloneDeep(setting)
  const fn = (settings: formItemType[], parentKey: string[]) => {
    // eslint-disable-next-line array-callback-return
    settings.map((item: formItemType) => {
      const thisKeyLv = cloneDeep(parentKey)
      item.__id__ = guid()
      if (item.key) {
        thisKeyLv.push(item.key)
      }
      item.__keyLv__ = thisKeyLv.join('.')
      item.disabled = item.disabled ? item.disabled : false
      item.ruleFn = item.ruleFn || function () {
        return { pass: true }
      }

      if (item.children && item.children.length > 0) {
        fn(item.children, thisKeyLv)
      }
    })
  }
  fn(data, [])

  return data
}

export default handlerData
