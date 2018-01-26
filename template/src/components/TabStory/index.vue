<template>
  <main>
    <h2>{{ $t('headline') }}</h2>
    <horizontal-tabs :tabs="tabs" :current.sync="current"></horizontal-tabs>
    <display-tab :tab="currentTab"></display-tab>
  </main>
</template>

<script>
import HorizontalTabs from '@/components/TabStory/HorizontalTabs'
import DisplayTab from '@/components/TabStory/DisplayTab'

export default {
  name: 'tab-story',
  components: {
    HorizontalTabs,
    DisplayTab
  },
  data () {
    return {
      current: 0
    }
  },
  computed: {
    tabs () {
      return this.$t('tabs')
    },
    currentTab () {
      return this.tabs[this.current]
    }
  }
}
</script>

<style lang="scss"></style>
