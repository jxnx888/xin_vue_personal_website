<template>
  <div class="nav_wrapper">
    <div class="main_wrapper">
      <div class="logo img_wrapper">
        <img src="/image/logo.png" alt="">
      </div>
      <div class="rigth_menu">
        <div class="each_menu">
          <router-link to="/threeDimensionalBuilder" class="each_link">3DBuilder</router-link>
        </div>
        <div class="each_menu">
          <router-link to="/" class="each_link">{{$t('nav.home')}}</router-link>
        </div>
        <div class="each_menu">
          <router-link to="/skills" class="each_link">{{$t('nav.skills')}}</router-link>
        </div>
        <div class="each_menu">
          <router-link to="/projects" class="each_link">{{$t('nav.Projects')}}</router-link>
        </div>
        <div class="each_menu">
          <router-link to="/aboutme" class="each_link">{{$t('nav.AboutMe')}}</router-link>
        </div>
        <div class="each_menu last_menu">
          <router-link to="/contact" class="each_link">{{$t('nav.contact')}}</router-link>
        </div>
        <div class="lang_area">
          <a class="lang_ch" :class="{active_lang:currrent_lang === 'zh_cn'}" lang="zh-cn" @click="changeLanguage('zh_cn')">中文</a>
          <i class="s_line">|</i>
          <a class="lang_us" :class="{active_lang:currrent_lang === 'en_us'}"  lang="en-us" @click="changeLanguage('en_us')">English</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "navEl",
      data(){
          return{
            currrent_lang: 'en_us', //语言默认值
          }

      },
      methods:{
        changeLanguage(type) {
          if(type=="zh_cn"){
            this.$i18n.locale = "zh_cn";
            this.currrent_lang ="zh_cn";
            localStorage.setItem('locale', 'zh_cn'); // 语言标识
          }
          else if(type=='en_us'){
            this.$i18n.locale = "en_us"
            this.currrent_lang ="en_us";
            localStorage.setItem('locale','en_us'); // 语言标识
          }
        },
        getCurrentLang(){
          this.currrent_lang = localStorage.getItem('locale') || 'en_us'; // 语言标识
        }
      },
      mounted() {
        this.getCurrentLang();
      }
    }
</script>

<style scoped lang="stylus">
.nav_wrapper
  box-shadow: 0 0 3px #aaabaf;
  margin-bottom 2px
  .main_wrapper
    width 1200px;
    height: 120px;
    margin auto
    .logo
      float left
      width 1.6rem
      height 1.13rem
      margin-top 0.07rem
    .rigth_menu
      float right
      line-height: 1.2rem
      .each_menu
        float left
        position relative
        padding: 0 .15rem
        font-size: .18rem
        .each_link
          color #333333
          padding 0 .15rem
      .each_menu:after
        content "|"
        position absolute
        top -1px
        right 0
        color #E4E4E4
      .each_menu.last_menu:after
        display none
      .lang_area
        cursor pointer
        margin-left 20px
        float left
        position relative
        padding: 0 15px
        font-size: 18px
        a
          color #333
          opacity .7
        a.active_lang
          opacity 1
        .s_line
          color #333
          opacity .7
          padding 0 10px

</style>
