<template>
  <main :style="{ minHeight: minHeight }">
    <h2>{{ $t('headline') }}</h2> <!-- $t Check /src/locales/en.txt -->
    <h3>{{ $t('subhead') }}</h3>

    <div class="gallery">
      <div
        v-for="(element, index) in gallery"
        :key="index"
        class="gallery-element"
        @click="openModal(element)">
        <img
          :src="getPhoto(element.thumbnail)"
          class="thumbnail"
          alt="">
      </div>
    </div>

    <transition name="fade">
      <modal
        v-if="showModal"
        :modal="modal"
        @closeModal="closeModal"
        @setMinHeight="setMinHeight" />
    </transition>
  </main>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'ModalGallery',

  components: { Modal },

  data () {
    return {
      showModal: false,
      minHeight: 0,
      modal: {
        image: '',
        caption: '',
        title: '',
        subtitle: '',
        description: '',
        source: '',
        closeColour: ''
      }
    }
  },

  computed: {
    gallery () {
      return this.$t('gallery')
    }
  },

  methods: {
    getPhoto (fileName) {
      return require.context('../../assets/img/modalgallery')('./' + fileName)
    },

    openModal (element) {
      this.modal.image = element.image
      this.modal.caption = element.caption
      this.modal.description = element.description
      this.modal.title = element.title
      this.modal.subtitle = element.subtitle
      this.modal.source = element.source
      this.modal.closeColour = element.closeColour

      this.showModal = true
    },

    closeModal () {
      this.showModal = false
      this.setMinHeight(0)
    },

    setMinHeight (val) {
      this.minHeight = val + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables';

  .gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    margin-left: -7px;

    .gallery-element {
      height: 120px;
      width: 120px;
      border-radius: 5px;
      background: center center no-repeat;
      overflow: hidden;
      margin-left: 14px;
      margin-top: 14px;

      &:hover {
        cursor: pointer;
      }

      .thumbnail {
        transition: transform 0.2s ease;
        width: 100%;
        border-radius: 5px;
      }

      &:hover .thumbnail {
        transform: scale(1.1)
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  @media #{$break-small} {
    .modal {
      .modal-container {
        top: 50px;
      }
    }

    .gallery {
      margin-left: -10px;

      .gallery-element {
        height: 140px;
        width: 140px;
        margin-left: 20px;
        margin-top: 20px;
      }
    }
  }
</style>
