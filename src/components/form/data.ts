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
    unitOption: [{ value: '1', label: 'hz' }, { value: '1000', label: 'khz' }, { value: '1000000', label: 'mhz' }]
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
    option: []
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
