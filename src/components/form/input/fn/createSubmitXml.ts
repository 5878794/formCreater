// import {js2xml} from "xml-js";
//
// export default function (json: any, formData: any, backXmlWarp: string) {
//   const backJson = {
//     name: 'PropertySet',
//     type: 'element',
//     attributes: json.name,
//     elements: []
//   }
//
//   const fn = (data: any[], back: any) => {
//     data.map((item: any) => {
//       const xml = JSON.parse(JSON.stringify(item.xml));
//       delete xml.elements;
//
//       //包含文件的需要转换成"PropertyGroup"
//       if (xml.attributes && xml.attributes.type === 'include') {
//         xml.name = 'PropertyGroup'
//       }
//
//       const id = item.id;
//       const val = formData[id]?.value || '';
//       if (val) {
//         xml.attributes.value = val;
//       }
//       back.push(xml)
//       if (item.children && item.children.length > 0) {
//         xml.elements = [];
//         fn(item.children, xml.elements)
//       }
//     })
//   }
//   fn(json.children || [], backJson.elements)
//
//   const mainXml = js2xml(backJson);
//
//   return backXmlWarp.replace('{{tempData}}', mainXml);
// }
