// import {ElSelect, ElOption} from "element-plus";
// import xmlStyle from "../styles/css.module.scss";
//
// export default function (prop: any, checkFiled: any, formData: any, canMdf: boolean) {
//   const createOption = () => {
//     return <>
//       {
//         prop.option.map((rs: any) => {
//           return <el-option label={rs.name || rs.value} value={rs.key} key={rs.key}></el-option>
//         })
//       }
//     </>
//   }
//
//   const createInput = () => {
//     return <>
//       <el-select
//         size="default"
//         v-model={prop.value}
//         multiple={false}
//         placeholder={prop.placeholder}
//         class={xmlStyle.xm2_grid_input}
//         disabled={prop.disabled}
//         onChange={function () {
//           prop.submitValue = prop.value;
//           checkFiled();
//         }}
//       >
//         {createOption()}
//       </el-select>
//     </>
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
// }
