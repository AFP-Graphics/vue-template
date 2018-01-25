import Vue from 'vue'
import VueRouter from 'vue-router'

import { i18n, loadLanguageAsync } from './i18n'

import LangSelector from '../components/LangSelector'
import Credits from '../components/Credits'
import TapStory from '../components/TapStory'

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

export default router