<template>
  <main>
    <h1>{{ msg }}</h1>
  </main>
</template>

<script>
export default {
  name: 'tap-story',
  props: ['lang'],
  data () {
    return {
      msg: 'Hello World 📦 🚀'
    }
  }
}
</script>

<style lang="scss"></style>
