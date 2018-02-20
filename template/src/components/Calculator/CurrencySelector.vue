<template>
  <div class="currency-selector">
    <p>{{ $t('choosecurrency') }}
      <select id="monselect" v-model="current">
        <option v-for="currency in currencies" :key="currency.name" :value="currency">{{ currency.symbol }}</option>
      </select>
    </p>
  </div>
</template>

<script>

export default {
  name: 'CurrencySelector',
  props: {
    currency: Object,
    currencies: Array
  },

  computed: {
    current: {
      get () {
        return this.currency
      },
      set (currency) {
        this.$emit('update:currency', currency)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/sass/variables.scss';
</style>
