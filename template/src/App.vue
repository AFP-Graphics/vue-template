<template>
  <div id="app">
    <header>
      <border />
    </header>
    <router-view />
    <footer>
      <router-link :to="`/${this.$i18n.locale}/credits`">
        <i
          v-if="$route.name !== 'credits'"
          class="UI-icon UI-info" />
      </router-link>
      <div class="source">
        <span v-if="$route.path !== '/'">
          {{ $t('source') }}
        </span>
      </div>
      <logo />
    </footer>
  </div>
</template>

<script>
// Utilities
import 'normalize.css'
import Pym from 'pym.js'

// Composants
import Border from '@/components/Border'
import Logo from '@/components/Logo'

export default {
  name: 'App',

  components: { Border, Logo },

  mounted () {
    new Pym.Child({ polling: 500 }) // eslint-disable-line no-new
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/main";
  @import "~@/assets/styles/variables";

  main, footer {
    padding: 12px 16px 18px 12px;
  }

  footer {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .source {
      font-size: $f12;
      flex: 1;
    }

    i:before {
      content:"\2139";
      color: black;
    }

    .UI-info {
      margin-right: 6px;
    }
  }
</style>
