<template>
  <div class="main_wrapper">
      <div class="banner banner_one">
        <img v-lazy="bannerList[0]" alt="">
        <div class="banner_info">
          <h1>{{$t('home.name')}}</h1>
          <p class="title">{{$t('home.title')}}</p>
          <p class="subtitle">{{$t('home.subtitle')}}</p>
        </div>
        <autoTyping></autoTyping>
      </div>
  </div>
</template>

<script>
import autoTyping from "@/common/autoTyping/autoTyping";
    export default {
        name: "topBanner",
      components: {
        autoTyping
      },
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
    max-height 561px
    background #eee
    img
      width 100%
      max-height 100%
    .banner_info
      position absolute
      left: 50%
      top 50%
      transform: translate(-50%,-50%);
      h1
        font-size: 70px;
        font-weight: bolder;
        text-shadow: 6px 9px 2px #999;
        color: #333;
        padding 20px 0
      p
        font-size: 30px;
        color: #bdb7b7;
      .subtitle
        font-size 25px
        padding 10px 0
</style>
