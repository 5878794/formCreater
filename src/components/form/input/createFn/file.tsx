// import xmlStyle from "../styles/css.module.scss";
// import {ElInput, ElUpload, ElButton} from "element-plus";
// import {System} from "@zx-pack/system";
//
// const uploadBtnText = '上传';
// const getFileName = (fileName: string) => {
//   fileName = decodeURIComponent(fileName);
//   //取后缀名
//   const ext = fileName.substring(fileName.lastIndexOf('.'));
//   //去掉服务器添加的随机字符串
//   const fileNames = fileName.split('_');
//   fileNames.splice(fileNames.length - 1);
//   fileName = fileNames.join('_') + ext;
//   //取文件名
//   return fileName.substring(fileName.lastIndexOf('\/') + 1);
// };
//
// export default function (prop: any, checkFiled: any, formData: any, canMdf: boolean) {
//   const uploadRun = async (e: any) => {
//     prop.fileUploading = true;
//     const file = e.file;
//     const src = await prop.uploadFn(file).catch((e: any) => {
//       System.info('上传文件失败！', 'error');
//       prop.fileUploading = false;
//     });
//     if (src) {
//       prop.value = getFileName(src);
//       prop.submitValue = src;
//       prop.fileUploading = false;
//       checkFiled();
//     }
//   };
//   const checkFileType = () => {
//     return true;
//   };
//
//   const createButton = () => {
//     if (prop.disabled) {
//       return null;
//     } else {
//       return <el-button size="default" type="primary" loading={prop.fileUploading}>{uploadBtnText}</el-button>
//     }
//   }
//
//   const createInput = () => {
//     return (
//       <>
//         <el-input
//           v-model={prop.value}
//           class={xmlStyle.xm2_grid_input}
//           disabled={true}
//           placeholder={prop.placeholder}
//         ></el-input>
//         <el-upload
//           class={xmlStyle.button}
//           disabled={prop.disabled}
//           action="#"
//           limit={999}
//           show-file-list={false}
//           // accept={prop.acceptType}
//           http-request={uploadRun}
//           before-upload={checkFileType}
//         >
//           {createButton()}
//         </el-upload>
//       </>
//     )
//   }
//
//   const createDiv = () => {
//     return <div class={['notMdf', xmlStyle.notMdf]}>{prop.value}</div>
//   }
//
//   return <>
//     {canMdf && createInput()}
//     {!canMdf && createDiv()}
//   </>
// }
