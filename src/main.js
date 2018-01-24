// Utilitaires
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './utils/googleAnalytics'
import { i18n, loadedLocales, loadLanguageAsync } from './utils/i18n'

// Composants
import App from './App.vue'
import LangSelector from './components/LangSelector'
import Credits from './components/Credits'
import TapStory from './components/TapStory'

// Styles
import './assets/sass/main.scss'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { 
      path: '/',
      component: LangSelector
    },
    {
      path: '/credits',
      component: Credits
    },
    { 
      path: '/:lang', 
      component: TapStory
    }
  ]
})

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || i18n.locale
  return loadLanguageAsync(lang)
    .then(lang => {
      next()
    })
    .catch(err => {
      next({
        path: '/'
      })
    })
})

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})

if (module.hot) {
  module.hot.accept()
}
