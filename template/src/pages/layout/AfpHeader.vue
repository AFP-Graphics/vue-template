<template lang="html">
  <header>
    <debug/>
    <hr>
  </header>
</template>

<script>
import Debug from '@/pages/layout/Debug'

export default {
  name: 'AfpHeader',

  components: { Debug }
}
</script>

<style lang="scss" scoped>
hr {
  height: 4px;
  border: none;
  background: black;
  margin: 0;
  padding: 0;
}
</style>
