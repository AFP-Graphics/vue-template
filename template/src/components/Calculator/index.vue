<template>
  <main>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('intro') }}</p>

    <form
      autocomplete="off"
      @submit.prevent>
      <div id="sliders">
        <div class="form-group value1">
          <h4>{{ $t('value1.title') }}</h4>
          <h5>{{ $t('value1.detail') }}</h5>
          <span class="value">{{ $n(value1, lang) }}</span>
          <range-slider
            v-model="value1"
            :scale-domain="[0, 1000]"
            :ticks="ticks"
            :step="1"
            scale-type="linear"/>
        </div>
        <div class="form-group value2">
          <h4>{{ $t('value2.title') }}</h4>
          <h5>{{ $t('value2.detail') }}</h5>
          <span class="value">{{ $n(value2, lang) }}</span>
          <range-slider
            v-model="value2"
            :scale-domain="[0, 1000]"
            :ticks="ticks"
            :step="1"
            scale-type="linear"/>
        </div>
      </div>
      <div
        id="results"
        :class="currentStepName">
        <div class="form-group result">
          <h4>{{ $t('result.title') }}</h4>
          <h5>{{ $t(currentStepName) }}</h5>
          <span class="value">{{ $n(result, lang) }}</span>
        </div>
      </div>
    </form>
    <p class="small">
      <img
        src="@/assets/img/lock.svg"
        height="12"
        width="10"> {{ $t('nodata') }}
    </p>
  </main>
</template>

<script>
import RangeSlider from './RangeSlider'
import { scaleThreshold } from 'd3-scale'

export default {
  name: 'Calculator',
  components: { RangeSlider },
  data () {
    return {
      value1: 0,
      value2: 0,
      steps: [
        {
          name: 'below500',
          value: 500
        }, {
          name: 'above500',
          value: 1000
        }
      ]
    }
  },
  computed: {
    lang () {
      return this.$route.lang
    },

    ticks () {
      return [
        {
          label: this.$n(100, this.lang),
          value: 100
        },
        {
          label: this.$n(500, this.lang),
          value: 500
        },
        {
          label: this.$n(800, this.lang),
          value: 800
        }
      ]
    },

    result () {
      return this.value1 + this.value2
    },
    scaleDomain () {
      return this.steps.map(d => d.value)
    },
    scaleRange () {
      return this.steps.map(d => d.name)
    },
    scale () {
      return scaleThreshold().domain(this.scaleDomain).range(this.scaleRange)
    },
    currentStepName () {
      return this.scale(this.result)
    },
    currentStep () {
      return this.steps.find(d => d.name === this.currentStepName)
    },
    currentStepIndex () {
      return this.steps.findIndex(d => d.name === this.currentStepName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables';

#sliders, #results {
  display: flex;
  flex-direction: column;

  h5 {
    font-style: italic;
    font-weight: 400;
    font-size: $f13;
    color: #442a13;
    text-shadow: 0 -1px 0 rgba($white, 0.15);
    margin-bottom: $f13;
  }

  span.value {
    font-size: $f30;
    font-family: $roboto_mono;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
    margin-bottom: 12px;
    margin-left: 6px;
    line-height: $f20;
  }

  .form-group {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px;
    color: white;
    border-radius: 7px;

    h4 {
      margin-bottom: 0px;
    }

    &.value1 {
      background: repeat left #f2be59;
      background-size: 150px 150px;
      margin-bottom: 4px;
    }
    &.value2 {
      background: repeat left #d98c57;
      background-size: 150px 150px;
      margin-bottom: 4px;
    }
  }
}

#results {
  background-color: #4f80a4;
  border-radius: 7px;

  &.below500 {
    background-color: #4f80a4;
  }
  &.above500 {
    background-color: #5eccae;
  }
}

@media #{$break-small} {
  #sliders {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    h4 {
      font-size: $f14;
    }

    span.currency {
      font-size: $f20;
    }

    .form-group {
      width: 49%;
    }
  }
}
</style>

<style lang="scss">
  @import '~@/assets/styles/variables';
  .slider {
    border-color: rgba(255, 255, 255, 0.4) !important;
  }
  .tick {
    border-color: rgba(255, 255, 255, 0.4) !important;
    color: rgba(255, 255, 255, 1) !important;
  }
</style>
