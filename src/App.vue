<template>
  <!--  <form-create/>-->
  <my-form ref="test" :serverData="dataRef" :formSetting="settingRef" @change="changeFn"/>
  <!--  <b-input :propData="tempData"></b-input>-->
  <button @click="change1">change</button>
  <button @click="getData1">getData</button>
  <button @click="checkForm1">checkFrom</button>
  <button @click="checkAndGetData1">checkAndGetData</button>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component'
import { defineComponent, ref } from 'vue'
// import formCreate from './components/formCreate/index'
import myForm from './components/form/index'
import { data, setting } from './data'
import bInput from './components/input/index'

// @Options({
//   components: {
//     myForm
//   }
// })

// TODO 全局函数注入
// TODO rule 简写规则

// export default class App extends Vue {
// }
export default defineComponent({
  components: { myForm },
  setup () {
    const dataRef = ref<any>({})
    const settingRef = ref<any>([JSON.parse(JSON.stringify(setting[0]))])

    setTimeout(() => {
      dataRef.value = data
    }, 4000)
    setTimeout(() => {
      settingRef.value = setting
    }, 2000)

    const tempData = {
      type: 'text',
      label: 'test',
      key: 'a',
      value: 'a',
      style: 'width:410px;',
      labelWidth: '',
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
    }

    const changeFn = (obj: any) => {
      console.log(`form Change id:${obj.id} ======================`)
      console.log(obj.formData)
    }

    const change1 = () => {
      const bb = test.value as any
      bb.find('b').setParam({
        options: [{ label: 'aaa', value: '1' }, { label: 'bbb', value: '2' }]
      })
      bb.find('b').setValue('1')
      bb.find('group').find('z').setValue('asdfasdf.jpg,1.jpg,2.jpg')
    }
    const getData1 = () => {
      const bb = test.value as any
      const data = bb.getData()
      console.log(data)
    }
    const checkForm1 = () => {
      const bb = test.value as any
      bb.checkForm()
    }
    const checkAndGetData1 = () => {
      const bb = test.value as any
      const data = bb.checkAndGetData()
      console.log(data)
    }

    const test = ref(null)
    return {
      dataRef,
      settingRef,
      tempData,
      changeFn,
      test,
      change1,
      getData1,
      checkForm1,
      checkAndGetData1
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:global(#app) {
  width: 100vw;
  height: 100vh;
}
</style>
