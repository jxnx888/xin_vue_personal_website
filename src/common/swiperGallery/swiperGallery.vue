<template>
  <div class="container" @click="handleGalleryClick">
    <div class="wrapper">
      <swiper :options="swiperOptions">
        <swiper-slide
          v-for="(item, index) in imgs"
          :key="index"
        >
          <img class="gallary-img" :src="item" :data-hash="'slide='+index" />
          <!-- <p>{{index}}</p> -->
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'CommonGallery',
        props: {
            imgs: {
                type: Array,
                default() {
                    return []
                }
            },
            url: {
                type: String,
                default: ""
            },
            index:{
                type: String,
                default: ""
            }
        },
        data() {
            return {
                swiperOptions: {
                    pagination: '.swiper-pagination',
                    paginationType: 'fraction',
                    observeParents: true,
                    observer: true,
                    loop: true
                }
            }
        },
        methods: {
            handleGalleryClick() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="stylus" scoped>
  .container >>> .swiper-container
    overflow: inherit

  .container
    display: flex
    flex-direction: column
    justify-content: center
    z-index: 99
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    background: #000
    .wrapper
      height: 0
      width: 100%
      padding-bottom: 100%
      .gallary-img
        width: 100%
      .swiper-pagination
        color: #fff
        bottom: -1rem
</style>
