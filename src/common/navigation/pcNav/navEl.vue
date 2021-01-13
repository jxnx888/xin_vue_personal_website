<template>

  <div class="nav_wrapper" :class="[fixedShow?'fixedShow':'',fixedHide?'fixedHide':'']">
    <div class="main_wrapper">
      <div class="logo img_wrapper">
        <router-link to="/">
          <img src="/image/logo.png" alt="Xin's Website">
        </router-link>
      </div>
      <div class="rigth_menu">
        <div class="each_menu" :class="'1' == navIndex?'activeMenu':''">
          <router-link to="/" class="each_link">{{$t('nav.home')}}</router-link>
        </div>
        <div class="each_menu" :class="'2' == navIndex?'activeMenu':''">
          <router-link to="/skills" class="each_link">{{$t('nav.skills')}}</router-link>
        </div>
        <div class="each_menu" :class="'3' == navIndex?'activeMenu':''">
          <router-link to="/projects" class="each_link">{{$t('nav.Projects')}}</router-link>
        </div>
        <div class="each_menu" :class="'4' == navIndex?'activeMenu':''">
          <router-link to="/aboutme" class="each_link">{{$t('nav.AboutMe')}}</router-link>
        </div>
        <div class="each_menu last_menu" :class="'5' == navIndex?'activeMenu':''">
          <router-link to="/contact" class="each_link">{{$t('nav.contact')}}</router-link>
        </div>
        <div class="lang_area">
          <a class="lang_ch" :class="{active_lang:currrent_lang === 'zh_cn'}" lang="zh-cn"
             @click="changeLanguage('zh_cn')">中文</a>
          <i class="s_line">|</i>
          <a class="lang_us" :class="{active_lang:currrent_lang === 'en_us'}" lang="en-us"
             @click="changeLanguage('en_us')">English</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "navEl",
        data() {
            return {
                currrent_lang: 'en_us', //语言默认值
                navIndex: 0,
                lastScrollTop: 0,
                fixedHide:false,
                fixedShow:false,
            }

        },
        methods: {
            changeLanguage(type) {
                if (type == "zh_cn") {
                    this.$i18n.locale = "zh_cn";
                    this.currrent_lang = "zh_cn";
                    localStorage.setItem('locale', 'zh_cn'); // 语言标识
                } else if (type == 'en_us') {
                    this.$i18n.locale = "en_us"
                    this.currrent_lang = "en_us";
                    localStorage.setItem('locale', 'en_us'); // 语言标识
                }
            },
            getCurrentLang() {
                this.currrent_lang = localStorage.getItem('locale') || 'en_us'; // 语言标识
            },
            navPosition() {
                const navHeight = 100;//$(".nav_wrapper").height();
                const scrollTop = $(window).scrollTop();
                if (scrollTop >= navHeight) {
                    console.log(123)
                    this.fixedHide = true;
                    if(scrollTop-this.lastScrollTop<=0){
                        this.fixedShow = true;
                    }
                    else{
                        this.fixedShow = false;
                    }
                }
                else{
                    this.fixedHide = false;
                }
                this.lastScrollTop = scrollTop
            }
        },
        mounted() {
            this.getCurrentLang();
            window.addEventListener('scroll', this.navPosition);
        },
        destroyed() {
            window.removeEventListener('scroll', this.navPosition); // 销毁监听
        },
        watch: {
            $route(to, from) {
                console.log("to:")
                console.log(to)
                console.log("from:")
                console.log(from)
                switch (to.name) {
                    case 'Skills':
                        this.navIndex = 2;
                        break;
                    case 'Projects':
                        this.navIndex = 3;
                        break;
                    case 'Aboutme':
                        this.navIndex = 4;
                        break;
                    case 'Contact':
                        this.navIndex = 5;
                        break;
                    default:
                        this.navIndex = 1;
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
  .nav_wrapper
    box-shadow: 0 0 3px #aaabaf;
    margin-bottom 2px
    position absolute
    top 0
    left 0
    right 0
    z-index 10
    background #FFF
    transition: all 0.2s linear;
    -webkit-transition: all 0.2s linear;
    -moz-transition: all 0.2s linear;
    -ms-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    .main_wrapper
      width 1200px;
      height: 1rem;
      margin auto

      .logo
        float left
        width 1.6rem
        height 1rem

      .rigth_menu
        float right
        line-height: 1rem

        .each_menu
          float left
          position relative
          padding: 0 .15rem
          font-size: .18rem

          .each_link
            color #333
            margin 0 .15rem
            position: relative;
            font-weight bold
            opacity .6

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
            position relative

          a:hover
            opacity: 1;

          a.active_lang
            opacity 1

          .s_line
            color #333
            opacity .7
            padding 0 10px

        .each_menu
          a:

          :after
            display: block;
            content: "";
            height: .04rem;
            width: 100%;
            position: absolute;
            bottom: -.15rem
            left: 0;
            background: #194ac3;
            opacity: 0;
            -webkit-transition: transform 0.2s ease-out, opacity 0.2s ease-out;
            transform-origin: 50% 0%;
            transform: scale(0.01, 1);

          a:hover
            opacity 1

          a:hover::after
            transform: scale(1, 1);
            opacity: 1;

        .each_menu.activeMenu
          a
            opacity 1

  .nav_wrapper.fixedHide
    position: fixed;
    top -100px;
    left 0
    right 0

  .nav_wrapper.fixedShow
    position: fixed;
    top 0
    left 0
    right 0

</style>
