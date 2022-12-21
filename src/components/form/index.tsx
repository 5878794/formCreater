import { defineComponent } from 'vue'
import myInput from '../input/input'

export default defineComponent({
  components: { myInput },
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
  setup (props, { expose }) {
    return {}
  },
  render () {
    console.log('render list')
    const createItem = (item: any, serverData: any) => {
      const type = item.type

      switch (type) {
        case 'text': {
          const data = serverData[item.key]
          return <my-input
            canMdf={this.canMdf}
            labelWidth={this.labelWidth}
            propData={item}
            serverData={data}
          ></my-input>
        }
        case 'group': {
          const key = item.key
          const data = (key) ? serverData[key] : serverData
          return <div>
            {item.label && <p>{item.label}</p>}
            {item.children && createList(item.children, data)}
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

    return <>
      {createList(this.formSetting, this.serverData)}
    </>
  }
})
