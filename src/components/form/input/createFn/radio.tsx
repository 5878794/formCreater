// import {ElRadio, ElRadioGroup} from 'element-plus';
// import xmlStyle from "../styles/css.module.scss";
//
// export default function (prop: any, checkFiled: any, formData: any, canMdf: boolean) {
//   const createInput = () => {
//     return (
//       <el-radio-group v-model={prop.value} disabled={prop.disabled} onChange={function () {
//         prop.submitValue = prop.value;
//         checkFiled();
//       }}>
//         {
//           prop.option.map((item: any) => {
//             return <el-radio label={item.key}>{item.value || item.name}</el-radio>
//           })
//         }
//       </el-radio-group>
//
//     )
//   }
//
//   const getName = (val: string) => {
//     let back = '';
//     prop.option.map((rs: any) => {
//       if (rs.key === prop.value) {
//         back = rs.name;
//       }
//     })
//     return back;
//   }
//
//   const createDiv = () => {
//     return <div class={['notMdf']}>{getName(prop.value)}</div>
//   }
//
//   return <>
//     {canMdf && createInput()}
//     {!canMdf && createDiv()}
//   </>
//
// }
