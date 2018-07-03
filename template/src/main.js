import Vue from 'vue'
import i18n from '@/i18n'
import router from '@/router'
// import store from '@/store'
import VueAnalytics from 'vue-analytics'
import Modernizr from 'modernizr'

import App from '@/App'

window.Modernizr = Modernizr

const isProd = process.env.NODE_ENV === 'production'

Vue.use(VueAnalytics, {
  id: 'UA-64253904-2',
  router,
  autoTracking: {
    exception: true,
    pageviewOnLoad: true,
    pageviewTemplate (route) {
      return {
        page: `${window.location.pathname}${route.name}`,
        title: document.title,
        location: window.location.href
      }
    }
  },
  set: [
    { field: 'anonymizeIp', value: true },
    { field: 'forceSSL', value: true }
  ],
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
})

new Vue({ // eslint-disable-line no-new
  router,
  i18n,
  // store,
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}
