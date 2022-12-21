// //由于xml有link 需要遍历标签加载最终返回完整的xml
//
// import {xml2js} from "xml-js";
// import {Network} from "@zx-pack/system";
//
// const api = Network.createApiFunction({
//   getXml: {url: '', type: 'get'}
// });
//
// const getIncludeXml = (xml: string) => {
//   const text = xml.replace(/<!--[\w\W\r\n]*?-->/gmi, '');
//   const modelTag: any = text.match(/<Model .*[\/>|\/Model>]/ig) || [];
//   const loadXml: any = [];
//   modelTag.map((rs: any) => {
//     const json = xml2js(rs) || {};
//     const obj = json.elements || [];
//     const item = obj[0] || {};
//     const name = item.attributes.name;
//     const desc = item.attributes.discription;
//
//     loadXml.push({
//       name, desc, xmlText: rs
//     })
//   })
//   return loadXml;
// }
//
//
// const loadXml = async (obj: any, url: string) => {
//   for (let i = 0, l = obj.length; i < l; i++) {
//     const item = obj[i];
//     const xml = await api.getXml.requestUrl(url).send({modelName: item.name}).catch(() => {
//       console.error('xml模块：' + item.name + "  加载失败！");
//       return {
//         xmlFile: ''
//       }
//     });
//     let text = xml.xmlFile;
//
//     text = text.match(/<PropertySet>[\s\S]*<\/PropertySet>/ig);
//     text = (text) ? text[0] : '';
//     //替换PropertySet为propertyGroup
//     text = text.replace('PropertySet', 'Property type="include" name="' + item.name + '" discription="' + item.desc + '"');
//     text = text.replace('PropertySet', 'Property');
//     item.newXml = text;
//   }
// }
//
//
// export default async function (xml: string, xmlLoadUrl: string) {
//   let newXml = xml;
//
//
//   const fn = async (xml: string) => {
//     const includeXml = getIncludeXml(xml);
//
//     if (includeXml.length > 0) {
//       await loadXml(includeXml, xmlLoadUrl);
//       //替换
//       includeXml.map((obj: any) => {
//         newXml = newXml.replace(obj.xmlText, obj.newXml);
//       })
//
//       await fn(newXml)
//     }
//
//   }
//
//   await fn(newXml);
//
//
//   return newXml;
// }
//
//
