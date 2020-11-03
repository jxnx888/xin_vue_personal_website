<template>
  <div class="main_wrapper">
    <div v-if="bannerList.length>1">
      <div class="banner banner_swiper"></div>
    </div>
    <div v-else>
      <div class="banner banner_one">
        <img :src="bannerList[0]" alt="">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "topBannerSwiper",
        props: {
            bannerList: Array
        },
    }
</script>

<style scoped lang="stylus">
.main_wrapper
  .banner
    position: relative;
    width 100%
    height 561px
    background #eee
    img
      width 100%
      height 100%
</style>
