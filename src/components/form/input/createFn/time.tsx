// import {ElTimePicker} from 'element-plus';
// import xmlStyle from "../styles/css.module.scss";
// import {formatData} from "@zx-pack/zx-tool";
//
// export default function (prop: any, checkFiled: any, formData: any, canMdf: boolean) {
//   const createInput = () => {
//     return (
//       <el-time-picker
//         onChange={function () {
//           prop.submitValue = (prop.value) ? prop.value.getTime().toString() : '';
//           checkFiled();
//         }}
//         v-model={prop.value}
//         class={xmlStyle.xm2_grid_input}
//         disabled={prop.disabled}
//         placeholder={prop.placeholder}
//       />
//     )
//   }
//
//   const createDiv = () => {
//     return <div class={['notMdf']}>{formatData(prop.submitValue, 'hh:mm:ss')}</div>
//   }
//
//   return <>
//     {canMdf && createInput()}
//     {!canMdf && createDiv()}
//   </>
// }