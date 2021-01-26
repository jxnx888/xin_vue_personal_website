<template>
  <div id="loading_data"><img src="/image/loading.gif" alt="">
    <div class="processingbar">

      <div class="barwidth" :style="{width:progressingBar+'%'}"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "loadingDataProgress",
        props:{
            progressingBar:Number
        },
        mounted() {
            console.log('this.progressingBar:::'+this.progressingBar)
        }
    }
</script>

<style scoped lang="stylus">
  #loading_data
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom:0;
    background:#FFF;
    opacity: .7;
    z-index: 999;
    img,.processingbar
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%)
    .processingbar
      width: 3rem;
      height: .15rem;
      background: #eee;
      top: 60%;
      transform: translate(-50%,-60%);
      margin: auto;border-radius: .075rem;
      .barwidth
        width: 0;
        height: 100%;
        background: #3c763d;
        border-radius: .075rem;

  #loading_data.hideShowMore
    img
      top: 50%;
      left: 47.5%;
      transform: translate(-47.5%,-50%)
    .processingbar
      left: 47.5%;
      transform: translate(-47.5%,-60%)

</style>
