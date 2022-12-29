export default function (key: string, formObj: any) {
  const keyLv = key.split('.')

  let obj = formObj.proxy
  let back = ''
  for (let i = 0, l = keyLv.length; i < l; i++) {
    if (obj && obj.find) {
      const thisKey = keyLv[i]
      obj = obj.find(thisKey)
      if (i === l - 1) {
        back = (obj && obj.getParam) ? obj.getParam().label : ''
      }
    }
  }
  return back
}
