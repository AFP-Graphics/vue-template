<template>
  <main>
    <h1>{{ $t('credits') }}</h1>
    <p>
      {{ $t('updateText') }}
       {{ $d(new Date($t('update')), 'short') }}
    </p>
    <article v-if="Array.isArray(authors)">
      <ul class="no-bullets">
        <li v-for="author in authors" :key="author.name">
          <strong>{{ author.role }}</strong>
           <a v-if="author.twitter" :href="`https://twitter.com/${author.twitter}`">
            {{ author.name }}
          </a>
          <span v-else>{{ author.name }}</span>
        </li>
      </ul>
    </article>
    <article v-else-if="typeof authors === 'object'">
      <section v-for="[key, roleAuthors] in Object.entries(authors)" :key="key">
        <h3>{{ key }}</h3>
        <ul class="no-bullets">
          <li v-for="author in roleAuthors" :key="author.name">
            <a v-if="author.twitter" :href="`https://twitter.com/${author.twitter}`">
              {{ author.name }}
            </a>
            <span v-else>{{ author.name }}</span>
          </li>
        </ul>
      </section>
    </article>
    <p>
      <a @click="$router.go(-1)" href="#">{{ $t('back') }}</a>
    </p>
  </main>
</template>

<script>
export default {
  name: 'lang-selector',
  computed: {
    authors () {
      return this.$t('authors')
    }
  }
}
</script>

<style lang="scss" scoped></style>
