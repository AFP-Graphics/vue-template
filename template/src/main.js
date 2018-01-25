// Utilitaires
import 'babel-polyfill'
import Vue from 'vue'
import '@/utils/googleAnalytics'
import { i18n } from '@/utils/i18n'
import router from '@/utils/router'

// Composants
import App from '@/App.vue'

import '@/assets/sass/main.scss'

new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

if (module.hot) {
  module.hot.accept()
}
