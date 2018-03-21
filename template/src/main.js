// Utilitaires
import Vue from 'vue'
import '@/utils/googleAnalytics'
// import store from '@/store'
import { i18n } from '@/utils/i18n'
import router from '@/utils/router'

// Composants
import App from '@/App'

import '@/assets/sass/main.scss'

new Vue({ // eslint-disable-line no-new
  router,
  i18n,
  // store,
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}
