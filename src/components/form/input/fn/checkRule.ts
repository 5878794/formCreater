// //验证函数统一返回函数
// const showLog = false;
// const returnData = (state: boolean, msg?: string) => {
//   if (state) {
//     return {pass: true, msg: ''}
//   } else {
//     return {pass: false, msg: msg || '表单验证错误！'}
//   }
// }
//
//
// const checkRule: any = {
//   //字符串不能小于一个长度
//   strMin(val: string, otherVal: string) {
//     if (val.toString().length < parseFloat(otherVal)) {
//       return returnData(false, `字符串长度不能小于${otherVal}个字符！`);
//     } else {
//       return returnData(true);
//     }
//   },
//   strMax(val: string, otherVal: string) {
//     if (val.toString().length > parseFloat(otherVal)) {
//       return returnData(false, `字符串长度不能大于${otherVal}个字符！`);
//     } else {
//       return returnData(true);
//     }
//   },
//   //数值比较
//   min(val: string, otherVal: string, unit: string, otherName: string) {
//     if (parseFloat(val) < parseFloat(otherVal)) {
//       return returnData(false, `不能小于“${otherName || otherVal + unit}”！`);
//     } else {
//       return returnData(true);
//     }
//   },
//   max(val: string, otherVal: string, unit: string, otherName: string) {
//     if (parseFloat(val) > parseFloat(otherVal)) {
//       return returnData(false, `不能大于“${otherName || otherVal + unit}”！`);
//     } else {
//       return returnData(true);
//     }
//   },
//   //必填
//   required(val: string) {
//     if (!val) {
//       return returnData(false, '不能为空！');
//     } else {
//       return returnData(true);
//     }
//   },
//
//
// }
//
//
// export default function (rule: string, ruleValue: string | number, unit: string) {
//   return function (val: string, formData: any) {
//     if (showLog) {
//       console.log('rule:' + rule + '  ruleValue:' + ruleValue + ' val:' + val + '  unit:' + unit)
//     }
//
//
//     let otherVal = ruleValue;
//     let otherName = '';
//     if (ruleValue && isNaN(parseFloat(ruleValue.toString()))) {
//       //ruleValue是 id
//       otherVal = formData[ruleValue].value;
//       otherName = formData[ruleValue].name;
//     }
//
//     if (checkRule[rule]) {
//       return checkRule[rule](val, otherVal, unit, otherName);
//     } else {
//       console.error('未找到验证规则' + rule)
//       return {pass: true, msg: ''}
//     }
//
//   }
// }
