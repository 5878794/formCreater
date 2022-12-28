import { checkResultType } from '../input.type'
import myRule from './rule'

const getFormDataVal = (formData: any, key: string, formObj: any) => {
  // key可能带层级
  const keys = key.split('.')
  let data = formData
  let obj: any = formObj.proxy
  for (let i = 0, l = keys.length; i < l; i++) {
    const thisKey = keys[i]
    if (data[thisKey]) {
      obj = obj.find(thisKey)
      data = data[thisKey]
    } else {
      data = ''
      obj = ''
      break
    }
  }
  return {
    data,
    label: (obj && obj.getParam) ? obj.getParam().label : ''
  }
}

export default function (rule: string, val: any, formData: any, formObj: any): checkResultType {
  if (!rule) {
    return { pass: true, msg: '' }
  }
  const rules = rule ? rule.split(',') : []
  let pass = true
  let msg = ''
  rules.map((item) => {
    // 解析规则 获取规则名和规则值
    let nowRule = item
    let ruleVal = ''
    let label = ''

    if (nowRule.indexOf(':') > -1) {
      const temp = nowRule.split(':')
      nowRule = temp[0]
      ruleVal = temp[1]
      if (!isNaN(ruleVal as any)) {
        // 是数字
      } else {
        // 是key
        const rs = getFormDataVal(formData, ruleVal, formObj)
        ruleVal = rs.data
        label = rs.label
      }
    }

    if ((myRule as any)[nowRule]) {
      const rs = (myRule as any)[nowRule](val, ruleVal, label)
      if (!rs.pass) {
        pass = false
        msg = rs.msg
      }
    }
    return null
  })

  return {
    pass,
    msg
  }
}
