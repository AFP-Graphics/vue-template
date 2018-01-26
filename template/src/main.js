// Utilitaires
import 'babel-polyfill'
import Vue from 'vue'
import '@/utils/googleAnalytics'
import store from '@/store'
import { i18n } from '@/utils/i18n'
import router from '@/utils/router'

// Composants
import App from '@/App'

import '@/assets/sass/main.scss'

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})

if (module.hot) {
  module.hot.accept()
}
