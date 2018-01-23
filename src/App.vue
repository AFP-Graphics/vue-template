<template>
  <div>
    <header>
      <border />
    </header>
    <main>
      <h1>{{ msg }}</h1>
    </main>
    <footer>
      <logo />
    </footer>
  </div>
</template>

<script>
// Utilitaires
import Pym from 'pym.js'

// Styles
import './assets/sass/main.scss'

// Composants
import Border from './components/Border'
import Logo from './components/Logo'

export default {
  name: 'app',
  components: { Border, Logo },
  data () {
    return {
      msg: 'Hello World 📦 🚀'
    }
  },
  mounted () {
    new Pym.Child({ polling: 500 })
  }
}
</script>

<style lang="scss" scoped>
  main, footer {
    padding: 12px 16px 18px 12px;
  }
  footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
