import { inputCacheType } from '../input.type'
import inputStyle from '../css/inputStyle.module.scss'
import { ElInput } from 'element-plus'

export default function (cache: inputCacheType, formObj: any) {
  const tag = ElInput
  return (
    <tag
      onblur={function () {
        cache.param!.errMsg = ''
        const ruleFn = cache.param!.ruleFn
        const val = cache.valObj.value
        const formData = formObj.getData()
        const rs = ruleFn(val, formData)

        if (!rs.pass) {
          cache.param!.errMsg = rs.msg
        }
      }}
      v-model={cache.valObj.value}
      class={[inputStyle.input]}
      disabled={cache.param!.disabled}
      placeholder={cache.param!.placeholder}
    ></tag>
  )
}
