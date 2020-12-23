<template>
  <div class="each_content col-md-6 col-sm-12 col-xs-12">
    <img :src="bgImg" alt="" class="each_img">
    <div class="info_wrapper">
      <div>{{titleInf}}</div>
      <div>{{desc}}</div>
      <div>{{tags}}</div>
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
  min-height 390px;
  cursor pointer
  position: relative;
  margin-bottom 20px
  .each_img
    position: absolute;
    top 0
    right 0
    left 0
    bottom 0
    margin: auto;
    max-width: 100%;
    max-height: 100%;
</style>
