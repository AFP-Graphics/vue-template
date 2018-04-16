<template>
  <div
    v-resize:debounce="onResize"
    ref="slider"
    class="slider">
    <ul
      v-if="ticks.length > 0"
      class="ticks">
      <li
        v-for="tick in ticks"
        :key="tick.value"
        :style="{left: `${scale(tick.value)}px`}"
        class="tick">{{ tick.label }}</li>
    </ul>
    <div
      ref="dragger"
      :class="{ dragger: true, isDragging }"
      :style="{left: `${xDraggerPos}px`}" />
  </div>
</template>

<script>
import { scaleLinear, scaleLog } from 'd3-scale'
import { select, event } from 'd3-selection'
import { drag } from 'd3-drag'
import resize from 'vue-resize-directive'

const scales = {
  'linear': scaleLinear,
  'log': scaleLog
}

const roundToNearest = (value, multiple, roundingFunction) => {
  roundingFunction = roundingFunction || Math.round
  return roundingFunction(value / multiple) * multiple
}

export default {
  name: 'RangeSlider',
  directives: {
    resize
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      default: () => 0
    },
    scaleType: {
      type: String,
      default: 'linear'
    },
    scaleDomain: {
      type: Array,
      default: () => ([0, 1])
    },
    ticks: {
      type: Array,
      default: () => ([])
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      width: 0,
      isDragging: false
    }
  },
  computed: {
    scaleRange () {
      return [0, this.width]
    },
    scale () {
      return scales[this.scaleType]().domain(this.scaleDomain).range(this.scaleRange)
    },
    xDraggerPos: {
      get () {
        const xDraggerPos = this.scale(this.value)
        return isNaN(xDraggerPos) ? 0 : xDraggerPos
      },
      set (xDraggerPos) {
        if (xDraggerPos < 0) {
          this.$emit('change', 0)
          return
        }
        let newValue = this.scale.invert(xDraggerPos)
        newValue = roundToNearest(newValue, this.step)
        if (newValue < this.scaleDomain[0]) {
          newValue = this.scaleDomain[0]
        } else if (newValue > this.scaleDomain[1]) {
          newValue = this.scaleDomain[1]
        }
        this.$emit('change', newValue)
      }
    },
    drag () {
      return drag()
        .on('start', this.onDragStart)
        .on('drag', this.onDrag)
        .on('end', this.onDragEnd)
    }
  },
  mounted () {
    this.onResize(0)
    select(this.$refs.dragger).call(this.drag)
  },
  methods: {
    onResize (delay = 500) {
      setTimeout(() => {
        this.width = this.$refs.slider.clientWidth
      }, delay)
    },
    onDragStart () {
      this.onResize()
      this.isDragging = true
      this.xDraggerPos = event.x
    },
    onDrag () {
      this.xDraggerPos = event.x
    },
    onDragEnd () {
      this.isDragging = false
      this.xDraggerPos = event.x
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables';

  $draggerRadius: 14.5px;
  .slider {
    position: relative;
    border-bottom: 1px solid $grey_cold_3;
    margin: $draggerRadius 0;
    width: 100%;

    .dragger {
      position: absolute;
      transform: translateX(- $draggerRadius);
      top: - $draggerRadius;
      width: $draggerRadius  * 2;
      height: $draggerRadius * 2;
      border-radius: 50%;
      border: 2px solid $grey_cold_6;
      background-color: white;
      cursor: ew-resize;
      transition: transform 33ms linear;

      &.isDragging {
        transform-origin: 50% 50%;
        transform: translateX(- $draggerRadius) scale(1.2);
        box-shadow: 0 2px 0 rgba($grey_cold_6, 0.3);
      }
    }

    .ticks {
      pointer-events: none;
      position: absolute;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;

      .tick {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        border-left: 1px solid $grey_cold_3;
        padding-top: 4px;
        padding-left: 4px;
        color: $grey_cold_6;
        font-size: 10px;
        font-family: $roboto_mono;
      }
    }
  }
</style>
