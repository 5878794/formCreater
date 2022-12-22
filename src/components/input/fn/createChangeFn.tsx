import { inputCacheType } from '../input.type'
import { watch } from 'vue'

export default function (cache: inputCacheType, root: any) {
  watch(() => cache.valObj.value, () => {
    const id = cache.param?.__keyLv__
    root.changeFn(id)
  })
}
