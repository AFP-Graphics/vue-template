<template>
  <article>
    <p class="lazy-img-container"><img :src="require('@/assets/images/'+tab.image)"></p>
    <h3><big>{{ tab.name }}</big></h3>
    <p class="lead">{{ tab.description }}</p>
    <ul>
      <li v-for="(event,i) in tab.events" :key="i">{{ event }}</li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'display-tab',
  props: ['tab']
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/sass/variables.scss';

  h3 {
    text-align: center;
    margin-bottom: 0px;
    font-family: 'Georgia';
    font-weight: 400;
    big {
      display: inline-block;
      margin: auto;
      font-size: 2.4rem;
      line-height: 2.7rem;
      letter-spacing: 0.05rem;
    }
  }

  .lazy-img-container {
    display: block;
    position: relative;
    height: 0;
    overflow-y: hidden;
    padding-bottom: 59.4%; //Give image ratio

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
    }
  }

  p.lead {
    text-align: center;
  }

  ul {
    padding-left: 5px;
    margin-bottom: 0px;

    li:not(:last-child) {
      margin-bottom: 12px;
    }
  }
</style>
