import { defineComponent, getCurrentInstance } from 'vue'
import myInput from '../input/index'
import formStyle from './css/formStyle.module.scss'
import { formItemType } from '@/components/input/input.type'

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
    const showItems = new Map()
    const _this = getCurrentInstance()

    const getData = () => {
      const back: any = {}
      showItems.forEach((value, key) => {
        const domRef = _this!.proxy?.$refs[value] as any
        back[key] = domRef.getData()
      })
      return back
    }

    const checkForm = () => {
      let pass = true
      showItems.forEach((value, key) => {
        const domRef = _this!.proxy?.$refs[value] as any
        if (!domRef.checkFiled) {
          pass = false
        }
      })

      return pass
    }

    const find = (key: string) => {
      const refValue = showItems.get(key)
      const domRef = _this!.proxy?.$refs[refValue] as any
      return domRef
    }

    const checkAndGetData = () => {
      const pass = checkForm()
      const data = getData()

      return {
        pass: pass,
        data: data

      }
    }

    expose({ getData, checkForm, find, checkAndGetData })
    return {
      getData,
      checkForm,
      find,
      checkAndGetData,
      showItems
    }
  },
  render () {
    this.showItems.clear()

    const createItem = (item: any, serverData: any) => {
      const type = item.type
      this.showItems.set(item.key, item.__id__)

      switch (type) {
        case 'text':
        case 'color':
        case 'date':
        case 'dateTime':
        case 'time':
        case 'radio':
        case 'password':
        case 'file':
        case 'img':
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
            createByForm={true}
            data-key-lv={item.__keyLv__}
          ></my-input>
        }
        case 'group': {
          const key = item.key
          const data = (key) ? serverData[key] : serverData
          return <div
            style={item.style}
            id={item.__id__}
            data-key-lv={item.__keyLv__}
          >
            {item.label && <p>{item.label}</p>}
            {/* 没有key的时候下面的子集当成平级元素渲染 */}
            {!key && item.children && createList(item.children, data)}
            {/* 有key的时候当成另一个form渲染 */}
            {key && item.children && createGroup(item, data)}
          </div>
        }
        default:
          console.error(type + ' 不存在！')
          return null
      }
    }

    const createGroup = (item: formItemType, data: any) => {
      return <b-from
        ref={item.__id__}
        key={item.__id__}
        formSetting={item.children}
        serverData={data}
        labelWidth={this.labelWidth}
        canMdf={this.canMdf}
      ></b-from>
    }

    const createList = (settings: any, serverData: any) => {
      serverData = serverData || {}
      return settings.map((item: any) => {
        return createItem(item, serverData)
      })
    }

    return <div class={[formStyle.form_item, '__form__']}>
      {createList(this.formSetting, this.serverData)}
    </div>
  }
})
