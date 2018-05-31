<template>
  <article>
    <p class="lazy-img-container">
      <img :src="require('@/assets/img/'+tab.image)">
    </p>
    <h3>
      <span class="big">{{ tab.name }}</span>
    </h3>
    <p class="lead">{{ tab.description }}</p>
    <ul>
      <li
        v-for="(event,i) in tab.events"
        :key="i">{{ event }}</li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'DisplayTab',
  props: {
    tab: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables';

  .big {
    font-weight: bold;
  }

  h3 {
    text-align: center;
    margin-bottom: 0;
    font-family: 'Georgia', 'Source Sans Pro', sans-serif;
    font-weight: 400;
    big {
      display: inline-block;
      margin: auto;
      font-size: $f24;
      line-height: $f27;
      letter-spacing: 0.05rem;
    }
  }

  img {
    width: 100%;
    height: auto;
  }

  p.lead {
    text-align: center;
  }

  ul {
    padding-left: 25px;
    margin: 0;
  }
</style>
