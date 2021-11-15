<template>
<div :class="`main_wrapper clearfix main_wrapper-${this.$root.userAgent}`">
  <div class="left_img">
    <img v-lazy="'/image/home/keep-learning.jpg'" alt="">
  </div>
  <div class="right_info">
    <div class="text keep_title">
      {{$t('KEEP_LEARNING[0]')}}
    </div>
    <div class="text dictum">
      "{{$t('KEEP_LEARNING[1]')}}"
      <div class="author"> --  {{$t('KEEP_LEARNING[2]')}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "keepLearning"
}
</script>

<style scoped lang="stylus">
.main_wrapper *
  box-sizing border-box
.main_wrapper
  max-width 1230px
  width 100%
  margin auto auto 84px auto
  .left_img
    float left
    width 40%
    min-height: 321px;
    position relative
    img
      position: absolute;
      top 0
      left 0
      right: 0
      bottom 0
      max-height: 100%
      max-width 100%
  .right_info
    float: left;
    width 60%
    min-height: 321px;
    text-align left
    padding-left: 50px;
    .keep_title
      font-size 40px
      font-weight bold
      text-transform uppercase
      padding-top: 65px;
    .dictum
      padding-top 70px
      font-size: 30px;
      .author
        text-align right
        padding-top 20px;
.main_wrapper-phone
  width 100%
  .left_img
    float none
    width 100%
    min-height 2.5rem
    img
      margin: auto;
  .right_info
    min-height auto
    float none
    width 100%
    padding .15rem
    .keep_title
      font-size .18rem
      padding-top .1rem
    .dictum
      font-size .15rem
      padding-top .1rem
      .author
        padding-top .1rem
.main_wrapper-pad
  padding .15rem
  .left_img
    min-height: 2rem
  .right_info
    min-height: 2rem
    .keep_title
      font-size .22rem
    .dictum
      padding-top: .26rem
      font-size .18rem

</style>
