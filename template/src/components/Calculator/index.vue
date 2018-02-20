<template>
  <main>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('intro') }}</p>
    <currency-selector :currency.sync="currency" :currencies="currencies"></currency-selector>

    <form @submit.prevent autocomplete="off">
      <div id="sliders">
         <div class="form-group financial" :style="{ backgroundImage: `url('${getImage('motif-1.png')}')` }">
          <h4>{{ $t('patfin.title') }}</h4>
          <h5>{{ $t('patfin.detail') }}</h5>
          <span class="currency">{{ $n(patfin, currency.name, lang) }}</span>
          <range-slider v-model="patfin" scaleType="log" :scaleDomain="[100, 1000000]" :ticks="ticks" :step="100"></range-slider>
        </div>
        <div class="form-group nonfinancial" :style="{ backgroundImage: `url('${getImage('motif-2.png')}')` }">
          <h4>{{ $t('patnonfin.title') }}</h4>
          <h5>{{ $t('patnonfin.detail') }}</h5>
          <span class="currency">{{ $n(patnonfin, currency.name, lang) }}</span>
          <range-slider v-model="patnonfin" scaleType="log" :scaleDomain="[100, 1000000]" :ticks="ticks" :step="100"></range-slider>
        </div>
        <div class="form-group debts" :style="{ backgroundImage: `url('${getImage('motif-3.png')}')` }">
          <h4>{{ $t('dette.title') }}</h4>
          <h5>{{ $t('dette.detail') }}</h5>
          <span class="currency">{{ $n(dette, currency.name, lang) }}</span>
          <range-slider v-model="dette" scaleType="log" :scaleDomain="[100, 1000000]" :ticks="ticks" :step="100"></range-slider>
        </div>
      </div>
      <div id="results" :class="currentDecileName">
        <div class="form-group patnet">
            <h4>{{ $t('yourepart') }}</h4>
            <span class="number">{{ $t(currentDecileName) }}</span>
            <h4>{{ $t('intheworld') }}</h4>
            <h4 class="secondary">{{ $t('patnet.title') }} <span class="h4">{{ $n(patnet, currency.name, lang) }}</span></h4>
        </div>
        <div class="form-group compare">
            <h4>{{ $t('likeyou') }} <select class="dropdowncountry" v-model="countrySelected">
              <option v-for="country in countries" :key="country.pays" :value="country">{{ $t(country.pays) }}</option>
            </select> </h4> {{ $t('inhabitants') }} <span class="number2">{{ $n(countryCompare.percentage, 'percentage', 'en') }}</span>   <h4>{{ $t('ownpat') }} <u>{{ $t(countryCompare.step) }}</u></h4>
        </div>
      </div>
    </form>
    <p class="small"><img src="../../assets/images/lock.svg" height="12" width="10"> {{ $t('nodata') }}</p>
  </main>
</template>

<script>
import RangeSlider from './RangeSlider'
import CurrencySelector from './CurrencySelector'
import { scaleThreshold } from 'd3-scale'
import toNum from '@/utils/toNum'

const currencies = [
  {
    name: 'euro',
    symbol: '€',
    change: 1.2498
  },
  {
    name: 'dollar',
    symbol: '$',
    change: 1
  }
]

export default {
  name: 'calculator',
  components: { RangeSlider, CurrencySelector },
  data () {
    return {
      patfin: 0,
      patnonfin: 0,
      dette: 0,
      patrimoine: [],
      countries: [],
      deciles: [],
      countrySelected: null,
      currency: currencies[0],
      currencies
    }
  },
  computed: {
    lang () {
      return this.$route.lang
    },

    ticks () {
      return [
        {
          label: this.$n(1000, this.lang),
          value: 1000
        },
        {
          label: this.$n(10000, this.lang),
          value: 10000
        },
        {
          label: this.$n(100000, this.lang),
          value: 100000
        }
      ]
    },

    patnet () {
      return this.patfin + this.patnonfin - this.dette
    },
    decilesReverse () {
      return this.deciles.slice().reverse()
    },
    decilesDomain () {
      return this.deciles
        .map(d => toNum(d.maxwealth))
        .map(d => d / this.currency.change)
    },
    decilesRange () {
      return this.deciles.map(d => d.name)
    },
    decilesScale () {
      return scaleThreshold().domain(this.decilesDomain).range(this.decilesRange)
    },
    currentDecileName () {
      return this.decilesScale(this.patnet)
    },
    currentDecile () {
      return this.deciles.find(d => d.name === this.currentDecileName)
    },
    currentDecileIndex () {
      return this.decilesReverse.findIndex(d => d.name === this.currentDecileName)
    },
    countryCompare () {
      if (!this.countrySelected) {
        return {
          percentage: null,
          step: null
        }
      }
      let peoplePercentage = toNum(this.countrySelected['over1million'])
      if (this.patnet * this.currency.change >= 1000000) {
        return {
          percentage: peoplePercentage / 100,
          step: 'over1million'
        }
      }
      peoplePercentage = toNum(this.countrySelected['between100000and1million'])
      if (this.patnet * this.currency.change >= 100000) {
        return {
          percentage: peoplePercentage / 100,
          step: 'between100000and1million'
        }
      }
      peoplePercentage = toNum(this.countrySelected['under10000'])
      if (this.patnet * this.currency.change < 10000) {
        return {
          percentage: peoplePercentage / 100,
          step: 'under10000'
        }
      }
      peoplePercentage = toNum(this.countrySelected['between10000and100000'])
      return {
        percentage: peoplePercentage / 100,
        step: 'between10000and100000'
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const patrimoine = await fetch('https://graphics.afpforum.com/data/simulateur_richesses_monde/patrimoine.json')
      this.patrimoine = await patrimoine.json()

      const deciles = await fetch('https://graphics.afpforum.com/data/simulateur_richesses_monde/deciles.json')
      this.deciles = await deciles.json()

      const countries = await fetch('https://graphics.afpforum.com/data/simulateur_richesses_monde/within_countries.json')
      this.countries = await countries.json()
      this.countrySelected = this.countries.find(d => d.pays === 'usa')
    },

    getImage (fileName) {
      return require.context('../../assets/images')('./' + fileName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/variables.scss';

#sliders, #results {
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
  }

  h5 {
    font-style: italic;
    font-weight: 400;
    font-size: 1.3rem;
    color: #442a13;
    text-shadow: 0 -1px 0 rgba($white, 0.15);
    margin-bottom: 1.3rem;
  }

  .secondary {
    color: #263540;
    font-style: italic;
    font-weight: 400;
    font-size: 1.3rem;
    letter-spacing: 0.005em;
    margin-top: 6px;
    text-shadow: 0 -1px 0 rgba($white, 0.15);
  }

  span.currency {
    font-size: 3rem;
    font-family: $roboto_mono;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
    margin-bottom: 12px;
    margin-left: 6px;
    line-height: 2rem;
  }

  .dropdowncountry {
    background: $white;
    border: 2px solid $grey_cold_6;
    color: $grey_cold_7;
    font-size: 2.0rem;
    padding: 8px;
    font-family: $source_sans_pro;
    margin: 12px 6px;
    box-shadow: 0 2px 3px rgba($black, 0.3);
  }

  .dropdowncurrency {
    background: $white;
    border: 2px solid $grey_cold_6;
    color: $grey_cold_7;
    font-size: 2.0rem;
    padding: 8px;
    font-family: $source_sans_pro;
    margin: 12px 6px;
    box-shadow: 0 2px 3px rgba($black, 0.3);
  }

  span.number {
    font-size: 3rem;
    font-family: $roboto_mono;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
    margin-right: 6px;
    padding-bottom: 6px;
    line-height: 1.2em;
    margin-top: 12px;
  }

    span.number2 {
    font-size: 3rem;
    font-family: $roboto_mono;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
    margin-right: 6px;
    padding-bottom: 6px;
    line-height: 1.2em;
    margin-top: 6px;
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

    &.financial {
      background: repeat left #f2be59;
      background-size: 150px 150px;
      margin-bottom: 4px;
    }
    &.nonfinancial {
      background: repeat left #d98c57;
      background-size: 150px 150px;
      margin-bottom: 4px;
    }
    &.debts {
      background: repeat left #d36d4e;
      background-size: 150px 150px;
      margin-bottom: 4px;
    }
  }
}

#results {
  background-color: #4f80a4;
  border-radius: 7px;

  &.d1 {
    background-color: #4f80a4;
  }
  &.d2 {
    background-color: #5087a5;
  }
  &.d3 {
    background-color: #528ea6;
  }
  &.d4 {
    background-color: #5395a7;
  }
  &.d5 {
    background-color: #549ca8;
  }
  &.d6 {
    background-color: #56a3a9;
  }
  &.d7 {
    background-color: #57a9a9;
  }
  &.d8 {
    background-color: #59b0aa;
  }
  &.d9 {
    background-color: #5ab7ab;
  }
  &.d10 {
    background-color: #5bbeac;
  }
  &.d10-top5 {
    background-color: #5dc5ad;
  }
  &.d10-top1 {
    background-color: #5eccae;
  }

  .patnet {
    margin-top: 0;
    border-radius: 7px 7px 0 0;
  }

  .compare {
    background-color: rgba(255, 255, 255, 0.12);
    border-radius: 0 0 7px 7px;
  }
}

@media #{$break-small} {
  #sliders {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    h4 {
      font-size: 1.4rem;
    }

    span.currency {
      font-size: 2rem;
    }

    .form-group {
      width: 33%;
    }
  }
}
</style>

<style lang="scss">
  @import '~@/assets/sass/variables.scss';
  @media #{$break-small} {
    .ticks {
      display: none;
    }
  }
  .slider {
    border-color: rgba(255, 255, 255, 0.4) !important;
  }
  .tick {
    border-color: rgba(255, 255, 255, 0.4) !important;
    color: rgba(255, 255, 255, 1) !important;
  }
</style>
