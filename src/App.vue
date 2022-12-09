<template>
  <form-create/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import formCreate from './components/formCreate/index'

@Options({
  components: {
    formCreate
  }
})
export default class App extends Vue {
}
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
