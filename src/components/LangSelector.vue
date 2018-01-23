<template>
  <main>
    <h1>Please choose a language</h1>
    <ul>
      <li v-for="lang in availableLanguages">
        <router-link :to="lang">{{ lang }}</router-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'lang-selector',
  props: ['availableLanguages']
}
</script>

<style lang="scss" scoped>
  ul {
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-content: space-around;
  }
</style>
