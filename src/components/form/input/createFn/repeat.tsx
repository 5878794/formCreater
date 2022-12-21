// import {ElInput} from 'element-plus';
// import xmlStyle from "../styles/css.module.scss";
// import {addItem} from '../fn/xml2Json';
//
// const cloneChildren = (prop: any, formData: any) => {
//   const oldValue = prop.children.length;
//   const nowValue = prop.value;
//
//   if (nowValue <= oldValue) {
//     const spliceN = oldValue - nowValue
//     prop.children.splice(nowValue, spliceN);
//     //formData清理
//     const del = [];
//     for (let key of Object.keys(formData)) {
//       if (key.indexOf(prop.id) === 0) {
//         const t = key.replace(prop.id, '');
//         const n = t.split('.')[1];
//         if (n >= nowValue) {
//           del.push(key);
//         }
//       }
//     }
//     del.map((key: string) => {
//       delete formData[key];
//     })
//
//   } else {
//     for (let i = oldValue, l = nowValue; i < l; i++) {
//       addItem(prop, i, {}, formData);
//     }
//   }
//
//
// }
//
//
// export default function (prop: any, checkFiled: any, formData: any, canMdf: boolean) {
//   const createInput = () => {
//     return (
//       <el-input
//         onInput={function () {
//           cloneChildren(prop, formData)
//         }}
//         onblur={function () {
//           prop.submitValue = prop.value;
//           checkFiled();
//         }}
//         v-model={prop.value}
//         class={xmlStyle.xm2_grid_input}
//         disabled={prop.disabled}
//         placeholder={prop.placeholder}
//       ></el-input>
//     )
//   }
//
//   const createDiv = () => {
//     return <div class={['notMdf']}>{prop.value}</div>
//   }
//
//   return <>
//     {canMdf && createInput()}
//     {!canMdf && createDiv()}
//   </>
// }
