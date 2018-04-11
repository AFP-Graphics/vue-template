<template lang="html">
  <footer class="afp-footer">
    <router-link
      v-if="$route.name !== 'credits'"
      :to="{name: 'credits', query: $route.query}">
      <span class="UI-icon UI-info"/>
    </router-link>
    <a
      v-else
      href="#"
      class="button"
      @click="$router.go(-1)">
      <span :class="footerCreditBackClass"/>
    </a>
    <div class="source">
      <span v-if="$route.path !== '/'">{{ $t('source') }}</span>
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
    footerCreditBackClass () {
      return {
        'UI-icon': true,
        'UI-slide-left': this.$i18n.locale !== 'ar',
        'UI-slide-right': this.$i18n.locale === 'ar'
      }
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

  a{ color: inherit; text-decoration: none; }

  .UI-slide-left, .UI-slide-right{ margin-top: 2px; }
  .UI-slide-left{ margin-left: 5px; }
  .UI-slide-right{ margin-right: 5px; }
  .button{
    width: 28px; height: 28px;
    display: flex; align-items: center; text-align: center;
    background: $font_color; color: $white;
    border-radius: 100%;
  }
}
</style>
