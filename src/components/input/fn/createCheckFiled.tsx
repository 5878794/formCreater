import { inputCacheType } from '../input.type'

export default function (cache: inputCacheType, formObj: any, getDataFn: any) {
  const checkFiled = () => {
    cache.param!.errMsg = ''
    const ruleFn = cache.param!.ruleFn || function () {
      return { pass: true }
    }
    const val = getDataFn()
    console.log(val)
    let formData: any = {}
    if (cache.param?.createByForm) {
      formData = formObj.proxy.getData()
    }
    const rs = ruleFn(val, formData)

    if (!rs.pass) {
      cache.param!.errMsg = rs.msg
    } else {
      cache.valObj.oldValue = val
    }

    return rs.pass
  }

  return { checkFiled }
}
