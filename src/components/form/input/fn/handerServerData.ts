// //服务器返回初始数据转平层结构
// export default function (data: any) {
//   data = data || {};
//   data = data.properties || [];
//   const backData: any = {};
//   const backData1: any = {};  //原始数据
//
//   const fn = (data: any, parent: any) => {
//     data.map((rs: any, n: number) => {
//       const newRs = JSON.parse(JSON.stringify(rs));
//       rs.parent = parent;
//       const pid = (parent) ? parent.id : '';
//       let id: string;
//       if (parent && parent.repeat) {
//         id = pid ? pid + '.' + n + '.' + rs.name : rs.name;
//       } else {
//         id = pid ? pid + '.' + rs.name : rs.name;
//       }
//
//       rs.id = id;
//       if (rs.value || rs.value === 0) {
//         backData[id] = rs.value;
//       }
//
//       delete newRs.parent;
//       delete newRs.id;
//       backData1[id] = newRs;
//
//       if (rs.properties && rs.properties.length > 0) {
//         fn(rs.properties, rs);
//       }
//     })
//   }
//   fn(data, null);
//
//   return {serverData: backData, serverObjData: backData1};
// }
