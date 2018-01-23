import Vue from 'vue/dist/vue'

new Vue({
  el: '#app',
  data () {
    return {
      text: 'Hello World 📦 🚀'
    }
  }
})

if (module.hot) {
  module.hot.accept()
}
