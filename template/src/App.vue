<template>
  <section
    id="app"
    :class="$i18n.locale">
    <afp-header/>
    <div
      v-if="supportAllFeatures === false"
      id="browser-warning">
      <h1>{{ $t('not-compatible') }}</h1>
      <p>{{ $t('update-browser') }}</p>
      <button @click="supportAllFeatures = true">{{ $t('continue-anyway') }}</button>
    </div>

    <transition
      name="fade-in"
      mode="out-in">
      <router-view :key="$route.name"/>
    </transition>

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

  data: () => {
    return {
      supportAllFeatures: Object.values(window.Modernizr).every(d => d)
    }
  },

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

  #browser-warning {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
  }
</style>
