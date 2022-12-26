import { defineComponent, getCurrentInstance, provide, reactive, toRefs, watch } from 'vue'
import handlerData from './fn/handlerData'
import { formItemType } from '../input/input.type'
import group from './group'

export default defineComponent({
  components: { group },
  props: {
    canMdf: { type: Boolean, default: true },
    labelWidth: { type: String, default: '120px' },
    serverData: {
      type: Object, default: () => ({})
    },
    formSetting: {
      type: Array, default: () => ([])
    }
  },
  emits: ['change'],
  setup (props, { expose, emit }) {
    const root = getCurrentInstance()
    provide('root', root)

    const cache = reactive({ data: [] })
    cache.data = handlerData(props.formSetting as formItemType[])

    // formSetting 参数变化会重置表单
    watch(() => props.formSetting, () => {
      cache.data = handlerData(props.formSetting as formItemType[])
    })

    const getData = () => {
      return { a: 1, b: 2 }
    }
    const checkForm = () => {
      return {
        pass: true,
        msg: ''
      }
    }
    const find = () => {
      return ''
    }
    const checkAndGetData = () => {
      return {
        pass: true,
        data: { a: 1, b: 2 }
      }
    }

    const changeFn = (id: string) => {
      emit('change', {
        id: id,
        formData: getData()
      })
    }

    expose({ getData, checkForm, find, checkAndGetData, changeFn })
    return {
      ...toRefs(cache),
      getData,
      checkForm,
      find,
      checkAndGetData,
      changeFn
    }
  },
  render () {
    return <>
      <group
        formSetting={this.data}
        serverData={this.serverData}
        labelWidth={this.labelWidth}
        canMdf={this.canMdf}
      ></group>
    </>
  }
})
