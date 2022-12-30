import { defineComponent, ref, getCurrentInstance, provide, reactive, toRefs, watch, nextTick } from 'vue'
import handlerData from './fn/handlerData'
import { formItemType } from '../input/input.type'
import group from './group'
import myRule from '../input/fn/rule'
import reverseCheck from './fn/reverseCheck'

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
    },
    rule: {
      type: Object, default: () => ({})
    },
    uploadFn: {
      type: Function,
      default: (file: File) => {
        console.error('未配置上传函数')
        return ''
      }
    },
    showBigImageFn: {
      type: Function,
      default: (src: string) => {
        console.error('未配置查看大图的函数')
        return ''
      }
    }
  },
  emits: ['change'],
  setup (props, { expose, emit }) {
    const root = getCurrentInstance()
    provide('root', root)

    // rule合并
    for (const [key, val] of Object.entries(props.rule)) {
      (myRule as any)[key] = val
    }

    const cache = reactive({
      data: [],
      submitData: {},
      ruleReverseCheck: {}
    })
    const handlerDataFn = () => {
      handlerData(
        props.formSetting as formItemType[],
        cache,
        props.serverData,
        props.uploadFn,
        props.showBigImageFn
      )
    }
    handlerDataFn()

    // formSetting 参数变化会重置表单
    watch(() => props.formSetting, () => {
      handlerDataFn()
    })
    watch(() => props.serverData, () => {
      handlerDataFn()
    })

    const main = ref(null)

    const getData = () => {
      return (main.value as any).getData()
    }
    const checkForm = () => {
      return (main.value as any).checkFiled()
    }
    const find = (key: string) => {
      return (main.value as any).find(key)
    }
    const checkAndGetData = () => {
      return (main.value as any).checkAndGetData()
    }

    const changeFn = (id: string) => {
      reverseCheck(id, cache.ruleReverseCheck, root)
      const data = getData()
      cache.submitData = data
      emit('change', {
        id: id,
        formData: data
      })
    }

    const refresh = () => {
      nextTick(() => {
        cache.submitData = getData()
      })
    }

    expose({ getData, checkForm, find, checkAndGetData, changeFn, refresh })
    return {
      ...toRefs(cache),
      getData,
      checkForm,
      find,
      checkAndGetData,
      changeFn,
      refresh,
      main
    }
  },
  render () {
    return <>
      <group
        ref='main'
        formSetting={this.data}
        serverData={this.serverData}
        labelWidth={this.labelWidth}
        canMdf={this.canMdf}
        submitData={this.submitData}
      ></group>
    </>
  }
})
