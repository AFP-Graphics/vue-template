<template>
  <main>
    <h1>{{ msg }}</h1>
    <p>{{ story }}</p>
  </main>
</template>

<script>
const stories = {
  'fr': import('../stories/fr.txt'),
  'en': import('../stories/en.txt')
}

export default {
  name: 'tap-story',
  props: ['lang'],
  data () {
    return {
      msg: 'Hello World 📦 🚀',
      stories: {}
    }
  },
  computed: {
    story () {
      return this.stories[this.lang]
    }
  },
  created () {
    this.loadStory()
  },
  watch: {
    'lang': 'loadStory'
  },
  methods: {
    async loadStory() {
      this.$set(this.stories, this.lang, await stories[this.lang])
    }
  }
}
</script>

<style lang="scss"></style>
