<template>
  <div class="nav_wrapper">
    <div class="main_wrapper">
      <div class="logo img_wrapper">
        <img src="/image/logo.png" alt="">
      </div>
      <div class="rigth_menu">
        <div class="each_menu">
          <router-link to="/" class="each_link">Home</router-link>
        </div>
        <div class="each_menu">
          <router-link to="/" class="each_link">Skills</router-link>
        </div>
        <div class="each_menu">
          <router-link to="/" class="each_link">Projects</router-link>
        </div>
        <div class="each_menu">
          <router-link to="/" class="each_link">About Me</router-link>
        </div>
        <div class="each_menu lang_area">
          <a class="lang_ch" lang="zh-cn" @click="changeLanguage(this)">中文</a>
          <a class="lang_us" lang="en-us" @click="changeLanguage(this)">English</a>
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

          }

      },
      methods:{
        changeLanguage(obj) {
          var targetLocale = $(obj).attr('lang');
          console.log(targetLocale)
          var locale = localStorage.getItem('locale');// 语言标识
          if ($(this).attr('lang') != locale) {
            localStorage.setItem('locale',targetLocale);// 语言标识
            console.log("current language = " +targetLocale)
            // window.location.pathname = window.location.pathname.replace(/^\/(zh\-(cn|hk)|en\-us)?/, '/' + targetLocale);
          }
        }
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
      width 160px
      height 113px
      margin-top 7px
    .rigth_menu
      float right
      line-height: 120px
      .each_menu
        float left
        position relative
        padding: 0 15px
        font-size: 18px
        .each_link
          color #333333
      .each_menu:after
        content "|"
        position absolute
        top -1px
        right 0
        color #E4E4E4
      .each_menu:last-child:after
        display none

</style>
