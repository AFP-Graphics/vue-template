<template>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Pym from 'pym.js'
import './assets/sass/main.scss'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello World 📦 🚀'
    }
  },
  mounted () {
    new Pym.Child({ polling: 500 })
  }
}
</script>

<style lang="scss" scoped></style>
