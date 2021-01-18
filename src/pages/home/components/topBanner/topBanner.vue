<template>
  <div class="main_wrapper">
      <div class="banner banner_one">
        <img v-lazy="bannerList[0]" alt="">
        <div class="banner_info">
          <h1>{{$t('home.name')}}</h1>
          <p class="title">{{$t('home.title')}}</p>
          <p class="subtitle">{{$t('home.subtitle')}}</p>
        </div>
        <autoTyping :key="timer"></autoTyping>
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
      data() {
        return {
          timer: null
        }
      },
      props: {
            bannerList: Array
        },
      watch: {
        '$i18n.locale'(newValue, oldValue) {
          if(newValue!=oldValue)   {
            this.timer = new Date().getTime()
          }
        }
      },
    }
</script>

<style scoped lang="stylus">
.main_wrapper
  .banner
    position: relative;
    width 100%
    height 5.61rem
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
        font-size: .25rem;
        padding .1rem 0
        color: #666;
        @media screen and (max-width: 768px)
          font-size: .12rem;
</style>
