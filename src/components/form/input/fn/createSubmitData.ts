// /**
//  * 生成提交服务器的数据
//  * */
//
// export default function (json: any, formData: any) {
//   const backData: any = {
//     name: json.name,
//     properties: []
//   };
//
//
//   const fn = (json: any, back: any) => {
//     json.map((item: any) => {
//
//       if (item.tag === 'group') {
//         if (item.children && item.children.length > 0) {
//           fn(item.children, back)
//         }
//       } else {
//         const nowObj: any = {name: item.key};
//         //循环类添加前端用的标识
//         if (item.tag === 'repeat') {
//           nowObj.repeat = 'true'
//         }
//         //取值
//         const id = item.id;
//         const value = formData[id].value;
//         if (typeof value === 'object') {
//           //自定义组件的值可能是对象
//           nowObj.properties = value
//         } else {
//           nowObj.value = value;
//         }
//         back.push(nowObj);
//         if (item.children && item.children.length > 0) {
//           nowObj.properties = [];
//           fn(item.children, nowObj.properties)
//         }
//       }
//     })
//   }
//   fn(json.children || [], backData.properties)
//
//   return JSON.parse(JSON.stringify(backData));
// }
