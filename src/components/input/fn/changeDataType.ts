
export default function (type:string) {
  switch (type) {
    case 'date':
      return (val:any) => {
        if (!(val instanceof Date)) {
          if (!isNaN(val)) {
            return new Date(parseInt(val))
          } else {
            return new Date(val)
          }
        }
      }
    default:
      return (val:any) => {
        return val
      }
  }
}
