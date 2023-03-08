<template>
  <div :class='`banner-${userAgent} main_wrapper`'>
    <div class='banner banner_one' v-lazy:background-image='bannerList[0]'>
      <!--        <img :src="bannerList[0]" alt="">-->
      <div class='banner_info'>
        <!--          <h1>{{$t('home.name')}}</h1>-->
        <h1>
            <span class='each_word'
                  v-for="(item, index) in $t('MY_NAME')"
                  :key='index' @mouseenter='animatedWord'>
            {{ item }}
          </span>
        </h1>
        <p class='title'>{{ $t('MY_TITLE') }}</p>
        <p class='subtitle'>{{ $t('MY_SUBTITLE') }}</p>
      </div>
      <autoTyping
        :userAgent='userAgent'
        :key='timer'
        :dataType="$t('INTRODUCTION')"
      />
    </div>
<!--    <autoTyping v-if='userAgent === "phone"' :key='timer' :dataType="$t('INTRODUCTION')"></autoTyping>-->
  </div>
</template>

<script>
import autoTyping from '@/common/autoTyping/autoTyping'

export default {
  name: 'topBanner',
  components: {
    autoTyping
  },
  props: {
    bannerList: Array,
    userAgent: String
  },
  data() {
    return {
      timer: null,
      currentWord: null
    }
  },
  methods: {
    animatedWord(e) {
      const _this = this
      _this.currentWord = $(e.target)
      _this.currentWord.addClass('animated rubberBand')
      // animationend ::  标准语法
      //不同浏览器的AnimationEnd写法 (webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend)
      _this.currentWord.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        _this.currentWord.removeClass('animated rubberBand')
      })
    },
    animatedInit(type) { //type 0 init 1 切换语言
      let timer = 3000
      if (1 == type) {
        timer = 1000
      }
      let a = 0
      $('.each_word').each(function() {
        const el = $(this)
        const index = $(this).index()
        $('.animationCapt').removeClass('animationCapt')
        setTimeout(function() {
          if (0 == index || 4 == index) {
            el.addClass('animated animationCapt')
          } else {
            el.addClass('animated bounceIn')
          }
        }, a)
        a += 100
      })
      setTimeout(function() {
        $('.each_word').removeClass('animated bounceIn').css('opacity', 1)
        $('.each_word').mouseenter(function() {
          var el = $(this)
          $(this).addClass('animated rubberBand')
          $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            el.removeClass('animated rubberBand')
          })
        })
      }, timer)
    }
  },
  mounted() {
    const _this = this
    //dom渲染完成后，操作增加动态效果
    _this.$nextTick(function() {
      _this.animatedInit(0)
    })
  },
  watch: {
    '$i18n.locale'(newValue, oldValue) {
      if (newValue != oldValue) {
        this.timer = new Date().getTime()
        this.$nextTick(function() {
          this.animatedInit(1)
        })
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
.main_wrapper, .banner-pc
  .banner
    position: relative;
    width 100%
    height: 0;
    padding-bottom: 29.2%;
    background #eee
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center;

    img
      max-width: 100%;
      max-height: 100%;

    .banner_info
      position absolute
      left: 50%
      top 40%
      transform: translate(-50%, -60%);
      @media screen and (max-width: 768px)
        width 95%

      h1
        font-size: 70px;
        font-weight: bolder;
        text-shadow: 6px 9px 2px #999;
        color: #333;
        padding 20px 0
        @media screen and (max-width: 1024px)
          font-size: 55px;
        @media screen and (max-width: 768px)
          font-size: 40px;

        .each_word
          cursor default
          min-width .2rem
          opacity 0
          display: inline-block;
          -webkit-transition: all 0.3s ease-out;
          transition: all 0.3s ease-out;

        .each_word.animated
          -webkit-animation-duration: 1s;
          animation-duration: 1s;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both

        .each_word:hover
          color #08fdd8

      p
        font-size: .22rem;
        color: #8d8888
        letter-spacing: 3px;
        -webkit-animation: twinkling 1s 1.3s backwards;
        animation: twinkling 1s 1.3s backwards;
        @media screen and (max-width: 1024px)
          font-size: .18rem;
        @media screen and (max-width: 768px)
          font-size: .14rem;

      .subtitle
        font-size: .2rem;
        padding .1rem 0
        color: #8d8888
        -webkit-animation: twinkling 1s 1.3s backwards;
        animation: twinkling 1s 1.3s backwards;
        @media screen and (max-width: 1024px)
          font-size: .18rem;
        @media screen and (max-width: 768px)
          font-size: .14rem;

.banner-phone .banner
  .banner_info
    top: 50%;
    transform: translate(-50%, -50%);

    h1
      font-size .5rem

    p
      font-size .16rem
</style>
