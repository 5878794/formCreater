import { inputCacheType } from '../input.type'
import { watch } from 'vue'

export default function (cache: inputCacheType, root: any, emit: any) {
  // 验证通过后会改写value
  watch(() => cache.valObj.value, (a: any, b: any) => {
    const id = cache.param?.__keyLv__

    if (cache.param?.createByForm) {
      root.proxy.changeFn(id)
    } else {
      emit('change', cache.valObj.value)
    }
  }, { deep: true })
}
