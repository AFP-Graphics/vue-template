<template>
  <div class="modal">
    <div class="modal-mask" v-on:click="closeModal"></div>
    <div class="modal-container">
      <div class="close" :class="modal.closeColour" v-on:click="closeModal">
        <i class="UI-icon UI-close-alt"></i>
      </div>
      <figure v-if="modal.image" class="modal-image-wrapper">
        <img class="modal-image" :src="getPhoto(modal.image)" alt="modal image">
        <figcaption v-if="modal.caption" class="caption">{{ modal.caption }}</figcaption>
      </figure>

      <div class="text">
        <h4 class="title" v-if="modal.title">{{ modal.title }}</h4>
        <h5 class="subtitle" v-if="modal.subtitle">{{ modal.subtitle }}</h5>
        <p class="description" v-if="modal.description">{{ modal.description }}</p>
        <p class="source" v-if="modal.source">{{ modal.source }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',

  props: ['modal'],

  methods: {
    getPhoto (fileName) {
      return require.context('../../assets/img/modalgallery')('./' + fileName)
    },

    closeModal () {
      this.$emit('closeModal')
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
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
    }

    .modal-container {
      position: absolute;
      z-index: 99;
      max-width: 580px;
      width: 100%;
      background: $white;
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
        z-index: 2;

        &>i {
          font-size: 20px;
          color: $black;
        }

        &.black i {
          color: $black;
        }

        &.white i {
          color: $white;
        }

        &:hover {
          cursor: pointer;
        }
      }

      .modal-image-wrapper {
        position: relative;
        margin: 0;
        z-index: 1;

        .modal-image {
          display: block;
          border-radius: 4px 4px 0 0;
          width: 100%;
          height: 100%;
        }

        .caption {
          width: 100%;
          bottom: 0;
          padding: 10px 10px 0 10px;
          font-size: 1.3rem;
          margin: 0;
          font-style: italic;
          text-align: center;
        }
      }

      .text {
        padding: 14px 24px 24px;

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
          font-weight: bold;
        }
      }
    }
  }

  @media #{$break-small} {
    .modal {
      .modal-container {
        top: 50px;
      }
    }
  }

  @media #{$break-large} {
    .modal {
      .modal-container {
        max-width: 700px;
      }
    }
  }
</style>
