
// 处理传入数据的格式
export default function (type:string) {
  switch (type) {
    case 'date':
    case 'dateTime':
    case 'time':
      return (val:any) => {
        if (!(val instanceof Date)) {
          if (!isNaN(val)) {
            return new Date(parseInt(val))
          } else {
            return new Date(val)
          }
        } else {
          return val
        }
      }
    default:
      return (val:any) => {
        return val
      }
  }
}