<template>
  <div class="each_content">
    <a :href="link">
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
        }
    }
</script>

<style scoped lang="stylus">
.each_content
  cursor pointer
  position: relative;
  margin-bottom .4rem
  width 4.8rem;
  height 4.1rem;
  border: 10px ridge;
  float left
  .each_wrapper
    width 4.6rem
    height 3.9rem;
    overflow hidden
    position: relative;
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
.each_content:nth-of-type(2n+1)
  margin-right 2%

@keyframes show_detail {
  0%{bottom: -2.02rem;}
  100%{bottom:0;}
}
</style>
