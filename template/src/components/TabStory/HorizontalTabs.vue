<template>
  <nav>
    <ul>
      <li
        v-for="(tab,i) in tabs"
        :key="tab.id"
        :class="{active: i === current}"
        @click="$emit('update:current', i)">
        {{ tab.id }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HorizontalTabs',
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables';

  nav ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    font-size: $f14;
    margin-bottom: 0px;

    li {
      cursor: pointer;
      padding: 10px 10px;
      border-radius: 0px;
      border: 1px solid transparent;
      text-align: center;
      min-width: 50%;

      &:hover {
        border: 1px solid lighten($grey_cold_1, 7);
        background-color: lighten($grey_cold_1, 12);
      }

      &.active {
        text-shadow: 0 -1px 0 darken($primary_color, 10);
        color: white;
        @include linear-gradient($primary_color, darken($primary_color, 5));
        border: 1px solid darken($primary_color, 5);
      }
    }
  }
  @media #{$break-small} {
    nav ul li {
      min-width: auto;
    }
  }
</style>
