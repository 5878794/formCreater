/**
 creator:xf
 date:2022/11/3
 */

import { defineComponent, watch, reactive, toRefs, inject } from 'vue'
import { inputCacheType } from './input.type'
import inputStyle from './css/inputStyle.module.scss'
import 'element-plus/dist/index.css'

import init from './fn/init'
import { ElFormItem } from 'element-plus'
import boxStyle from '@/components/input/css/box.module.scss'

import createInputFn from './fn/createInput'
import createDivFn from './fn/createDiv'
import createUnitFn from './fn/createUnit'
import createCheckFiledFn from './fn/createCheckFiled'

export default defineComponent({
  props: {
    propData: { type: Object, default: () => ({}) },
    serverData: { type: [String, Object, Array], default: '' },
    labelWidth: { type: String, default: '120px' },
    canMdf: { type: Boolean, default: true }
  },
  setup (props, { emit, expose }) {
    console.log('setup input')
    const formObj: any = inject('formObj')
    const cache = reactive<inputCacheType>({
      param: null,
      valObj: { value: '' }
    })

    // 初始化
    const { initFn, watchFn } = init(props, cache)
    initFn()
    watch(() => props.serverData, () => {
      watchFn()
    })

    const { checkFiled } = createCheckFiledFn(cache, formObj.proxy)
    const { createInput } = createInputFn(cache, checkFiled)
    const { createDiv } = createDivFn(cache)
    const { createUnit } = createUnitFn(cache)

    expose({})
    return {
      ...toRefs(cache),
      createDiv,
      createInput,
      createUnit
    }
  },
  render () {
    console.log('render input')
    const tag = ElFormItem
    return <div
      class={['input_item', inputStyle.input_item]}
      style={this.param!.style}
    >
      <tag
        error={this.param!.errMsg}
        label-width={this.param!.labelWidth}
        label={this.param!.label}
        prop={this.param!.key}
        className={[boxStyle.box_hlc]}
      >
        {this.canMdf && this.createInput()}
        {this.canMdf && this.createUnit()}
        {!this.canMdf && this.createDiv()}
      </tag>
    </div>
  }
})
