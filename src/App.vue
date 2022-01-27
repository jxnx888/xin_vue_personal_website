<template>
  <div id='app' :class='`xin-website-${$root.$userAgent}`'>
    <navMain></navMain>
    <keep-alive>
      <router-view
        v-if='$route.meta.keepAlive'
        :userAgent='userAgent'
        :class="`${$root.$userAgent}-body ${this.$root.windowWidth ? '':'mobileBody'} mainBody`"></router-view>
    </keep-alive>
    <router-view
      v-if='!$route.meta.keepAlive'
      :userAgent='userAgent'
      :class="`${$root.$userAgent}-body ${this.$root.windowWidth ? '':'mobileBody'} mainBody`"></router-view>
    <footerVue></footerVue>
  </div>
</template>
<script>
import navMain from './common/navigation/navMain'
import footerVue from './common/footerVue/footerVue'
import  { gapPadHorizontal, gapPadVertical, gapPhone } from './utils/gapOfWindowWidth'
export default {
  name: 'App',
  components: {
    navMain,
    footerVue,
  },
  data(){
    return {
      userAgent: 'pc'
    }
  },
  methods:{
    checkUserAgent(){
      this.$root.windowWidth = (window.innerWidth > gapPadHorizontal) // 992 pc菜单最小宽度（加滚动条）
      if (window.innerWidth < gapPadHorizontal) {
        this.userAgent = 'pad'
        if(window.innerWidth < gapPadVertical){
          this.userAgent = 'pad-v'
          if (window.innerWidth < gapPhone) {
            this.userAgent = 'phone'
          }
        }
      } else {
        this.userAgent = 'pc'
      }
      console.log(this.userAgent,'this.userAgent')
    }
  },
  mounted() {
    this.checkUserAgent()
    window.addEventListener('resize', this.checkUserAgent)}
}
</script>
<style lang='stylus'>
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

  .mainBody
    margin-top 1rem

  .mobileBody
    margin-top .6rem
</style>
