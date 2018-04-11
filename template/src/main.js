// Utilitaires
import Vue from 'vue'
// import store from '@/store'
import i18n from '@/i18n'
import router from '@/router'
import '@/utils/googleAnalytics'

// Composants
import App from '@/App'

new Vue({ // eslint-disable-line no-new
  router,
  i18n,
  // store,
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}
