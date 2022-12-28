import { formItemType } from '../../input/input.type'
import guid from './guid'
import { cloneDeep } from 'lodash'

// 遍历数据添加guid
const handlerData = (setting: formItemType[], cache: any, serverData: any, uploadFn: any, showBigImageFn: any) => {
  const data = cloneDeep(setting)
  const newServerData = cloneDeep(serverData)

  const submitData = {}
  const fn = (settings: formItemType[], parentKey: string[], submitData: any, sData: any) => {
    // eslint-disable-next-line array-callback-return
    settings.map((item: formItemType) => {
      const thisKeyLv = cloneDeep(parentKey)
      item.__id__ = guid()
      if (item.key) {
        submitData[item.key] = sData[item.key] || item.value
        thisKeyLv.push(item.key)
        item.__keyLv__ = thisKeyLv.join('.')
      }

      // 未配置的，应用全局uploadFn
      if (item.type === 'file' || item.type === 'img') {
        item.uploadFn = item.uploadFn || uploadFn
      }
      //
      if (item.type === 'img') {
        item.showBigImageFn = item.showBigImageFn || showBigImageFn
      }

      if (item.children && item.children.length > 0) {
        submitData[item.key] = {}
        const nSData = sData[item.key] || {}
        fn(item.children, thisKeyLv, submitData[item.key], nSData)
      }
    })
  }
  fn(data, [], submitData, newServerData)

  cache.submitData = submitData
  cache.data = data
}

export default handlerData
