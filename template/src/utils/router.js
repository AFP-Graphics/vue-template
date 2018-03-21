import Vue from 'vue'
import VueRouter from 'vue-router'

import { i18n, loadLanguageAsync } from '@/utils/i18n'

import LangSelector from '@/components/LangSelector'
import Credits from '@/components/Credits'

// Define here your main component
{{#if_eq mainComponent "basic"}}
const MainComponent = () => import('@/components/HelloWorld')
{{/if_eq}}
{{#if_eq mainComponent "tabstory"}}
const MainComponent = () => import('@/components/TabStory')
{{/if_eq}}
{{#if_eq mainComponent "modalgallery"}}
const MainComponent = () => import('@/components/ModalGallery')
{{/if_eq}}
{{#if_eq mainComponent "calculator"}}
const MainComponent = () => import('@/components/Calculator')
{{/if_eq}}

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: LangSelector
    },
    {
      path: '/:lang',
      component: MainComponent
    },
    {
      path: '/:lang/credits',
      component: Credits,
      name: 'credits'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || i18n.locale
  return loadLanguageAsync(lang)
    .then(() => next())
    .catch(err => {
      console.log(err) // eslint-disable-line no-console
      next({
        path: '/'
      })
    })
})

export default router
