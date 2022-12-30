import getRealId from './getRealId'
import getVueObj from './getVueObj'

export default function (key: string, formObj: any, rowIndex: any[]) {
  const realKey = getRealId(key, rowIndex)
  const obj = getVueObj(realKey, formObj)
  if (obj) {
    return obj.label
  } else {
    return ''
  }
}
