/**
 creator:xf
 date:2022/11/3
 */

import { defineComponent, watch, reactive, toRefs } from 'vue'
import { cloneDeep } from 'lodash'
import createDom from './fn/createDom'
import { formItemType, selectItemType } from './input.type'
import inputStyle from './css/inputStyle.module.scss'
import 'element-plus/dist/index.css'

export default defineComponent({
  props: {
    propData: { type: Object, default: () => ({}) },
    serverData: { type: [String, Object, Array], default: '' },
    labelWidth: { type: String, default: '120px' },
    canMdf: { type: Boolean, default: true }
  },
  setup (props, { emit }) {
    console.log('setup input')
    const cache = reactive<{
      thisProp: formItemType | null,
      valObj: any
    }>({
      thisProp: null,
      valObj: { value: '' }
    })

    // 单位对象的处理  并添加到prop中
    const createUnitObj = () => {
      if (props.propData.unit && props.propData.unitOption && props.propData.unitOption.length > 0) {
        const dist = props.propData.unitOption
        const showUnit = props.propData.unit
        const showUnitVal = dist.find((item: selectItemType) => (item.label === showUnit))?.value ?? '0'
        cache.thisProp!.unitValObj = {
          value: showUnitVal,
          oldValue: showUnitVal
        }
      }
    }

    // 对传入的服务器数据覆盖现有值
    const createValObj = () => {
      cache.valObj.value = props.serverData || cache.thisProp!.value
    }
    const changeValObj = () => {
      cache.valObj.value = props.serverData || cache.valObj.value
    }

    const handlerPropObj = () => {
      // 克隆传入的数据
      const thisPropData = cloneDeep(props.propData)
      // 将传入的数据合并到现有的缓存中
      cache.thisProp = Object.assign(cache.thisProp || {}, thisPropData)
      // 对未传入labelWidth的取用公共的设置
      cache.thisProp!.labelWidth = cache.thisProp!.labelWidth || props.labelWidth
    }

    const init = () => {
      handlerPropObj()
      createUnitObj()
      createValObj()
    }

    watch(props, () => {
      handlerPropObj()
      changeValObj()
    }, { deep: true })
    init()

    return {
      ...toRefs(cache)
    }
  },
  render () {
    console.log('render input')
    return <div
      class={['input_item', inputStyle.input_item]}
      style={this.thisProp!.style}
    >
      {createDom(this.thisProp!, this.valObj, this.canMdf)}
    </div>
  }
})
