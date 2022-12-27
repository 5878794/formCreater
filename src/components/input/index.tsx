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

import setParamFn from './fn/setParamFn'
import setValueFn from './fn/setValueFn'
import getDataFn from './fn/getDataFn'
import changeDataType from './fn/changeDataType'
import getShowData from './fn/getShowData'
import createInputFn from './fn/createInput'
import createDivFn from './fn/createDiv'
import createUnitFn from './fn/createUnit'
import createCheckFiledFn from './fn/createCheckFiled'
import createChangeFn from './fn/createChangeFn'

export default defineComponent({
  props: {
    propData: { type: Object, default: () => ({}) },
    serverData: { type: [String, Object, Array], default: '' },
    labelWidth: { type: String, default: '120px' },
    canMdf: { type: Boolean, default: true },
    createByForm: { type: Boolean, default: false }
  },
  emits: ['change'],
  setup (props, { emit, expose }) {
    const root: any = inject('root')
    const cache = reactive<inputCacheType>({
      param: null,
      valObj: { value: '', oldValue: '', showValue: '' }
    })

    // 数据格式转换函数
    const dataChangeFn = changeDataType(props.propData.type)
    // 显示数据格式转换
    const showValChangeFn = getShowData(props.propData.type)

    // 初始化
    const { initFn } = init(props, cache, dataChangeFn, showValChangeFn)
    initFn()

    // 创建数据变化触发函数
    createChangeFn(cache, root, emit)
    // 获取数据
    const getData = getDataFn(cache)
    // 创建验证函数
    const { checkFiled } = createCheckFiledFn(cache, root, getData)
    // 创建输入框函数
    const { createInput } = createInputFn(cache, checkFiled)
    // 创建非编辑状态时的div
    const { createDiv } = createDivFn(cache)
    // 创建单位
    const { createUnit } = createUnitFn(cache)
    // 刷新参数
    const setParam = setParamFn(cache)
    // 改变值
    const setValue = setValueFn(cache, showValChangeFn, dataChangeFn)

    expose({ getData, checkFiled, setParam, setValue })
    return {
      getData,
      checkFiled,
      setParam,
      setValue,
      ...toRefs(cache),
      createDiv,
      createInput,
      createUnit
    }
  },
  render () {
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
        class={[boxStyle.box_hlc]}
      >
        {this.canMdf && this.createInput()}
        {this.canMdf && this.createUnit()}
        {!this.canMdf && this.createDiv()}
      </tag>
    </div>
  }
})
