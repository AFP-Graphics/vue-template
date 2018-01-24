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
// Utilities
import Vue from 'vue'
import VueRouter from 'vue-router'
import Pym from 'pym.js'
import VueAnalytics from 'vue-analytics'

// Composants
import Border from './components/Border'
import Logo from './components/Logo'
import LangSelector from './components/LangSelector'

// Story composants
import TapStory from './components/TapStory'

// Configuration
import { availableLanguages } from './config.json'

const router = new VueRouter({
  routes: [
    { 
      path: '/',
      component: LangSelector, 
      props: { availableLanguages }
    },
    { 
      path: '/:lang', 
      component: TapStory, // Define here the main story composant
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
const lang = to.params.lang
if (lang) {
  // Check if language is available
  if (availableLanguages.indexOf(lang) === -1) {
    return next({
      path: '/'
    })
  }
}
next()
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