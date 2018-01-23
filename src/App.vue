<template>
  <div>
    <header>
      <border />
    </header>
    <router-view></router-view>
    <footer>
      <logo />
    </footer>
  </div>
</template>

<script>
// Utilitaires
import Vue from 'vue'
import VueRouter from 'vue-router'
import Pym from 'pym.js'
import VueAnalytics from 'vue-analytics'

// Composants
import Border from './components/Border'
import Logo from './components/Logo'
import LangSelector from './components/LangSelector'
import TapStory from './components/TapStory'

const router = new VueRouter({
  routes: [
    { 
      path: '/',
      component: LangSelector, 
      props: { 
        availableLanguages: ['fr', 'en', 'es', 'de', 'pt', 'ar']
        }
      },
    { 
      path: '/:lang', 
      component: TapStory, 
      props: true
    }
  ]
})

Vue.use(VueRouter)

Vue.use(VueAnalytics, {
  id: 'UA-64253904-2'
})

export default {
  name: 'app',
  router,
  components: { Border, Logo },
  mounted () {
    new Pym.Child({ polling: 500 })
  }
}
</script>

<style lang="scss">
  main, footer {
    padding: 12px 16px 18px 12px;
  }

  footer {
    display: flex;
    justify-content: flex-end;
  }
</style>