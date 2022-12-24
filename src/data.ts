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
    type: 'group',
    label: 'group',
    key: 'group',
    style: 'width:100%;border:1px solid #ccc; padding:10px;',
    children: [
      {
        type: 'text',
        label: 'test',
        key: 'a',
        value: 'a',
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
  }
}

export { setting, data }
