import { inputCacheType } from '../input.type'
import inputStyle from '../css/inputStyle.module.scss'
import { ElInput, ElUpload, ElButton } from 'element-plus'

const uploadBtnText = '上传'
export default function (cache: inputCacheType, checkFiled: any) {
  const tag = ElInput
  const uploadRun = async (e:any) => {
    cache.param!.isUploading = true
    const file = e.file
    const src = await cache.param!.uploadFn(file).catch((e:any) => {
      return ''
    })
    cache.param!.isUploading = false
    if (src) {
      cache.valObj.value = src
      checkFiled()
    }
  }
  const checkFileType = () => {
    return true
  }
  const createButton = () => {
    if (cache.param!.disabled) {
      return null
    } else {
      return <ElButton size="default" type="primary" loading={cache.param!.isUploading}>{uploadBtnText}</ElButton>
    }
  }
  return <>
        <ElInput
            v-model={cache.valObj.showValue}
            class={[inputStyle.file_input, 'file_input']}
            disabled={true}
            placeholder={cache.param!.placeholder}
        ></ElInput>
        <ElUpload
            class={inputStyle.button}
            disabled={cache.param!.disabled}
            action="#"
            limit={999}
            show-file-list={false}
            // accept={prop.acceptType}
            http-request={uploadRun}
            before-upload={checkFileType}
        >
            {createButton()}
        </ElUpload>
    </>

  // <tag
  //     onblur={function () {
  //       checkFiled()
  //     }}
  //     v-model={cache.valObj.value}
  //     class={[inputStyle.input]}
  //     disabled={cache.param!.disabled}
  //     placeholder={cache.param!.placeholder}
  // ></tag>
}
