<template>
  <!--  <form-create/>-->
  <my-form :serverData="dataRef" :formSetting="settingRef"/>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component'
import { defineComponent, ref } from 'vue'
// import formCreate from './components/formCreate/index'
import myForm from './components/form/index'
import { data, setting } from './data'

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

    return {
      dataRef, settingRef
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
