import Vue from 'vue'
import i18n from '@/i18n'
import router from '@/router'
// import store from '@/store'
import '@/utils/googleAnalytics'
import Modernizr from 'modernizr'

import App from '@/App'

window.Modernizr = Modernizr

new Vue({ // eslint-disable-line no-new
  router,
  i18n,
  // store,
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}
