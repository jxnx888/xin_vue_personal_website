<template>
  <div class="main_wrapper">
      <div class="banner banner_one">
        <img v-lazy="bannerList[0]" alt="">
        <div class="banner_info">
<!--          <h1>{{$t('home.name')}}</h1>-->
          <h1>
            <span class="each_word"
                  v-for="(item, index) in $t('home.name')"
                  :key="index" @mouseenter="animatedWord">
            {{item}}
          </span>
          </h1>
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
          timer: null,
            currentWord:null,
        }
      },
      props: {
            bannerList: Array
        },
        methods: {
            animatedWord(e) {
                const _this = this;
                _this.currentWord = $(e.target);
                _this.currentWord.addClass('animated rubberBand');
                // animationend ::  标准语法
                //不同浏览器的AnimationEnd写法 (webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend)
                _this.currentWord.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    _this.currentWord.removeClass('animated rubberBand');
                });
            }
        },
        mounted() {
            //dom渲染完成后，操作增加动态效果
            this.$nextTick(function () {
                let a = 0;
                $(".each_word").each(function(){
                    const el = $(this);
                    const index =$(this).index();
                    setTimeout(function(){
                        if( 0 == index || 4 == index){
                            el.addClass('animated animationCapt');
                        }
                        else{
                            el.addClass('animated bounceIn');
                        }
                    },a);
                    a+=100;
                })
                setTimeout(function(){
                    $(".each_word").removeClass('animated bounceIn').css('opacity',1);
                    $(".each_word").mouseenter(function (){
                        var el = $(this);
                        $(this).addClass('animated rubberBand');
                        $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            el.removeClass('animated rubberBand');
                        });
                    });
                    },3000)
            })
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
    height 5.56rem
    min-height 5.56rem
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
        color: #bdb7b7;
        letter-spacing: 5px;
        -webkit-animation: twinkling 1s 1.3s backwards;
        animation: twinkling 1s 1.3s backwards;
      .subtitle
        font-size: .2rem;
        padding .1rem 0
        color: #bdb7b7;
        -webkit-animation: twinkling 1s 1.3s backwards;
        animation: twinkling 1s 1.3s backwards;
        @media screen and (max-width: 768px)
          font-size: .12rem;
@keyframes twinkling {
  0%   { opacity: 0;}
  100% {opacity: 1;}
}
@-webkit-keyframes twinkling {
  0%   { opacity: 0;  }
  100% {opacity: 1;}
}
</style>
