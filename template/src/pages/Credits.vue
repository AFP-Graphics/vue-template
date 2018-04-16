<template>
  <main class="credits">
    <h1>{{ $t('credits') }}</h1>
    <article v-if="Array.isArray(authors)">
      <ul class="no-bullets">
        <li
          v-for="role in authorsByRole"
          :key="role.key">
          <strong>{{ $t(role.key) }}</strong>
          <span
            v-for="(author,i) in role.values"
            :key="author.name">
            <a
              v-if="author.twitter"
              :href="`https://twitter.com/${author.twitter}`"
              target="_blank">
              {{ author.name }}
            </a>
            <span v-else>{{ author.name }}</span>{{ '' | addComma(i, role.values.length) }}
          </span>
        </li>
      </ul>
    </article>
    <p>
      <em>{{ $t('last_update') }}</em>
      {{ $d(new Date($t('update')), 'short') }}
    </p>
  </main>
</template>

<script>
import { nest } from 'd3-collection'

export default {
  name: 'Credits',

  filters: {
    addComma (name, i, length) {
      return length > 0 && i < length - 1 ? `${name}, ` : name
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
        .filter(d => d.values[0].name !== '')
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/styles/variables";

  .credits{
    line-height: 1.15em;

    h1{
      margin: 0 0 16px; font-size: $f18; font-weight: 600;
      &:first-letter{ text-transform: uppercase;}
    }
    li{ margin: 13px 0; }
    strong{ margin: 0 5px 0 0; font-size: 15px; font-weight: 600; letter-spacing: -0.015em; }
    p{ color: $grey_cold_6; margin: 22px 0 0; font-size: 12px; line-height: 1.15em; }
    em{ font-style: italic; }
  }
</style>
