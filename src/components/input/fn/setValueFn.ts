// 设置值

import { inputCacheType } from '@/components/input/input.type'

export default function (cache: inputCacheType, showValChangeFn: any, dataChangeFn: any) {
  return function (val: any) {
    const newVal = dataChangeFn(val)
    cache.valObj.value = newVal
    cache.valObj.oldValue = newVal
    cache.valObj.showValue = showValChangeFn(newVal)
  }
}
