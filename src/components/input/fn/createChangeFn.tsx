import { inputCacheType } from '../input.type'
import { watch } from 'vue'

export default function (cache: inputCacheType, root: any, emit: any) {
  // 验证通过后会改写oldValue
  watch(() => cache.valObj.oldValue, () => {
    const id = cache.param?.__keyLv__

    if (cache.param?.createByForm) {
      root.proxy.changeFn(id)
    } else {
      const val = cache.valObj.value
      emit('change', val)
    }
  }, { deep: true })
}
