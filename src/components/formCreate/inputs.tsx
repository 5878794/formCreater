import { defineComponent } from 'vue'

import appStyle from './css/index.module.scss'
import boxStyle from './css/box.module.scss'

export default defineComponent({
  setup () {
    console.log(123)
  },
  render () {
    return <>
            <div class={[appStyle.inputs, boxStyle.box_hcc]}>
                inputs1
            </div>
        </>
  }
})
