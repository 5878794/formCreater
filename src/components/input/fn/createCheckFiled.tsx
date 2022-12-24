import { inputCacheType } from '../input.type'

export default function (cache: inputCacheType, formObj: any) {
  const checkFiled = () => {
    cache.param!.errMsg = ''
    const ruleFn = cache.param!.ruleFn
    const val = cache.valObj.value
    const formData = formObj.getData()
    const rs = ruleFn(val, formData)

    if (!rs.pass) {
      cache.param!.errMsg = rs.msg
    } else {
      cache.valObj.oldValue = val
    }
  }

  return { checkFiled }
}
