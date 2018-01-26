<template>
  <main>
    <h2>{{ $t('hello') }}</h2>
    <ul>
      <li v-for="lang in availableLanguages" :key="lang">
        <router-link :to="lang">{{ lang }}</router-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'lang-selector',
  computed: {
    availableLanguages () {
      return Object.keys(this.$i18n.messages)
    }
  }
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
