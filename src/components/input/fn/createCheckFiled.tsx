import { inputCacheType } from '../input.type'
import ruleFunction from './ruleFn'

export default function (cache: inputCacheType, formObj: any, getDataFn: any) {
  const checkFiled = () => {
    cache.param!.errMsg = ''
    const ruleFn = cache.param!.ruleFn || function () {
      return { pass: true }
    }
    const val = getDataFn()
    let formData: any = {}
    if (cache.param?.createByForm) {
      formData = formObj.proxy.getData()
    }

    // rule的验证
    if (cache.param?.rule) {
      const rs = ruleFunction(cache.param?.rule, val, formData)
      if (!rs.pass) {
        cache.param!.errMsg = rs.msg
        return false
      }
    }

    // ruleFn的验证
    const rs = ruleFn(val, formData)

    if (!rs.pass) {
      cache.param!.errMsg = rs.msg
    } else {
      cache.valObj.value = val
    }

    return rs.pass
  }

  return { checkFiled }
}
