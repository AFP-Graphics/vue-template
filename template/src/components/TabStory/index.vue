<template>
  <main>
    <h2>{{ $t('headline') }}</h2>
    <horizontal-tabs
      :tabs="tabs"
      :current.sync="current" />
    <div :class="`tab-story-container ${direction}`">
      <!-- TRANSITION - Choose between: fade/slide -->
      <transition
        name="slide"
        mode="out-in">
        <display-tab
          :tab="currentTab"
          :key="current" />
      </transition>
    </div>
  </main>
</template>

<script>
import HorizontalTabs from '@/components/TabStory/HorizontalTabs'
import DisplayTab from '@/components/TabStory/DisplayTab'

export default {
  name: 'TabStory',
  components: {
    HorizontalTabs,
    DisplayTab
  },
  data () {
    return {
      current: 0,
      direction: ''
    }
  },
  computed: {
    tabs () {
      return this.$t('tabs')
    },
    currentTab () {
      return this.tabs[this.current]
    }
  },
  watch: {
    current (newVal, oldVal) {
      this.direction = newVal > oldVal ? 'right' : 'left'
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-story-container {
    position: relative;
    overflow-x: hidden;

    .slide-enter-active, .slide-leave-active {
      transition: transform .2s;
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

    .fade-enter-active {
      transition: opacity .3s ease;
    }
    .fade-leave-active {
      transition: opacity .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
</style>
