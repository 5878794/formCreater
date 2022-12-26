<template>
  <!--  <form-create/>-->
  <my-form ref="test" :serverData="dataRef" :formSetting="settingRef" @change="changeFn"/>
<!--  <b-input :propData="tempData"></b-input>-->
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

// export default class App extends Vue {
// }
export default defineComponent({
  components: { myForm },
  setup () {
    const dataRef = ref<any>({})
    const settingRef = ref<any>([JSON.parse(JSON.stringify(setting[0]))])

    setTimeout(() => {
      settingRef.value = setting
    }, 2000)

    setTimeout(() => {
      dataRef.value = data
    }, 4000)

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

      const bb = test.value as any
      bb.find('b').setParam({
        options: [{ label: 'aaa', value: '111' }, { label: 'bbb', value: '222' }]
      })
    }

    const test = ref(null)
    return {
      dataRef, settingRef, tempData, changeFn, test
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
