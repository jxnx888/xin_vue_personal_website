<template>
  <div :class="`each_content each_content-${this.$root.userAgent}`">
    <a v-if="'3'!=code && '4'!=code && '5'!=code" :href="link">
      <div class="each_wrapper">
        <img v-lazy="bgImg" :key="bgImg" alt="" class="each_img">
        <div class="info_wrapper">
          <div class="thisTitle">{{titleInf}}</div>
          <div class="thisDes">{{desc}}</div>
          <div class="thisTags">
            <div class="subTitle">Tags:</div>
            {{tags}}
          </div>
        </div>
      </div>
    </a>
    <div v-else-if="'3'==code || '4'==code || '5'==code"
         @click="goChildPage(code)"
         class="threed">
      <div class="tip">{{$t('projects.tip') }}</div>
      <div class="each_wrapper">
        <img v-lazy="bgImg" :key="bgImg" alt="" class="each_img">
        <div class="qr_wrapper" v-if="storeUrlQr">
          <div class="row" >
            <div class="col-xs-6" v-for="(value,key,index) in storeUrlQr"
                 :key="index" >
              <div class="col-xs-12" v-if="value">
                <div class="img_wrapper">
                <img  v-lazy="value" :key="key" alt="">
                </div>
              </div>
              <div class="col-xs-12 qrTitle" v-if="value">
                {{key}}
              </div>
            </div>
          </div>
        </div>
        <div class="info_wrapper">
          <div class="thisTitle">{{titleInf}}</div>
          <div class="thisDes">{{desc}}</div>
          <div class="thisTags">
            <div class="subTitle">Tags:</div>
            {{tags}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "projectTem",
        props: {
            bgImg:String,
            titleInf:String,
            desc:String,
            tags:String,
            link:String,
            code:Number,
            storeUrlQr:{},
        },
        methods:{
            goChildPage(page){
                const _this = this;
                switch (page) {
                    case 3:
                        _this.$router.push({name:'MagicBox'})
                        break;
                    case 4:
                        _this.$router.push({path:'/projects/luggageDecalSplatter'})
                        break;
                    default:
                        _this.$router.push({path:'/projects/forFun'})
                }
            },
        }
    }
</script>

<style scoped lang="stylus">
.each_content
  cursor pointer
  position: relative;
  margin-bottom .4rem
  width 50%
  max-width 4.8rem;
  height 4.1rem;
  border: 10px ridge;
  float left
  @media screen and (max-width: 768px)
    width 95%
  .each_wrapper
    max-width 4.6rem
    height 3.9rem;
    overflow hidden
    position: relative;
    @media screen and (max-width: 768px)
      width 95%
      margin auto
    .each_img
      position: absolute;
      top 0
      right 0
      left 0
      bottom 0
      margin: auto;
      max-width: 100%;
      max-height: 100%;
      transition: all 0.5s ease-out;
    .qr_wrapper
      opacity 0
      width 100%
      padding 0 .15rem
      position absolute
      left: 0
      bottom 60%
      transform scale(1.03)
      .img_wrapper
        width 1rem
        height 1rem
        margin auto
      .qrTitle
        text-align center
        font-size .14rem
        line-height .3rem
        color #FFF
        text-transform uppercase
    .info_wrapper
      width: 100%;
      height: 60%;
      position: absolute;
      left 0
      right 0
      bottom -2.02rem
      z-index 9
      background rgba(0,0,0,0.7)
      color #fff
      .thisTitle
        width 100%
        line-height 30px
        border-top 1px solid #fff
        border-bottom 1px solid #fff
      .thisDes
        text-align left
        min-height: 1rem;
        padding .2rem .2rem
        line-height .2rem
        opacity 0
      .thisTags
        text-align left
        line-height .3rem
        padding 0 .2rem .2rem
        opacity 0
        .subTitle
          font-weight bold
  .each_wrapper:hover
    .each_img
      transform scale(1.03)
    .info_wrapper
      bottom 0
      animation: show_detail 0.3s linear forwards;
      .thisDes
      .thisTags
        opacity 1
    .qr_wrapper
      opacity 1
      animation: bounceInA 1s linear forwards;
.each_content:nth-of-type(2n+1)
  margin-right 2%
.each_content
  .threed
    position relative
    .tip
      position: absolute
      left 50%
      top 20%
      transform translate(-50%,-20%)
      z-index 9
      width 2rem
      line-height .2rem
      border 1px solid #f78c3e
      padding .05rem .1rem
      border-radius .5rem
      background #f78c3e
      color #fff
      -webkit-animation twinkling 1s infinite 0.9s ease-in-out alternate
      animation twinkling 1s infinite 0.9s ease-in-out alternate


.tip:hover~.each_wrapper .each_img{
  transform scale(1.03)
}
.tip:hover~.each_wrapper .info_wrapper{
   bottom 0
   animation: show_detail 0.3s linear forwards;
}
.tip:hover~.each_wrapper .info_wrapper .thisDes,.tip:hover~.each_wrapper .info_wrapper .thisTags{
    opacity 1
}
.each_content-phone,.each_content-pad
  width 48%
  .each_wrapper
    .info_wrapper
      bottom 0
      .thisTags, .thisDes
        opacity 1
.each_content-phone
  width 100%
@keyframes show_detail {
  0%{bottom: -2.02rem;}
  100%{bottom:0;}
}
@-webkit-keyframes twinkling {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
@keyframes twinkling {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
