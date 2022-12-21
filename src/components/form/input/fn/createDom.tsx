// import {ElFormItem} from 'element-plus';
// import createUnit from "./createUnit";
// //样式
// import xmlStyle from '../styles/css.module.scss';
// //控件
// import input from '../inputs/input';
// import select from '../inputs/select';
// import file from '../inputs/file';
// import color from '../inputs/color';
// import img from '../inputs/img';
// import date from '../inputs/date';
// import time from '../inputs/time';
// import dateTime from '../inputs/dateTime';
// import password from '../inputs/password';
// import repeat from '../inputs/repeat';
// import radio from '../inputs/radio';
// import gis from '../inputs/gis';  //废弃
// import button from '../inputs/button';
//
//
// const createDom: any = {
//   input,
//   select,
//   file,
//   color,
//   img,
//   date,
//   time,
//   dateTime,
//   password,
//   repeat,
//   radio,
//   gis,
//   button
// }
//
//
// export default function (type: string, prop: any, checkFiled: any, formData: any, canMdf: boolean, labelWidth: string) {
//   const renderInput = (type: string, prop: any) => {
//     if (createDom[type]) {
//       return createDom[type](prop, checkFiled, formData, canMdf);
//     } else {
//       console.error(`${type} 控件不存在！！！`);
//       return null;
//     }
//   }
//
//   const createInput = () => {
//     return <div class={'grid_item'}>
//       <el-form-item id={prop.id} error={prop.errorMsg} label-width={labelWidth} label={prop.txt} prop={prop.key}>
//         {renderInput(type, prop)}
//         {createUnit(prop, checkFiled, canMdf)}
//       </el-form-item>
//     </div>
//   }
//
//   const createButton = () => {
//     return <div class={'grid_item'}>
//       {renderInput(type, prop)}
//     </div>
//   }
//
//
//   // labelWidth = (prop.txt === '') ? '0px' : labelWidth;
//   return <>
//     {type !== 'button' && createInput()}
//     {type === 'button' && createButton()}
//   </>
//
//
// }
//
//
//
//
//
//
