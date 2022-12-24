import { inputCacheType } from '../input.type'

export default function (cache: inputCacheType, formObj: any) {
  const checkFiled = () => {
    cache.param!.errMsg = ''
    const ruleFn = cache.param!.ruleFn || function () { return { pass: true } }
    const val = cache.valObj.value
    let formData:any = {}
    if (formObj && formObj.proxy && formObj.proxy.getData) {
      formData = formObj.proxy.getData()
    }
    const rs = ruleFn(val, formData)

    if (!rs.pass) {
      cache.param!.errMsg = rs.msg
    } else {
      cache.valObj.oldValue = val
    }
  }

  return { checkFiled }
}
