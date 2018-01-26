<template>
  <div id="app">
    <header>
      <border />
    </header>
    <router-view></router-view>
    <footer>
      <router-link :to="`/${this.$i18n.locale}/credits`">
        <i class="UI-icon UI-info"></i>
      </router-link>
      <logo />
    </footer>
  </div>
</template>

<script>
// Utilities
import Pym from 'pym.js'

// Composants
import Border from '@/components/Border'
import Logo from '@/components/Logo'

export default {
  name: 'app',
  components: { Border, Logo },
  mounted () {
    new Pym.Child({ polling: 500 }) //eslint-disable-line no-new
  }
}
</script>

<style lang="scss" scoped>
  main, footer {
    padding: 12px 16px 18px 12px;
  }

  footer {
    display: flex;
    justify-content: space-between;

    i:before {
      content:"\2139";
      color: black;
    }
  }
</style>