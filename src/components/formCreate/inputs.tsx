import { defineComponent } from 'vue'

import appStyle from './css/index.module.scss'
import boxStyle from './css/box.module.scss'
import bIcon from './publishCom/icon'
import { inputs } from './setting'
import { dragStartObj } from './cache'
import { dragObjType } from './types'

export default defineComponent({
  setup (props, { expose }) {
    const dragstartFn = (rs: dragObjType) => {
      dragStartObj.type = rs.type
      dragStartObj.desc = rs.desc
    }

    expose({})
    return {
      dragstartFn
    }
  },
  render () {
    const renderInputs = () => {
      return inputs.map((rs: any) => {
        const tag = bIcon
        return <>
          <tag
            onDragstart={() => {
              this.dragstartFn(rs)
            }}
            draggable="true"
            title={rs.desc}
            src={rs.icon}
          ></tag>
        </>
      })
    }

    return <>
      <div class={[appStyle.inputs, boxStyle.box_hcc, 'inputs']}>
        {renderInputs()}
      </div>
    </>
  }
})
