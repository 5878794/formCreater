type inputs = 'group' | 'input' | 'select' | 'radio' | 'password' | 'dateTime' | 'date' |
  'time' | 'color' | 'imgFile' | 'file' | 'repeat' | 'component' | null;

interface dragObjType {
  type: inputs,
  desc: string,
  icon?: string
}

export {
  inputs, dragObjType
}
