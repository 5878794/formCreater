// const isNumber = (str: string) => {
//   return !isNaN(parseFloat(str))
// }
//
//
// /**
//  * @description 获取缓存数据（由于设计问题，对象层级前面的值如有子集会被覆盖成对象，要取值请从getData中取）
//  * */
// export default function (data: any) {
//   const back: any = {};
//   for (let [key, val] of Object.entries(data)) {
//     const temp = key.split('.');
//     let i = 0;
//     let tempObj = back;
//     while (i < temp.length) {
//       let thisId: string | number = temp[i];
//       if (isNumber(thisId)) {
//         thisId = parseInt(thisId);
//       }
//
//       if (!tempObj[thisId] || typeof tempObj[thisId] !== 'object') {
//         const nextId = temp[i + 1];
//         if (isNumber(nextId)) {
//           tempObj[thisId] = [];
//         } else {
//           tempObj[thisId] = {};
//         }
//       }
//       i++;
//       if (i === temp.length) {
//         tempObj[thisId] = (val as any).value;
//       }
//       tempObj = tempObj[thisId];
//     }
//   }
//
//
//   return back;
// }
