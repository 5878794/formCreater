// import {ElInput} from 'element-plus';
// import xmlStyle from "../styles/css.module.scss";
//
// export default function (prop: any, checkFiled: any, formData: any, canMdf: boolean) {
//   const createInput = () => {
//     return (
//       <el-input
//         onblur={function () {
//           prop.submitValue = prop.value;
//           checkFiled();
//         }}
//         v-model={prop.value}
//         class={[xmlStyle.xm2_grid_input]}
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
//
// }
