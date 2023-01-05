
const setting = [
  {
    type: 'text',
    label: 'test',
    key: 'a',
    value: 1,
    style: 'width:50%;',
    labelWidth: '60px',
    rule: 'required,max:group.z',
    disabled: true,
    placeholder: '',
    unit: 'mhz',
    unitOption: [{ value: '1', label: 'hz' }, { value: '1000', label: 'khz' }, { value: '1000000', label: 'mhz' }],
    // unitAutoChangeVal: false,
    ruleFn (val: any, formData: any) {
      return {
        pass: (parseFloat(val) > 0),
        msg: '未通过'
      }
    },
    changeFn (val: any, formObj: any, formData: any) {
      console.log(val, formObj, formData)
    }
  },
  {
    type: 'select',
    label: 'test',
    key: 'b',
    value: '1',
    when: 'a=1',
    style: 'width:50%;',
    labelWidth: '',
    disabled: '',
    placeholder: '',
    options: [{ label: 'a', value: '1' }, { label: 'b', value: '2' }],
    setupFn (obj: any) {
      obj.setParam({
        options: [{ label: 'aaaa', value: '1' }, { label: 'bbbb', value: '2' }]
      })
    }
  },

  {
    type: 'button',
    label: '按钮',
    style: 'margin-left:100px; width:100px;',
    buttonIcon: 'AddLocation',
    clickFn: (formObj: any, formData: any) => {
      console.log('button click')
      console.log(formObj, formData)
      formObj.find('a').setValue('2')
    }
  },
  {
    type: 'time',
    label: 'test',
    key: 'f',
    when: 'b=1',
    value: '1671862422033',
    style: 'width:100%;',
    labelWidth: ''
  },
  {
    type: 'group',
    key: 'g1',
    children: [
      {
        type: 'time',
        label: 'test',
        key: 'f1',
        value: '1671862422033',
        style: 'width:300px;',
        labelWidth: ''
      }
    ]
  },
  {
    type: 'addList',
    key: 'addList',
    pagination: true,
    height: 200,
    pageSize: 5,
    value: [],
    style: 'width:600px;',
    inputs: [
      {
        type: 'select',
        options: [{ label: 'a', value: '1' }, { label: 'b', value: '2' }],
        label: 'a',
        key: 'a',
        value: '1',
        style: 'width:33%;',
        labelWidth: ''
      },
      {
        type: 'text',
        label: 'b',
        key: 'b',
        value: '2',
        style: 'width:33%;',
        labelWidth: '',
        when: 'a=1'
      }
    ]
  },
  {
    type: 'repeat',
    label: 'test',
    key: 'repeat',
    style: 'width:100%;',
    repeatBy: 'a',
    children: [
      {
        type: 'color',
        label: 'color',
        when: 'repeat[row].d=1',
        key: 'c',
        value: '#ccc',
        style: '',
        labelWidth: ''
      },
      {
        type: 'text',
        label: 'rep1.d',
        key: 'd',
        value: '1',
        style: '',
        labelWidth: ''
      },
      {
        type: 'repeat',
        label: 'test',
        key: 'rep1',
        style: 'width:100%;',
        repeatBy: 'repeat[row].d',
        children: [
          {
            type: 'text',
            label: 'rep2.j',
            key: 'j',
            value: '1',
            style: 'width:100%;',
            labelWidth: ''
          },
          {
            type: 'text',
            label: 'rep2.k',
            when: 'repeat[row].rep1[row].j=1',
            rule: 'max:repeat[row].rep1[row].j',
            key: 'k',
            value: '',
            style: '',
            labelWidth: ''
          }
        ]
      }
    ]
  },

  // {
  //   type: 'dateTime',
  //   label: 'test',
  //   key: 'e',
  //   value: '1671862422033',
  //   style: '',
  //   labelWidth: ''
  // },
  // {
  //   type: 'time',
  //   label: 'test',
  //   key: 'f',
  //   value: '1671862422033',
  //   style: '',
  //   labelWidth: ''
  // },
  // {
  //   type: 'file',
  //   label: 'test',
  //   key: 'g',
  //   value: 'file://asf/1213_asdfasdf.txt',
  //   style: '',
  //   labelWidth: ''
  //   // async uploadFn () {
  //   //   return new Promise((resolve, reject) => {
  //   //     setTimeout(() => {
  //   //       resolve('file://adf/asdfadf_444.txt')
  //   //       // reject(new Error('222'))
  //   //     }, 1000)
  //   //   })
  //   // }
  // },
  // {
  //   type: 'password',
  //   label: 'test',
  //   key: 'i',
  //   value: 'fff',
  //   style: '',
  //   labelWidth: ''
  // },
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
  // {
  //   type: 'img',
  //   when: 'group.z=123',
  //   label: 'test',
  //   key: 'h',
  //   value: 'http://1.jpg,http://2.jpg',
  //   // showBigImageFn (url: string) {
  //   //   console.log(url)
  //   // },
  //   async uploadFn () {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve('http://3.jpg')
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
        label: 'grou',
        key: 'z',
        value: 'z',
        style: '',
        labelWidth: '',
        rule: 'number',
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
  // a: '1'
  // b: '2',
  // group: {
  //   z: '3'
  // }
}

export { setting, data }
