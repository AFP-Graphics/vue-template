import Vue from 'vue'
import i18n from '@/i18n'
import router from '@/router'
// import store from '@/store'
import '@/utils/googleAnalytics'

import App from '@/App'

new Vue({ // eslint-disable-line no-new
  router,
  i18n,
  // store,
  render: h => h(App)
}).$mount('#vue-app')

if (module.hot) {
  module.hot.accept()
}
