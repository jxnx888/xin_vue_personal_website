<template>
  <div class='mobile-nav not-select'>
    <el-row class='nav'>
      <el-col :span='6' class='nav-left'>
        <div class='logo img_wrapper'>
          <router-link to='/'>
            <img src='/image/logo.png' alt="Xin's Website">
          </router-link>
        </div>
      </el-col>
      <el-col :span='5' :offset='10' class='nav-lang'>
        <div class='lang_area'>
          <a class='lang_ch eacb_lang' :class="{active_lang:currrent_lang === 'zh_cn'}" lang='zh-cn'
             @click="changeLanguage('zh_cn')">中</a>
          <i class='s_line'>|</i>
          <a class='lang_us eacb_lang' :class="{active_lang:currrent_lang === 'en_us'}" lang='en-us'
             @click="changeLanguage('en_us')">EN</a>
        </div>
      </el-col>
      <el-col :span='3' class='nav-right'>
        <div @click='drawer = true' class='menu iconfont'>&#xe865;</div>
      </el-col>
    </el-row>


    <el-drawer
      title='我是标题'
      :visible.sync='drawer'
      :modal='true'
      :modal-append-to-body='false'
      :size='"80%"'
      :with-header='false'
      class='menu-drawer'>
      <el-row class='each_menu'>
        <el-col :span='6' class='logo img_wrapper'>
          <img src='/image/logo.png' alt="Xin's Website" @click="goTo('/', 1)">
        </el-col>
        <el-col :span='2' :offset='16' class='close-icon'><span  @click='drawer = false' class='iconfont'>&#xe602;</span></el-col>
      </el-row>
      <el-row
        class='each_menu'
        v-for='(item, key) in menuData'
        :key='key'>
        <el-col
          :class="`each_link ${item.routerLink === currentPath?'activeMenu':''}`"
          >
          <div @click='goTo(item.routerLink, item.id)'>
            {{ $t(item.name) }}
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import menuData from '../../menuData.js';
export default {
  name: 'drawerMenu',
  data() {
    return {
      drawer: false,
      currrent_lang: 'en_us', //语言默认值
      navIndex: 0,
      menuData: menuData
    }
  },
  methods: {
    changeLanguage(type) {
      if (type == 'zh_cn') {
        this.$i18n.locale = 'zh_cn'
        this.currrent_lang = 'zh_cn'
        localStorage.setItem('locale', 'zh_cn') // 语言标识
      } else if (type == 'en_us') {
        this.$i18n.locale = 'en_us'
        this.currrent_lang = 'en_us'
        localStorage.setItem('locale', 'en_us') // 语言标识
      }
    },
    getCurrentLang() {
      this.currrent_lang = localStorage.getItem('locale') || 'en_us' // 语言标识
    },
    goTo(path, index) {
      console.log(123)
      this.navIndex = index
      this.drawer = false
      this.$router.push({ path: path })
    }
  },
  mounted() {
    this.getCurrentLang()
  },
  computed: {
    currentPath(){
      return this.$route.fullPath
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    // $route(to, from) {
    //   switch (to.name) {
    //     case 'Skills':
    //       this.navIndex = 2
    //       break
    //     case 'Projects':
    //       this.navIndex = 3
    //       break
    //     case 'Aboutme':
    //       this.navIndex = 4
    //       break
    //     case 'Blog':
    //       this.navIndex = 5
    //       break
    //     case 'Contact':
    //       this.navIndex = 6
    //       break
    //     default:
    //       this.navIndex = 1
    //   }
    // }
  }
}
</script>

<style scoped lang='stylus'>
.mobile-nav
  position: fixed;
  top 0
  left 0
  right 0
  z-index 10
  background #FFF
  box-shadow: 0 0.005rem 0.1rem rgb(28 28 28 / 20%);
  -webkit-box-shadow: 0 0.005rem 0.1rem rgb(28 28 28 / 20%);
  & *
    touch-action: none;
  .nav
    height .6rem

    .nav-left
      height 100%

      .logo
        height 100%

        img
          height 80%

    .nav-right
      height 100%
      position: relative;

      &:before
        content ' '
        width 1px
        height 80%
        background #dbdbdb
        position: absolute;
        left 0
        top: 50%;
        transform: translateY(-50%);

      .menu
        font-size: 0.3rem;
        height: 0.3rem;
        width: 0.3rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)

    .nav-lang
      height 100%

      .lang_area
        height: 100%;
        line-height: .6rem;

        a.eacb_lang
          height 100%
          color #333
          opacity .7
          position relative

        a.active_lang
          opacity 1
          font-weight bold

        .s_line
          color #333
          opacity .7
          padding 0 10px
          font-style: italic;


  .menu-drawer
    .each_menu
      height .6rem
      border-bottom: 1px solid #c3bdbd;

      .logo
        height 100%

        img
          height 80%

      .close-icon
        text-align center
        line-height: .56rem;

      .each_link
        height 100%
        line-height .6rem
        text-align left
        color #333
        padding 0 .15rem
        position: relative;
        font-weight bold
        opacity .6

        &.activeMenu
          opacity 1

</style>
