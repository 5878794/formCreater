// import xmlStyle from "../styles/css.module.scss";
// import {ElSelect, ElOption} from "element-plus";
//
// const createUnit = (prop: any, checkFiled: any, canMdf: boolean) => {
//   const showUnit = (prop.unit) ? prop.unit.showUnit : '';
//   const dist = (prop.unit && prop.unit.unitList) ? prop.unit.unitList : [];
//
//   if (!showUnit) {
//     return null;
//   }
//
//   if (dist.length === 0) {
//     return createUnitText(showUnit);
//   }
//
//   if (!canMdf) {
//     return createUnitText(showUnit)
//   }
//
//   return createUnitSelect(prop, checkFiled);
//
// }
//
// const createUnitText = (showUnit: string) => {
//   return <div class={[xmlStyle.unitText, 'unitText']}>{showUnit}</div>
// }
//
//
// const unitChange = (prop: any) => {
//   if (prop.value || prop.value == 0) {
//     prop.value = (prop.value * prop.unit.getChangeRate()).toString();
//     prop.submitValue = prop.value;
//   }
//
// }
//
// const createUnitSelect = (prop: any, checkFiled: any) => {
//   return <el-select
//     size="default"
//     v-model={prop.unit.value}
//     multiple={false}
//     class={xmlStyle.unitSelect}
//     onChange={function () {
//       unitChange(prop)
//       checkFiled();
//     }}
//   >
//     {createUnitOption(prop.unit.unitList)}
//   </el-select>
// }
//
// const createUnitOption = (list: any[]) => {
//   return <>
//     {
//       list.map((rs: any) => {
//         return <el-option label={rs.name} value={rs.val} key={rs.val}></el-option>
//       })
//     }
//   </>
// }
//
//
// export default function (prop: any, checkFiled: any, canMdf: boolean) {
//   return <>
//     {createUnit(prop, checkFiled, canMdf)}
//   </>
// }
