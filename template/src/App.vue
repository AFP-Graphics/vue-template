<template>
  <section
    id="app"
    :class="$i18n.locale">
    <afp-header/>

    <main>
      <transition
        name="fade-in"
        mode="out-in">
        <router-view :key="$route.name"/>
      </transition>
    </main>

    <afp-footer/>
  </section>
</template>

<script>
// Utilities
import 'normalize.css'
import Pym from 'pym.js'

// Components
import AfpHeader from '@/pages/layout/AfpHeader'
import AfpFooter from '@/pages/layout/AfpFooter'

export default {
  name: 'App',

  components: { AfpHeader, AfpFooter },

  mounted () {
    new Pym.Child({ polling: 500 }) // eslint-disable-line no-new
  }
}
</script>

<style lang="scss">
  @import "~@/assets/styles/main";

  #app{
    max-width: 990px;
    margin: 0 auto;

    > main, .afp-footer { @extend %main-padding; }
  }
</style>
