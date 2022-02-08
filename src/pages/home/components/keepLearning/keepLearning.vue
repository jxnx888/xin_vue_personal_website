<template>
  <el-row :class='`main_wrapper clearfix main_wrapper-${userAgent}`'>
    <el-col
      :span='userAgent === "phone"  ? 24 : 10'
      class='left_img'
    >
      <img v-lazy="'/image/home/keep-learning.jpg'" alt=''>
    </el-col>
    <el-col
      :span='userAgent === "phone" ? 24 : 14'
      class='right_info'>
      <div class='text-wrapper'>
      <div class='text keep_title'>
        {{ $t('KEEP_LEARNING[0]') }}
      </div>
      <div class='text dictum'>
        "{{ $t('KEEP_LEARNING[1]') }}"
        <div class='author'> -- {{ $t('KEEP_LEARNING[2]') }}</div>
      </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'keepLearning',
  props: {
    userAgent: String
  }
}
</script>

<style scoped lang='stylus'>
.main_wrapper *
  box-sizing border-box

.main_wrapper
  max-width 1230px
  width 100%
  margin auto auto 84px auto

  .left_img
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
    min-height: 321px;
    text-align left
    padding-left: 50px;
    position relative
    .text-wrapper
      position: absolute;
      top 50%
      transform translateY(-50%)
      margin auto
      .keep_title
        font-size 40px
        font-weight bold
        text-transform uppercase

      .dictum
        padding-top 70px
        font-size: 30px;

        .author
          text-align right
          padding-top 20px;

.main_wrapper-phone
  width 100%

  .left_img
    width 100%
    min-height 2.5rem

    img
      margin: auto;

  .right_info
    min-height 1rem
    width 100%
    padding .15rem
    .text-wrapper
      width: 90%;
      .keep_title
        font-size .18rem
        padding-top .1rem

      .dictum
        font-size .15rem
        padding-top .1rem

        .author
          padding-top .1rem

.main_wrapper-pad,.main_wrapper-pad-v
  padding .15rem

  .left_img
    min-height: 2rem

  .right_info
    min-height: 2rem
    .text-wrapper
      .keep_title
        font-size .22rem

      .dictum
        padding-top: .26rem
        font-size .18rem

</style>
