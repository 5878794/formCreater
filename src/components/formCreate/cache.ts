import { reactive, ref } from 'vue'
import { dragObjType } from './types'

const dragStartObj = reactive<dragObjType>({
  type: null,
  desc: ''
})

export {
  dragStartObj
}
