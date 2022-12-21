// // import {ElButton} from 'element-plus';
// // import xmlStyle from "../styles/css.module.scss";
//
//
// export default function (prop: any, checkFiled: any, formData: any, canMdf: boolean) {
//   const clickFn = async () => {
//     const fn = prop.click || function () {
//     };
//
//     const backData: any = {};
//     for (let [key, val] of Object.entries(formData)) {
//       if ((val as any).id) {
//         backData[key] = (val as any).obj;
//       }
//     }
//
//     await fn(backData);
//   }
//
//
//   const createInput = () => {
//     return (
//       <el-button
//         class={[xmlStyle.xm2_grid_button]}
//         disabled={prop.disabled}
//         icon=''
//         type='primary'
//         onClick={clickFn}
//       >{prop.name}</el-button>
//     )
//   }
//
//
//   return <>
//     {canMdf && createInput()}
//   </>
//
// }
