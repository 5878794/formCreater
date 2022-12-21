// import {ElInput} from 'element-plus';
// import xmlStyle from "../styles/css.module.scss";
//
// export default function (prop: any, checkFiled: any, formData: any, canMdf: boolean) {
//   const onBlur = () => {
//     prop.submitValue = prop.value.join(',');
//     checkFiled();
//   }
//
//   const mapBtnClickFn = async () => {
//     const data = await prop.mapBtnClick();
//     prop.value = [data.lng, data.lat, data.h];
//     onBlur();
//   }
//
//   const createInput = () => {
//     return (
//       <div class={xmlStyle.gis_input}>
//         <el-input
//           onblur={onBlur}
//           v-model={prop.value[0]}
//           class={[xmlStyle.xm2_grid_input]}
//           disabled={prop.disabled}
//           placeholder='经度'
//         ></el-input>
//         <el-input
//           onblur={onBlur}
//           v-model={prop.value[1]}
//           class={[xmlStyle.xm2_grid_input]}
//           disabled={prop.disabled}
//           placeholder='维度'
//         ></el-input>
//         <el-input
//           onblur={onBlur}
//           v-model={prop.value[2]}
//           class={[xmlStyle.xm2_grid_input]}
//           disabled={prop.disabled}
//           placeholder='高度'
//         ></el-input>
//         <el-button class={xmlStyle.gis_btn} onClick={mapBtnClickFn}>地图取点</el-button>
//       </div>
//     )
//   }
//
//   const createDiv = () => {
//     return <div class={['notMdf']}>{prop.value.join(',')}</div>
//   }
//
//   return <>
//     {canMdf && createInput()}
//     {!canMdf && createDiv()}
//   </>
//
// }
