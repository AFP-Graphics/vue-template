import Vue from 'vue'
import App from './App.vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-64253904-2'
})

new Vue({
  el: '#app',
  render: h => h(App)
})

if (module.hot) {
  module.hot.accept()
}
