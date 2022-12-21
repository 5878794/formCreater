// //xml处理
// import {xml2js} from "xml-js";
// import inputCheckRule from './checkRule';
// import {cloneDeep} from "@zx-pack/zx-tool";
// import {Network} from "@zx-pack/system";
//
//
// /**
//  * @description 根据type和dataType判断界面显示的ui控件,自定义组件 返回''
//  * @param {any} attr xml中attributes对象
//  * @param {string} xmlTagName xml的标签名
//  * */
// const getInputType = (attr: any, xmlTagName: string) => {
//   let dataType = attr.datatype || attr.DataType || attr.Datatype || attr.dataType || 'string';
//   const type = (attr.type) ? attr.type.toLocaleLowerCase() : "common";
//   dataType = dataType.toLocaleLowerCase();
//   let tag = '';
//
//   if (xmlTagName === "PropertyGroup") {
//     tag = 'group';
//   } else if (xmlTagName === "Property") {
//
//     if (type === "common") {
//       if (dataType === 'int' || dataType === 'double' || dataType === 'uint' || dataType === 'string' || dataType == "integer") {
//         tag = 'input';
//       } else if (dataType === 'list') {
//         tag = 'repeat'
//       }
//     }
//
//     if (type === 'select') {
//       if (dataType === 'int' || dataType === 'double' || dataType === 'uint' || dataType === 'string') {
//         tag = 'select';
//       }
//     }
//
//     if (type === 'img') {
//       if (dataType === 'string') {
//         tag = 'img';
//       }
//     }
//
//     if (type === 'file') {
//       if (dataType === 'string') {
//         tag = 'file';
//       }
//     }
//
//     if (type === 'date') {
//       if (dataType === 'string' || dataType === 'int' || dataType === 'double') {
//         tag = 'date';
//       }
//     }
//
//     if (type === 'datetime') {
//       if (dataType === 'string' || dataType === 'int' || dataType === 'double') {
//         tag = 'dateTime';
//       }
//     }
//
//     if (type === 'time') {
//       if (dataType === 'string' || dataType === 'int' || dataType === 'double') {
//         tag = 'time';
//       }
//     }
//
//     if (type === 'password') {
//       if (dataType === 'string') {
//         tag = 'password';
//       }
//     }
//
//     if (type === 'color') {
//       if (dataType === 'string' || dataType === 'int') {
//         tag = 'color';
//       }
//     }
//
//     //自定义组件
//     if (type === 'customize') {
//       tag = '__customize__';
//     }
//
//     //渲染成小标题,官方解释：结构体  或 包含文件
//     if (type === 'table' || type === 'include') {
//       tag = 'structure';
//     }
//   }
//
//
//   return tag;
// }
//
//
// /**
//  * @description 获取select的option
//  * @param {string} str xml中的rang字段
//  * */
// const getSelectOption = (str: string) => {
//   if (!str) {
//     return [];
//   }
//
//   const arr = str.split(',');
//   const back: any = [];
//   arr.map((rs: any) => {
//     const item = rs.split('-');
//     const name = item.splice(item.length - 1, 1)[0];
//     const key = item.join('-');
//     back.push({name, key});
//   })
//
//   return back;
// }
//
//
// /**
//  * @description 生成元素的验证规则
//  * @param {string} tag 转换后的元素标签名
//  * @param {string} range xml中range中的字符
//  * @param {string} dataType xml中dataType中的字符
//  * @param {array|null} myRule 自定义规则,数组中可以是字符串规则也可以是传入的验证函数
//  * */
// const createRule = (tag: string, range: string, dataType: string, myRule: any[] | null, unit: string) => {
//   const rule: any = [];
//   //xml上的规则
//   if (range && tag !== 'select') {
//     const minMax = range.split(',');
//     if (dataType.toLocaleLowerCase() === 'string') {
//       if (minMax[0]) {
//         rule.push(inputCheckRule('strMin', minMax[0], unit))
//       }
//       if (minMax[1]) {
//         rule.push(inputCheckRule('strMax', minMax[1], unit))
//       }
//     } else {
//       if (minMax[0]) {
//         rule.push(inputCheckRule('min', minMax[0], unit))
//       }
//       if (minMax[1]) {
//         rule.push(inputCheckRule('max', minMax[1], unit))
//       }
//     }
//   }
//
//   //自定义规则添加
//   if (myRule) {
//     myRule.map((rs: any) => {
//       if (typeof rs === 'function') {
//         rule.push(rs);
//       } else if (typeof rs === 'string') {
//         const temp = rs.split(':');
//         rule.push(inputCheckRule(temp[0], temp[1], unit))
//       } else {
//         console.error('无法识别的验证规则:' + rs)
//       }
//     })
//   }
//
//   //拼接成一个验证函数
//   const ruleFn = (val: string, formData: any) => {
//     let checkResult: any = {pass: true, msg: ''};
//     for (let i = 0, l = rule.length; i < l; i++) {
//       const checkRs = rule[i](val, formData);
//       if (!checkRs.pass) {
//         checkResult = checkRs;
//         break;
//       }
//     }
//     return checkResult;
//   }
//
//   return ruleFn;
// }
//
// /**
//  * @description 生成当前元素的id
//  * @param {any} parentJson xml元素的父级元素json
//  * @param {string} key 当前元素的key
//  * */
// const getId = (parentJson: any, key: string) => {
//   if (!key) {
//     return '';
//   }
//
//   let pid = '';
//   while (parentJson && !pid) {
//     //标签"PropertyGroup"不叠加到id上
//     if (parentJson.id && parentJson.tag !== 'group') {
//       pid = parentJson.id;
//     } else {
//       parentJson = parentJson.parent;
//     }
//   }
//
//   return (pid) ? pid + '.' + key : key;
// }
//
// /**
//  * @description 生成元素的样式
//  * @param {string} tag 标签名
//  * @param {string} id 元素当前id
//  * @param {any} style 自定样式  id:{样式对象}
//  * @param {any} defaultStyle 组件配置的默认样式  {groupStyle:{},itemStyle:{}}
//  * */
// const createStyle = (tag: string, id: string, style: any, defaultStyle: any) => {
//   const defaultS = (tag === 'group') ? defaultStyle.groupStyle : defaultStyle.itemStyle;
//   const s = style[id] || {};
//   return Object.assign({}, defaultS, s);
// }
//
//
// const getCustomComponentValue = (id: string, serverObjData: any) => {
//   if (serverObjData[id]) {
//     return serverObjData[id].value ? serverObjData[id].value : serverObjData[id].properties ? serverObjData[id].properties : [];
//   } else {
//     return [];
//   }
// }
//
// /**
//  * @description 添加组件
//  * @param {string} type 插入方式  before、after
//  * @param {any} item 当前元素节点信息
//  * @param {array[any]} com 所有要添加的组件信息
//  * @param {json} parentJson xml元素父级数据
//  * @param {id:value} serverData 服务器数据
//  * @param {Object} formData form表单的缓存数据 平层的数据   {id:value,...}
//  * @param {any} style 自定样式  id:{样式对象}
//  * @param {any} defaultStyle 组件配置的默认样式  {groupStyle:{},itemStyle:{}}
//  * @param {any} backJson 缓存的地方
//  * */
// const addMyCom = (type: string, item: any, com: any, parentJson: any, serverData: any, formData: any, style: any, defaultStyle: any, backJson: any, dataFromServer: any) => {
//   if (!item) {
//     //目标元素未解析出
//     return;
//   }
//   const itemId = item.id;
//   const components = com[itemId] || [];
//
//   components.map((component: any) => {
//     const insertType = (component) ? (component.insertType || 'after') : '';
//     if (component && type === insertType) {
//       const key = component.serverKey || '';
//       const id = getId(parentJson, key);
//       const back: any = {
//         id: id,
//         tag: component.com,
//         key: key,
//         parent: parentJson,
//         props: component.props,
//         value: getCustomComponentValue(id, dataFromServer),
//         api: component.api,
//         style: createStyle('item', id, style, defaultStyle)
//       }
//       back.submitValue = back.value;
//       dataTransform(back);
//
//       if (id) {
//         formData[id] = {
//           id: id,
//           name: '',
//           unit: '',
//           value: back.submitValue,
//           obj: back
//         };
//       }
//
//       backJson.push(back);
//     }
//   })
// }
//
// /**
//  * @description xml中的单位解析
//  * @param {string} unit xml中的单位字符串
//  * */
// const getUnit = (unit: string) => {
//   //无单位
//   if (!unit) {
//     return {
//       showUnit: '', unitList: []
//     }
//   }
//
//   const unitTemp = unit.split(',');
//   const showUnit = unitTemp[0];
//   const unitDist: any = [];
//   let value = '';
//
//   //有选择的单位
//   if (unitTemp[1]) {
//     const temp = unitTemp[1].split('|');
//     temp.map((rs: string) => {
//       const temp1 = rs.split('-');
//       const name = temp1.splice(temp1.length - 1, 1)[0];
//       const val = temp1.join('-');
//       if (name === showUnit) {
//         value = val;
//       }
//       unitDist.push({
//         name, val
//       })
//     })
//   }
//
//   return {
//     showUnit,
//     unitList: unitDist,
//     value,
//     oldValue: value,
//     submitVal: value,
//     getSubmitRate() {
//       if (this.oldValue && this.submitVal && this.value) {
//         return parseFloat(this.value) / parseFloat(this.submitVal);
//       } else {
//         return 1;
//       }
//     },
//     getChangeRate() {
//       let rate = 1;
//       if (this.oldValue && this.submitVal && this.value) {
//         rate = parseFloat(this.oldValue) / parseFloat(this.value);
//         this.oldValue = this.value;
//       }
//       return rate;
//     }
//   }
// }
//
// /**
//  * @description 检查是否是repeat的子元素
//  * */
// const isRepeatChildren = (parentJson: any) => {
//   let isFind = false;
//   while (parentJson && !isFind) {
//     if (parentJson.tag === 'repeat') {
//       isFind = true;
//     } else {
//       parentJson = parentJson.parent;
//     }
//   }
//   return isFind;
// }
//
// /**
//  * @description 数据格式转换
//  * */
// const dataTransform = (data: any) => {
//   const tag = data.tag;
//   const getFileName = (fileName: string) => {
//     return fileName.substring(fileName.lastIndexOf('\/') + 1);
//   };
//   switch (tag) {
//     case 'date':
//     case 'time':
//     case 'dateTime':
//       data.value = (data.value) ? new Date(parseFloat(data.value)) : data.value;
//       break;
//     case 'img':
//       const list = (data.value) ? data.value.split(',') : [];
//       const back: any = [];
//       list.map((item: any) => {
//         back.push({
//           name: getFileName(item),
//           url: item,
//           response: item
//         })
//       })
//       data.value = back;
//       break;
//     default:
//       return;
//   }
// }
//
// /**
//  * @description 绑定文件上传函数
//  * */
// const createFileUploadFn = (data: any, fileUploadOpt: any) => {
//   if (!(data.tag === 'img' || data.tag === 'file')) {
//     return;
//   }
//
//   const uploadUrl = fileUploadOpt.url;
//   const param = fileUploadOpt.opt || {};
//
//   const api = Network.createApiFunction({
//     upLoadFile: {url: uploadUrl, type: 'post'}
//   })
//   const uploadFn = async (file: File) => {
//     return await api.upLoadFile
//       .requestUrl(uploadUrl)
//       .changeFileUploadType([])
//       .uploadFile(file, param);
//   };
//
//   data.uploadFn = uploadFn;
// }
//
// /**
//  * @description xml中元素转json对象
//  * @param {json} item xml元素数据
//  * @param {json} parentJson xml元素父级数据
//  * @param {id:value} serverData 服务器数据
//  * @param {id:value} rule 规则
//  * @param {Object} formData form表单的缓存数据 平层的数据   {id:value,...}
//  * @param {any} style 自定样式  id:{样式对象}
//  * @param {any} defaultStyle 组件配置的默认样式  {groupStyle:{},itemStyle:{}}
//  * @param {any} component xml中已定义的自定义组件字典对象
//  * */
// const reader = (item: any, parentJson: any, serverData: any, rule: any, formData: any, style: any, defaultStyle: any, component: any, fileUploadOpt: any, dataFromServer: any) => {
//   const attr = item.attributes || {};
//   const key = attr.name || attr.dataType;
//   const id = getId(parentJson, key);
//   const tag = getInputType(attr, item.name);
//   if (!tag) {
//     //未解析到tag
//     console.error('配置错误！')
//     console.error(item)
//     return null;
//   }
//
//   const unit = getUnit(attr.unit);
//   const isRepeatChild = isRepeatChildren(parentJson);
//
//
//   const back: any = {
//     id: id,
//     tag: tag,
//     txt: attr.discription,
//     key: key,
//     parent: parentJson,
//     errorMsg: '',
//     xml: item,
//     value: (isRepeatChild) ? attr.value : serverData[id] || attr.value,
//     rule: createRule(tag, attr.range, attr.dataType, rule[id], unit.showUnit),
//     style: createStyle(tag, id, style, defaultStyle),
//     unit: unit
//   }
//   back.submitValue = back.value;
//   dataTransform(back);
//   createFileUploadFn(back, fileUploadOpt);
//
//
//   //自定义组件
//   if (tag === '__customize__') {
//     const com = component[attr.dataType];
//     if (com) {
//       back.tag = com.com
//       back.props = com.props;
//       back.api = com.api;
//       back.value = getCustomComponentValue(id, dataFromServer);
//       back.submitValue = back.value;
//     } else {
//       back.tag = '';
//       console.error('component中参数未传入' + attr.dataType + '组件！')
//     }
//
//   }
//
//   if (parentJson && parentJson.tag === 'select') {
//     back.when = {
//       id: parentJson.id,
//       val: attr.index || 0
//     }
//   }
//
//
//   if (id && !isRepeatChild) {
//     formData[id] = {
//       id: id,
//       name: back.txt,
//       unit: unit.showUnit,
//       value: back.submitValue,
//       obj: back
//     };
//   }
//
//   if (tag === 'select') {
//     back.option = getSelectOption(attr.range);
//   }
//
//   if (tag === 'repeat') {
//     back.value = (back.submitValue) ? back.submitValue : 0;
//   }
//
//
//   if (item.elements && item.elements.length > 0) {
//     back.children = [];
//   }
//
//   return back;
// }
//
//
// export const addItem = (newItem: any, i: number, serverData: any, formData: any) => {
//   newItem.cloneItem.map((item: any) => {
//     const parent = item.parent;
//     delete item.parent;
//     //卡就递归把子集的parent属性也干掉
//     const cloneItem: any = cloneDeep(item);
//     cloneItem.parent = parent;
//
//     const thisId = cloneItem.id;
//     const temp = thisId.split('.');
//     const endKey = temp.splice(temp.length - 1, 1);
//     const newId = temp.join('.') + '.' + i + '.' + endKey[0];
//     cloneItem.id = newId;
//     cloneItem.value = serverData[newId] || cloneItem.value;
//     newItem.children.push(cloneItem);
//     formData[newId] = {
//       id: newId,
//       name: cloneItem.name,
//       unit: cloneItem.unit.showUnit,
//       value: cloneItem.value,
//       obj: cloneItem
//     };
//     //替换子元素的id及value
//     const fn = (data: any) => {
//       if (!data) {
//         return;
//       }
//       data.map((item: any) => {
//         if (item.when) {
//           const whenId = item.when.id.replace(thisId, newId);
//           item.when.id = whenId;
//         }
//
//         const itemId = item.id.replace(thisId, newId);
//         item.id = itemId;
//         item.value = serverData[itemId] || item.value;
//         formData[itemId] = {
//           id: itemId,
//           name: item.name,
//           unit: item.unit.showUnit,
//           value: item.value,
//           obj: item
//         };
//         fn(item.children)
//       })
//     }
//
//     fn(cloneItem.children)
//   })
// }
// /**
//  * @description 创建重复列表
//  * */
// const createRepeatChildren = (newItem: any, serverData: any, formData: any) => {
//   newItem.cloneItem = newItem.children;
//   newItem.children = [];
//
//   const repeat = parseFloat(newItem.value) || 0;
//
//   for (let i = 0, l = repeat; i < l; i++) {
//     addItem(newItem, i, serverData, formData);
//   }
// }
//
//
// /**
//  * @description xml转json
//  *
//  * */
// export default function (xml: string, com: any, style: any, rule: any, defaultStyle: any, serverData: any, component: any, fileUploadOpt: any, dataFromServer: any) {
//   if (!xml) {
//     //未传入xml
//     return {
//       backJson: {},
//       formData: {}
//     }
//   }
//
//   const backJson: any = {name: '', children: []};
//   const formData: any = {};
//   //xml去注释
//   xml = xml.replace(/<!--[\w\W\r\n]*?-->/gmi, '');
//   const backXmlWarp = xml.replace(/<PropertySet>[\s\S]*<\/PropertySet>/ig, '{{tempData}}');
//   let json: any = xml2js(xml);
//   json = json.elements || [];
//   json = json[0] || {};
//   const id = json.attributes.name;
//   json = json.elements;
//   //找到"PropertySet"
//   let jsonData: any = null;
//   json.map((rs: any) => {
//     if (rs.name === 'PropertySet') {
//       jsonData = rs.elements;
//     }
//   })
//
//   if (!jsonData) {
//     throw 'xml解析错误！';
//   }
//
//   backJson.name = id;
//
//   //遍历原始xml的json数据
//   const fn = (xmlJson: any, parentJson: any, backJson: any) => {
//     xmlJson.map((xmlItem: any) => {
//       const newItem = reader(xmlItem, parentJson, serverData, rule, formData, style, defaultStyle, component, fileUploadOpt, dataFromServer);
//
//       if (newItem) {
//         addMyCom('before', newItem, com, parentJson, serverData, formData, style, defaultStyle, backJson, dataFromServer);
//         backJson.push(newItem);
//         addMyCom('after', newItem, com, parentJson, serverData, formData, style, defaultStyle, backJson, dataFromServer);
//
//         if (newItem && xmlItem.elements && xmlItem.elements.length > 0) {
//           fn(xmlItem.elements, newItem, newItem.children);
//         }
//
//         //处理repeat的控件
//         if (newItem && newItem.tag === 'repeat') {
//           createRepeatChildren(newItem, serverData, formData);
//         }
//       }
//     })
//   }
//   fn(jsonData, null, backJson.children);
//
//
//   return {formData, backJson, backXmlWarp};
// }
//
//
//
