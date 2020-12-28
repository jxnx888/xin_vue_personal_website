<template>
<div class="main_wrapper clearfix">
  <div class="left_img">
    <img v-lazy="'/image/home/keep-learning.jpg'" alt="">
  </div>
  <div class="right_info">
    <div class="text keep_title">
      Keep learning, keep growing
    </div>
    <div class="text dictum">
      "Once you stop learning, you start dying."
      <div class="author"> -- Albert Einstein</div>
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
  width 1230px
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
</style>
