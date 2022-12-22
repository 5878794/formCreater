import { defineComponent, getCurrentInstance, provide, reactive, toRefs, watch } from 'vue'
import myInput from '../input/index'
import handlerData from './fn/handlerData'
import { formItemType } from '../input/input.type'
import formStyle from './css/formStyle.module.scss'

export default defineComponent({
  name: 'bFrom',
  components: { myInput },
  props: {
    canMdf: { type: Boolean, default: true },
    labelWidth: { type: String, default: '120px' },
    serverData: {
      type: Object, default: () => ({})
    },
    formSetting: {
      type: Array, default: () => ([])
    },
    id: { type: String, default: '' }
  },
  setup (props, { expose }) {
    const root = getCurrentInstance()
    provide('formObj', root)

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

    expose({ getData, checkForm, find, checkAndGetData })
    return {
      ...toRefs(cache),
      getData,
      checkForm,
      find,
      checkAndGetData
    }
  },
  render () {
    console.log('render list')
    const createItem = (item: any, serverData: any) => {
      const type = item.type

      switch (type) {
        case 'text':
        case 'select': {
          const data = serverData[item.key]
          return <my-input
            ref={item.__id__}
            key={item.__id__}
            id={item.__id__}
            style={item.style}
            canMdf={this.canMdf}
            labelWidth={this.labelWidth}
            propData={item}
            serverData={data}
          ></my-input>
        }
        case 'group': {
          const key = item.key
          const data = (key) ? serverData[key] : serverData
          return <div style={item.style}>
            {item.label && <p>{item.label}</p>}
            {/* 没有key的时候下面的子集当成平级元素渲染 */}
            {!key && item.children && createList(item.children, data)}
            {/* 有key的时候当成另一个form渲染 */}
            <b-from
              ref={item.__id__}
              key={item.__id__}
              id={item.__id__}
              formSetting={item.children}
              serverData={data}
              labelWidth={this.labelWidth}
              canMdf={this.canMdf}
            ></b-from>
          </div>
        }
        default:
          console.error(type + ' 不存在！')
          return null
      }
    }

    const createList = (settings: any, serverData: any) => {
      serverData = serverData || {}
      return settings.map((item: any) => {
        return createItem(item, serverData)
      })
    }

    return <div class={[formStyle.form_item, '__form__']}>
      {createList(this.data, this.serverData)}
    </div>
  }
})
