<template>
  <main>
    <h1>{{ $t('credits') }}</h1>
    <p>
      {{ $t('updateText') }}
      {{ $d(new Date($t('update')), 'short') }}
    </p>
    <article v-if="Array.isArray(authors)">
      <ul class="no-bullets">
        <li
          v-for="role in authorsByRole"
          :key="role.key">
          <strong>{{ role.key }}</strong> :
          <span
            v-for="(author,i) in role.values"
            :key="author.name">
            <a
              v-if="author.twitter"
              :href="`https://twitter.com/${author.twitter}`"
              target="_blank">
              {{ author.name }}
            </a>
            <span v-else>{{ author.name }}</span>
            {{ '' | addComma(i, role.values.length) }}
          </span>
        </li>
      </ul>
    </article>
    <p>
      <a
        href="#"
        @click="$router.go(-1)">{{ $t('back') }}</a>
    </p>
  </main>
</template>

<script>
import { nest } from 'd3-collection'

export default {
  name: 'Credits',
  filters: {
    addComma (name, i, length) {
      if (length > 0 && i < length - 1) {
        return name + ', '
      }
      return name
    }
  },
  computed: {
    authors () {
      return this.$t('authors')
    },
    authorsByRole () {
      return nest()
        .key(d => d.role)
        .entries(this.authors)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/variables";
  .title {
    font-weight: bold;
    font-size: $f16;
    margin-bottom: 2px;
  }
</style>
