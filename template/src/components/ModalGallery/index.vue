<template>
  <main>
    <h2>{{ $t('headline') }}</h2>
    <h3>{{ $t('subhead') }}</h3>

    <div class="gallery">
      <div v-for="(element, index) in gallery" class="gallery-element" :key="index" v-on:click="openModal(element.image, element.title, element.description, element.source)">
        <img class="thumbnail" :src="getPhoto(element.thumbnail)" alt="">
      </div>
    </div>

    <transition name="fade">
      <div v-if="showModal" class="modal">
        <div class="modal-mask" v-on:click="closeModal"></div>
        <div class="modal-container">
          <div class="close" v-on:click="closeModal">
            <img src="../../assets/svg/close.svg" alt="close">
          </div>
          <img class="modal-image" :src="getPhoto(modalImage)" alt="modal image">
          <div class="text">
            <h4 class="title">{{ modalTitle }}</h4>
            <p class="description">{{ modalDescription }}</p>
            <p class="source">{{ modalSource }}</p>
          </div>
        </div>
      </div>
    </transition>
  </main>
</template>

<script>
  export default {
    name: 'modal-gallery',

    data () {
      return {
        showModal: false,
        modalDescription: '',
        modalImage: null,
        modalTitle: '',
        modalSource: ''
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

      openModal (image, title, description, source) {
        this.modalImage = image
        this.modalDescription = description
        this.modalTitle = title
        this.modalSource = source

        this.showModal = true
      },

      closeModal () {
        this.showModal = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/sass/variables.scss';

  .modal {
    .modal-mask {
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }

    .modal-container {
      position: fixed;
      z-index: 99;
      max-width: 580px;
      width: 100%;
      background: #FFFFFF;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: width 0.2s ease;
      border-radius: 4px;

      .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 15px;

        &>img {
          width: 20px;
        }

        &:hover {
          cursor: pointer;
        }
      }

      .modal-image {
        border-radius: 4px 4px 0 0;
        width: 100%;
      }

      .text {
        padding: 16px 24px 24px;

        .title {
          font-size: 2rem;
          text-transform: uppercase;
        }

        .description {
          font-size: 1.5rem;
          margin-top: 20px;
        }

        .source {
          font-size: 1.3rem;
          margin: 0;
          font-style: italic;
        }
      }
    }
  }

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
        margin-left: 20px;
        margin-top: 20px;
      }
    }
  }
</style>
