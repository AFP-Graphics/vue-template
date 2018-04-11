import Vue from 'vue'
import Router from 'vue-router'

import i18n from '@/i18n'
import Credits from '@/pages/Credits'
{{#if_eq mainComponent "basic"}}
// Define here your main component
import Home from '@/components/HelloWorld'
{{/if_eq}}
{{#if_eq mainComponent "tabstory"}}
import Home from '@/components/TabStory'
{{/if_eq}}
{{#if_eq mainComponent "modalgallery"}}
import Home from '@/components/ModalGallery'
{{/if_eq}}
{{#if_eq mainComponent "calculator"}}
import Home from '@/components/Calculator'
{{/if_eq}}
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/', redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/credits',
      name: 'credits',
      component: Credits
    }
  ]
})

// If ther is lang in url's query then use it, otherwise take the navigator's default one.
router.beforeEach((to, from, next) => {
  let locale
  if (to.query.lang !== undefined) {
    locale = to.query.lang
  } else {
    locale = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage)
    locale = locale.toLowerCase().substring(0, 2)
  }

  i18n.locale = locale
  next()
})

export default router
