import { ElFormItem } from 'element-plus'
import createUnit from './createUnit'
import { formItemType, valueObjType } from '../input.type'
import boxStyle from '../css/box.module.scss'

const createDiv = (prop: formItemType, valObj: valueObjType) => {
  return null
}

const createInput = (prop: formItemType, valObj: valueObjType) => {
  return <div class={[boxStyle.boxflex1]}>{valObj.value}</div>
}

const createDom = (prop: formItemType, valObj: valueObjType, canMdf: boolean) => {
  const tag = ElFormItem
  return <tag
    error={prop.errMsg}
    label-width={prop.labelWidth}
    label={prop.label}
    prop={prop.key}
    class={[boxStyle.box_hlc]}
  >
    {canMdf && createInput(prop, valObj)}
    {canMdf && createUnit(prop, valObj)}
    {!canMdf && createDiv(prop, valObj)}
  </tag>
}

export default createDom
