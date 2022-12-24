import { inputCacheType } from '../input.type'
import { watch } from 'vue'

export default function (cache: inputCacheType, root: any) {
  // 验证通过后会改写oldValue
  watch(() => cache.valObj.oldValue, () => {
    const id = cache.param?.__keyLv__
    if (root && root.proxy && root.proxy.changeFn) {
      console.log(cache.valObj.oldValue)
      root.proxy.changeFn(id)
    }
  })
}
