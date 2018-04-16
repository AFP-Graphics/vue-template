<template lang="html">
  <div
    v-if="isVisible"
    class="debug">
    <header>
      <h1>PROJECT SETTINGS</h1>
      <label for="hide">
        <span>hide</span><input
          v-model="hide"
          type="checkbox">
      </label>
    </header>
    <div class="redirects">
      <router-link
        v-for="locale in locales"
        :key="locale"
        :to="{ name: 'home', query: {lang: locale} }">
        {{ locale }}
      </router-link>
    </div>
  </div>
</template>

<script>
import messages from '@/i18n/messages'

export default {
  name: 'Debug',

  data () {
    return {
      hide: false
    }
  },

  computed: {
    isVisible () {
      return process.env.NODE_ENV !== 'production' && !this.hide
    },

    locales () {
      return Object.keys(messages).sort((a, b) => a.localeCompare(b))
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables";

.debug{
  font-family: $roboto_mono;
  border-top: 2px dashed black;
  border-bottom: 1px solid #c3cad2;
  background: #f2f4f6;
  padding: 14px;
  font-weight: 400;
  font-size: 13px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
      font-size: 15px;
      font-weight: inherit;
      font-family: inherit;
      margin-bottom: 7px;
    }
  }

  label{
    display: flex;
    align-items: center;

    input{
      margin: 0 7px;
    }
  }

  .redirects{
    margin: 5px 0 14px;
    text-transform: uppercase;
  }
}
</style>
