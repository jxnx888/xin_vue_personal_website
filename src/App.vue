<template>
  <div id='app' :class='`xin-website-${$root.$userAgent}`'>
    <navMain></navMain>
    <keep-alive>
      <router-view
        v-if='$route.meta.keepAlive'
        :class="`${$root.$userAgent}-body ${this.$root.windowWidth ? '':'mobileBody'} mainBody`"></router-view>
    </keep-alive>
    <router-view
      v-if='!$route.meta.keepAlive'
      :class="`${$root.$userAgent}-body ${this.$root.windowWidth ? '':'mobileBody'} mainBody`"></router-view>
    <footerVue></footerVue>
  </div>
</template>
<script>
import navMain from './common/navigation/navMain'
import footerVue from './common/footerVue/footerVue'
import { gapPad, gapPhone } from './utils/gapOfWindowWidth'
export default {
  name: 'App',
  components: {
    navMain,
    footerVue
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.$root.windowWidth = (window.innerWidth > gapPad) // 992 pc菜单最小宽度（加滚动条）
      let userAgent = 'pc'
      if (window.innerWidth < gapPad) {
        userAgent = 'pad'
        if (window.innerWidth < gapPhone) {
          userAgent = 'phone'
        }
      }
      this.$root.userAgent = userAgent
    })
  }
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
