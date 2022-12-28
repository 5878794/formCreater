import { defineComponent, ref, getCurrentInstance, provide, reactive, toRefs, watch } from 'vue'
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

    const cache = reactive({ data: [], submitData: {} })
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
      const data = getData()
      const back: any = {}
      for (const [key, val] of Object.entries(data)) {
        back[key] = (val as any).value
      }

      cache.submitData = back
      emit('change', {
        id: id,
        formData: data
      })
    }

    expose({ getData, checkForm, find, checkAndGetData, changeFn })
    return {
      ...toRefs(cache),
      getData,
      checkForm,
      find,
      checkAndGetData,
      changeFn,
      main
    }
  },
  render () {
    console.log('render main')
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
