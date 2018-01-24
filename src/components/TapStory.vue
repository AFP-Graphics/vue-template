<template>
  <main>
    <h1>{{ msg }}</h1>
    <p>{{ story }}</p>
  </main>
</template>

<script>
export default {
  name: 'tap-story',
  props: ['lang', 'availableStories'],
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
      this.$set(this.stories, this.lang, await this.availableStories[this.lang])
    }
  }
}
</script>

<style lang="scss"></style>
