import { inputCacheType } from '../input.type'
import inputStyle from '../css/inputStyle.module.scss'
import { ElInput } from 'element-plus'

export default function (cache: inputCacheType, checkFiled: any) {
  const tag = ElInput
  return (
    <tag
      onblur={function () {
        checkFiled()
      }}
      type='password'
      v-model={cache.valObj.value}
      class={[inputStyle.input]}
      disabled={cache.param!.disabled}
      placeholder={cache.param!.placeholder}
      show-password
    ></tag>
  )
}
