<template>
  <div id='app' :class='`xin-website-${userAgent}`'>
    <navMain
      :userAgent='userAgent'
    />
<!--    <Openai  :userAgent='userAgent' />-->
    <keep-alive>
      <router-view
        v-if='$route.meta.keepAlive'
        :userAgent='userAgent'
        :class='`${userAgent}-body mainBody`'></router-view>
    </keep-alive>
    <router-view
      v-if='!$route.meta.keepAlive'
      :userAgent='userAgent'
      :class='`${userAgent}-body mainBody`'></router-view>
    <footerVue :userAgent='userAgent' />

  </div>
</template>
<script>
import navMain from './common/navigation/navMain'
import footerVue from './common/footerVue/footerVue'
import { gapPadHorizontal, gapPadVertical, gapPhone } from './utils/gapOfWindowWidth'
import Openai from '@/common/openai/index.vue'

export default {
  name: 'App',
  components: {
    navMain,
    footerVue,
    Openai
  },
  data () {
    return {
      userAgent: 'pc'
    }
  },
  methods: {
    checkUserAgent () {
      if (window.innerWidth < gapPadHorizontal) {
        if (window.innerWidth < gapPadVertical) {
          if (window.innerWidth < gapPhone) {
            this.userAgent = 'phone'
          } else {
            this.userAgent = 'pad-v'
          }
        } else {
          this.userAgent = 'pad'
        }
      } else {
        this.userAgent = 'pc'
      }
    }
  },
  mounted () {
    this.checkUserAgent()
    window.addEventListener('resize', this.checkUserAgent)
  },
  computed: {}
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

  .pad-body, .pad-v-body, .phone-body
    margin-top .6rem
</style>
