<template>
  <main>
    <h2>{{ $t('headline') }}</h2>
    <horizontal-tabs :tabs="tabs" :current.sync="current"></horizontal-tabs>
    <div :class="`tab-story-container ${direction}`">
      <transition name="slide">
        <display-tab :tab="currentTab" :key="current"></display-tab>
      </transition>
    </div>
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
  watch: {
    current (newVal, oldVal) {
      this.direction = newVal > oldVal ? 'right' : 'left'
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

<style lang="scss" scoped>
.tab-story-container {
  position: relative;
  overflow-x: hidden;

  .slide-enter-active, .slide-leave-active {
    transition: transform .3s;
  }

  .slide-leave-to {
    position: absolute;
  }

  &.right {
    .slide-enter {
    transform: translate(100%, 0);
    }
    .slide-leave-to {
      transform: translate(-100%, 0);
    }
  }

  &.left {
    .slide-enter {
    transform: translate(-100%, 0);
    }
    .slide-leave-to {
      transform: translate(100%, 0);
    }
  }
}
</style>
