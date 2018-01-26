<template>
  <main>
    <h2>{{ $t('credits') }}</h2>
    {{ $t('updateText') }} {{ $d(new Date($t('update')), 'short') }}
    <article v-for="role in roles" :key="role">
      <h3>{{ role }}</h3>
      <ul>
        <li v-for="author in authors" :key="author.name" v-if="author.role === role">
          <a v-if="author.twitter" :href="`https://twitter.com/${author.twitter}`">
        {{ author.name }}
          </a>
          <span v-else>{{ author.name }}</span>
        </li>
      </ul>
    </article>
    <a @click="$router.go(-1)" href="#">{{ $t('back') }}</a>
  </main>
</template>

<script>
export default {
  name: 'lang-selector',
  computed: {
    availableLanguages () {
      return Object.keys(this.$i18n.messages)
    },
    authors () {
      return this.$t('authors')
    },
    roles () {
      return [...new Set(this.$t('authors').map(d => d.role))]
    }
  }
}
</script>

<style lang="scss" scoped></style>
