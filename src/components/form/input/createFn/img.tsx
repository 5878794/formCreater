// import {ElUpload, UploadFile} from 'element-plus';
// import xmlStyle from "../styles/css.module.scss";
// import {System} from "@zx-pack/system";
//
//
// export default function (prop: any, checkFiled: any, formData: any, canMdf: boolean) {
//   const handlePictureCardPreview = (file: UploadFile) => {
//     const url = file.url;
//     System.openImage(url!.toString());
//   }
//   const uploadRun = async (e: any) => {
//     const file = e.file;
//     const src = await prop.uploadFn(file).catch((e: any) => {
//       System.info('上传文件失败！', 'error');
//     });
//     return src;
//   }
//   const uploadOk = (src: any, obj: any) => {
//     //上传失败处理
//     if (!src) {
//       const n = prop.value.indexOf(obj);
//       prop.value.splice(n, 1);
//     }
//
//     const back: any = [];
//     prop.value.map((item: any) => {
//       back.push(item.response)
//     })
//     prop.submitValue = back.join(',');
//   }
//
//   const handleRemove = (obj: any, list: any) => {
//     const back: any = [];
//     list.map((item: any) => {
//       back.push(item.response)
//     })
//     prop.submitValue = back.join(',');
//     checkFiled();
//   }
//
//   const checkFileType = () => {
//     return true;
//   }
//
//   const notMdfClass = (!canMdf) ? xmlStyle.imgNotMdfClass : '';
//   return (
//     <el-upload
//       onChange={checkFiled}
//       class={[xmlStyle.xm2_grid_input, notMdfClass]}
//       disabled={prop.disabled || !canMdf}
//       on-preview={handlePictureCardPreview}
//       action="#"
//       limit={prop.limit || 10}
//       accept={prop.acceptType}
//       http-request={uploadRun}
//       before-upload={checkFileType}
//       file-list={prop.value}
//       show-file-list={true}
//       list-type="picture-card"
//       on-success={uploadOk}
//       on-remove={handleRemove}
//     >
//     </el-upload>
//   )
// }
