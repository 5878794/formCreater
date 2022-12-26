import { inputCacheType } from '../input.type'
import inputStyle from '../css/inputStyle.module.scss'
import { ElRadio, ElRadioGroup } from 'element-plus'

export default function (cache: inputCacheType, checkFiled: any) {
  const createInput = () => {
    return (
      <ElRadioGroup
        v-model={cache.valObj.value}
        disabled={cache.param!.disabled}
        onChange={function () {
          checkFiled()
        }}>
        {
          cache.param!.options!.map((item: any) => {
            return <ElRadio
              label={item.value}
            >{item.label}</ElRadio>
          })
        }
      </ElRadioGroup>

    )
  }

  return <>
    {createInput()}
  </>
}
