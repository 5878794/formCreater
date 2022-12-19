import { defineComponent } from 'vue'
import appStyle from './css/index.module.scss'
import boxStyle from './css/box.module.scss'

export default defineComponent({
  render () {
    return <>
      <div class={[boxStyle.box_hlt, appStyle.main, 'main']}>main</div>
    </>
  }
})
