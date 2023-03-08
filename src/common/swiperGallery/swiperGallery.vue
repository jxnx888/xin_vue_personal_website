<template>
  <div class='container'>
    <swiper :options='swiperOptions'>
      <swiper-slide
        v-for='(item, index) in imgs'
        :key='index'
      >
        <img class='gallary-img' :src='item' :data-hash="'slide='+index" />
        <!-- <p>{{index}}</p> -->
      </swiper-slide>
      <div class='swiper-pagination' slot='pagination'></div>
    </swiper>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'CommonGallery',
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        observeParents: true,
        observer: true,
        loop: imgs?.length > 1
      }
    }
  },
  methods: {

  }
}
</script>

<style lang='stylus' scoped>
//.container >>> .swiper-container
//  overflow: inherit

.container
  position: relative;
  width 100%
  height: 0;
  padding: 0 0 29.2% 0;
  img.gallary-img
    max-width: 100%;
    max-height: 100%;

  .swiper-pagination
    color: #fff
    bottom: -1rem
</style>
