import { ElSelect, ElOption } from 'element-plus'
import { formItemType, valueObjType, unitValueObjType, selectItemType } from '../input.type'
import inputStyle from '../css/inputStyle.module.scss'
import { reactive } from 'vue'

const createUnit = (prop: formItemType, valObj: valueObjType) => {
  const showUnit = prop.unit || ''
  const dist = prop.unitOption || []

  if (!showUnit) {
    return null
  }

  if (dist.length === 0) {
    return createUnitText(showUnit)
  }

  return createUnitSelect(prop, valObj)
}

const createUnitText = (showUnit: string) => {
  return <div class={['unitText', inputStyle.unit]}>{showUnit}</div>
}

const unitChange = (prop: formItemType, valObj: valueObjType) => {
  if (valObj.value && !isNaN(valObj.value)) {
    valObj.value =
      (parseFloat(valObj.value) *
        parseFloat(prop.unitValObj!.value) /
        parseFloat(prop.unitValObj!.oldValue)
      ).toString()
  }
  prop.unitValObj!.oldValue = prop.unitValObj!.value
}

const createUnitSelect = (prop: formItemType, valObj: valueObjType) => {
  const tag = ElSelect
  return <tag
    size="default"
    class={[inputStyle.unit, 'unitText']}
    v-model={prop.unitValObj!.value}
    multiple={false}
    onChange={function () {
      unitChange(prop, valObj)
    }}
  >
    {createUnitOption(prop.unitOption)}
  </tag>
}

const createUnitOption = (list: selectItemType[]) => {
  const tag = ElOption
  return <>
    {
      list.map((rs: selectItemType) => {
        return <tag label={rs.label} value={rs.value} key={rs.value}></tag>
      })
    }
  </>
}

export default createUnit
