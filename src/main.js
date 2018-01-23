// Utilitaires
import Vue from 'vue'

// Composants
import App from './App.vue'

// Styles
import './assets/sass/main.scss'

new Vue({
  el: '#app',
  render: h => h(App)
})

if (module.hot) {
  module.hot.accept()
}
