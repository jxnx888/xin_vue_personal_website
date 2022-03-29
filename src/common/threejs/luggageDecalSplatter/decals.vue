<template>
  <div class="decalWrapper">
  <iframe src="/threejs/luggage.html" class="decalsMain" id="decalsMain"></iframe>
  <div class="backBtn" @click="hideSelf()" :class="decaleClosed?'hideMenu':''">Close App</div>
  </div>
</template>

<script>
    export default {
        name: "decals",
        data(){
            return {
                windowWidth:1200,
                windowHeight:500,
                decaleClosed :null,
            }
        },
        methods: {
            checkWindowWH() {
                this.windowWidth = $(window).width();
                this.windowHeight = $(window).height();
                $(".decalsMain,.decalWrapper").css({'width':this.windowWidth,'height':this.windowHeight})
            },
            hideSelf(){
                // this.$parent.showDecals();
                this.$router.push({path:'/projects',query:{jump:'LuggageDecalSplatter'}})
            }
        },
        mounted() {
            this.checkWindowWH();
            window.addEventListener( 'resize', this.checkWindowWH, false );
            this.decaleClosed = document.getElementById("decalsMain").contentWindow.decaleClosed;
        },
        destroyed() {
            window.removeEventListener( 'resize', this.checkWindowWH, false );
        },
        //keep-alive 激活状态，无法销毁监听，需要使用deactivated来销毁
        deactivated() {
            window.removeEventListener( 'resize', this.checkWindowWH, false );
        },

        watch: {
            decaleClosed(newVal,oldVal){
                if(newVal!=oldVal){
                    if(newVal){
                      this.decaleClosed = newVal;
                    }
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
.decalWrapper
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index: 99
  width 100%
  height 100%
  .decalsMain
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index: 99
    width 100%
    height 100%
  .backBtn
    position: fixed;
    top: 0;
    left: 360px;
    width: 130px;
    background: #142d4c;
    padding: 15px;
    text-align: center;
    font-size: 15px;
    color: #14fcff;
    cursor: pointer;
    z-index: 99;
  .backBtn.hideMenu
    left 100px
</style>
