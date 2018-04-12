<template lang="html">
  <footer class="afp-footer">
    <a
      :class="['button', {'large': isCreditsRoute}]"
      href="#"
      @click.prevent="routeFooter()">
      <span
        v-if="isCreditsRoute"
        :class="footerCreditBackClass"/>
      <img
        v-else
        src="@/assets/img/svg/picto-info.svg"
        alt="info">
    </a>
    <div class="source">
      <span>{{ $t('source') }}</span>
    </div>
    <logo/>
  </footer>
</template>

<script>
import Logo from '@/pages/layout/Logo'

export default {
  name: 'AfpFooter',

  components: { Logo },

  computed: {
    isCreditsRoute () {
      return this.$route.name === 'credits'
    },

    footerCreditBackClass () {
      return {
        'UI-icon': true,
        'UI-slide-left': this.$i18n.locale !== 'ar',
        'UI-slide-right': this.$i18n.locale === 'ar'
      }
    }
  },

  methods: {
    routeFooter () {
      this.isCreditsRoute ? this.$router.go(-1) : this.$router.push({name: 'credits', query: this.$route.query})
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables";

.afp-footer {
  display: flex; justify-content: flex-start; align-items: center;

  .source {
    flex: 1;
    margin-left: 6px;
    font-size: $f12;
  }

  a{ color: $black; text-decoration: none; display: inline-block; }

  .UI-slide-left, .UI-slide-right{ margin-top: 2px; }
  .UI-slide-left{ margin-left: 5px; }
  .UI-slide-right{ margin-right: 5px; }
  .button{
    width: 16px; height: 16px;
    display: flex; align-items: center; text-align: center;
    background: $font_color; color: $white;
    border-radius: 100%;
    transition: all 150ms ease;

    &.large{ width: 28px; height: 28px; }
  }
}
</style>
