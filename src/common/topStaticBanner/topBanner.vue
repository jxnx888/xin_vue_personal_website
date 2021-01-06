<template>
  <div class="main_wrapper">
    <div class="banner banner_one">
      <img v-lazy="bannerImg" alt="">
      <div class="banner_info">
        <p class="title">{{bannerContent}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "topBanner",
        props: {
            bannerImg: String,
            bannerContent: String
        },
    }
</script>

<style scoped lang="stylus">
  .main_wrapper
    .banner
      position: relative;
      width 100%
      height 5.61rem
      max-height 5.61rem
      min-height 2.51rem
      background #eee
      @media screen and (max-width: 768px)
        min-height 1rem
      img
        max-width: 100%;
        max-height: 100%;
      .banner_info
        position absolute
        left: 50%
        top 50%
        transform: translate(-50%,-50%);
        @media screen and (max-width: 768px)
          width 95%
        p
          font-size: .3rem;
          line-height .35rem
          color: #666;
          @media screen and (max-width: 768px)
            font-size: .12rem;
            line-height .2rem

</style>
