<template>
  <div class="each_content">
    <div class="each_wrapper">
    <img :src="bgImg" alt="" class="each_img">
    <div class="info_wrapper">
      <div class="thisTitle">{{titleInf}}</div>
      <div class="thisDes">{{desc}}</div>
      <div class="thisTags">{{tags}}</div>
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
            tags:String
        }
    }
</script>

<style scoped lang="stylus">
.each_content
  cursor pointer
  position: relative;
  margin-bottom 40px
  width 49%;
  float left
  .each_wrapper
    width 100%
    height 420px;
    overflow hidden
    border: 10px ridge;
    .each_img
      position: absolute;
      top 0
      right 0
      left 0
      bottom 0
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    .info_wrapper
      width: 100%;
      position: absolute;
      left 0
      right 0
      bottom 0
      z-index 9
      background rgba(0,0,0,0.7)
      color #fff
      .thisTitle
        width 100%
        line-height 30px
        border-top 1px solid #fff
        border-bottom 1px solid #fff
.each_content:nth-of-type(2n+1)
  margin-right 2%

</style>
