const setting = [
  {
    type: 'text',
    label: 'test',
    key: 'a',
    value: 'a',
    style: 'width:410px;',
    labelWidth: '',
    disabled: '',
    placeholder: '',
    unit: 'mhz',
    unitOption: [{ value: '1', label: 'hz' }, { value: '1000', label: 'khz' }, { value: '1000000', label: 'mhz' }],
    unitAutoChangeVal: false,
    ruleFn (val: any, formData: any) {
      console.log('check fn')
      console.log(val, formData)

      return {
        pass: (parseFloat(val) > 10),
        msg: '未通过'
      }
    }
  },
  {
    type: 'select',
    label: 'test',
    key: 'b',
    value: 'b',
    style: '',
    labelWidth: '',
    disabled: '',
    placeholder: '',
    options: [{ label: 'a', value: '1' }, { label: 'b', value: '2' }]
  },
  {
    type: 'color',
    label: 'test',
    key: 'c',
    value: '#ccc',
    style: '',
    labelWidth: ''
  },
  {
    type: 'date',
    label: 'test',
    key: 'd',
    value: '1671862422033',
    style: '',
    labelWidth: ''
  },
  {
    type: 'dateTime',
    label: 'test',
    key: 'e',
    value: '1671862422033',
    style: '',
    labelWidth: ''
  },
  {
    type: 'time',
    label: 'test',
    key: 'f',
    value: '1671862422033',
    style: '',
    labelWidth: ''
  },
  {
    type: 'file',
    label: 'test',
    key: 'g',
    value: 'file://asf/1213_asdfasdf.txt',
    style: '',
    labelWidth: '',
    async uploadFn () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('file://adf/asdfadf_444.txt')
          // reject(new Error('222'))
        }, 1000)
      })
    }
  },
  {
    type: 'password',
    label: 'test',
    key: 'i',
    value: 'fff',
    style: '',
    labelWidth: ''
  },
  // {
  //   type: 'img',
  //   label: 'test',
  //   key: 'h',
  //   value: '',
  //   showBigImageFn (url: string) {
  //     console.log(url)
  //   },
  //   async uploadFn () {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve('file://adf/asdfadf_444.jpg')
  //         // reject(new Error('222'))
  //       }, 1000)
  //     })
  //   }
  // },
  {
    type: 'group',
    label: 'group',
    key: 'group',
    style: 'width:100%;border:1px solid #ccc; padding:10px;',
    children: [
      {
        type: 'text',
        label: 'test',
        key: 'z',
        value: 'z',
        style: '',
        labelWidth: '',
        disabled: '',
        placeholder: '',
        unit: 'km',
        unitOption: []
      }
    ]
  }
]

const data = {
  a: '1',
  b: '',
  group: {
    a: '2'
  },
  h: 'http://www.baidu.com/aa.jpg,http://www.baidu.com/bb.jpg'
}

export { setting, data }
