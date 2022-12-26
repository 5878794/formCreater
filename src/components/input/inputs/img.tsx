import { inputCacheType } from '../input.type'
import inputStyle from '../css/inputStyle.module.scss'
import { ElUpload, UploadFile, ElDialog } from 'element-plus'

export default function (cache: inputCacheType, checkFiled: any) {
  // 点击查看图片
  const handlePictureCardPreview = (file: UploadFile) => {
    const url = file.url!.toString()

    if (!cache.param!.showBigImageFn) {
      console.error('未配置 showBigImageFn')
      return
    }

    cache.param!.showBigImageFn(url)
  }
  // 图片上传
  const uploadRun = async (e: any) => {
    const file = e.file
    if (!cache.param?.uploadFn) {
      console.error(cache.param?.__keyLv__ + ' 未配置上传函数uploadFn！！')
      return
    }
    cache.param!.isUploading = true
    const src = await cache.param!.uploadFn(file).catch((e: any) => {
      return ''
    })
    cache.param!.isUploading = false

    return src
  }
  // 上传成功
  const uploadOk = (src: any, obj: any) => {
    // 上传失败处理
    if (!src) {
      const n = cache.valObj.showValue.indexOf(obj)
      cache.valObj.showValue.splice(n, 1)
      return
    }

    refreshData()
  }

  // 刷新数据
  const refreshData = () => {
    const back: any = []
    cache.valObj.showValue.map((item: any) => {
      back.push(item.response || item.url)
      return ''
    })

    cache.valObj.value = back.join(',')
    checkFiled()
  }

  const handleRemove = (obj: any, list: any) => {
    const back: any = []
    list.map((item: any) => {
      back.push(item.response)
      return ''
    })
    refreshData()
  }

  const checkFileType = () => {
    return true
  }

  const tag = ElUpload
  return <>
    <tag
      onChange={checkFiled}
      class={[inputStyle.img_wall]}
      disabled={cache.param!.disabled}
      on-preview={handlePictureCardPreview}
      action="#"
      limit={cache.param?.limit || 10}
      accept='image/*'
      http-request={uploadRun}
      before-upload={checkFileType}
      v-model:file-list={cache.valObj.showValue}
      show-file-list={true}
      list-type="picture-card"
      on-success={uploadOk}
      on-remove={handleRemove}
    >
    </tag>
  </>
}
