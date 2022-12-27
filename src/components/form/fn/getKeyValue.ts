import { cloneDeep } from 'lodash'

export default function (key: string, data: any) {
  let newData = cloneDeep(data)
  const keyLv = key.split('.')
  let back = ''
  for (let i = 0, l = keyLv.length; i < l; i++) {
    newData = newData[keyLv[i]]
    if (i === l - 1) {
      back = newData
    }
  }
  return back
}
