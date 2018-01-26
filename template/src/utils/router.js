import Vue from 'vue'
import VueRouter from 'vue-router'

import { i18n, loadLanguageAsync } from '@/utils/i18n'

import LangSelector from '@/components/LangSelector'
import Credits from '@/components/Credits'

const HelloWorld = () => import('@/components/HelloWorld')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: LangSelector
    },
    {
      path: '/:lang',
      component: HelloWorld
    },
    {
      path: '/:lang/credits',
      component: Credits
    },
  ]
})

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || i18n.locale
  return loadLanguageAsync(lang)
    .then(() => next())
    .catch(err => {
      console.log(err) //eslint-disable-line no-console
      next({
        path: '/'
      })
    })
})

export default router