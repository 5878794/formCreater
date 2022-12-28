const setting = [
  {
    type: 'text',
    label: 'test',
    key: 'a',
    value: 22,
    style: 'width:410px;',
    labelWidth: '',
    rule: 'required,max:100,max:group.z',
    disabled: '',
    placeholder: '',
    unit: 'mhz',
    unitOption: [{ value: '1', label: 'hz' }, { value: '1000', label: 'khz' }, { value: '1000000', label: 'mhz' }],
    // unitAutoChangeVal: false,
    ruleFn (val: any, formData: any) {
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
    when: 'b=1',
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
    labelWidth: ''
    // async uploadFn () {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('file://adf/asdfadf_444.txt')
    //       // reject(new Error('222'))
    //     }, 1000)
    //   })
    // }
  },
  {
    type: 'password',
    label: 'test',
    key: 'i',
    value: 'fff',
    style: '',
    labelWidth: ''
  },
  {
    type: 'radio',
    label: 'test',
    key: 'j',
    value: '1',
    options: [{
      label: 'aa',
      value: '0'
    }, {
      label: 'bb',
      value: '1'
    }]
  },
  {
    type: 'img',
    when: 'group.z=123',
    label: 'test',
    key: 'h',
    value: 'http://1.jpg,http://2.jpg',
    // showBigImageFn (url: string) {
    //   console.log(url)
    // },
    async uploadFn () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('http://3.jpg')
          // reject(new Error('222'))
        }, 1000)
      })
    }
  },
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
      },
      {
        type: 'time',
        label: 'test',
        key: 'f',
        value: '1671862422033',
        style: '',
        labelWidth: ''
      }
    ]
  }
]

const data = {
  a: '1',
  // b: '2',
  group: {
    z: '3'
  }
}

export { setting, data }
