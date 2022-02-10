<template>
  <div :class='`aboutPart aboutPart-${userAgent}`'>
    <div class='top_intro'>
      <template v-if="userAgent === 'pc'">
        <p>{{ $t('HOME_WELCOME1') }}</p>
        <p>{{ $t('HOME_WELCOME2') }}
<!--          <a
            :href='resumeLink'
            :download='resumeLink'
          >
            {{ $t('RESUME_LOWER') }}
          </a>-->
          <a href='javascript:void(0)' @click="openResume">
            {{ $t('RESUME_LOWER') }}
          </a>
        </p>
        <p>{{ $t('HOME_WELCOME3') }}
          <a :href='mailTo'>{{ $t('EMAIL') }}</a>,</p>
        <p>{{ $t('HOME_WELCOME4') }}
          <router-link to='/contact'>{{ $t('CONTACTPAGE') }}</router-link>
        </p>
      </template>
      <template v-if="userAgent !== 'pc'">
        <p>{{ $t('HOME_WELCOME1') }} {{ $t('HOME_WELCOME2') }}
<!--          <a
            :href='resumeLink'
            :download='resumeLink'
          >
            {{ $t('RESUME_LOWER') }}
          </a>-->
          <a href='javascript:void(0)' @click="openResume">
            {{ $t('RESUME_LOWER') }}
          </a>
          .
          {{ $t('HOME_WELCOME3') }}
          <a :href='mailTo'>{{ $t('EMAIL') }}</a>,{{ $t('HOME_WELCOME4') }}
          <router-link to='/contact'>{{ $t('CONTACTPAGE') }}</router-link>
        </p>
      </template>

    </div>
    <div class='bottom_list' id='homeList'>
      <el-row
        :gutter="20"
        class='detail_list clearfix'>
<!--        <el-col
          :span='(userAgent !== "phone" && userAgent !== "pad-v") ? 8 : 24'
          id='homeAM'
          :class="`${ifAnimation ? 'bounceInLeft animated':''} detail_list_item`"
        >
          <router-link to='/aboutme' class='each_link'>
            <p>{{ $t('ABOUT_ME') }}</p>
            <img v-lazy="`/image/home/aboutme1${userAgent === 'pc' ? '': '-mobile'}.jpg`" :alt="$i18n.t('ABOUT_ME')">
          </router-link>
        </el-col>-->
        <el-col
          :span='(userAgent !== "phone" && userAgent !== "pad-v") ? 8 : 24'
          id='homePj'
          :class="`detail_list_item ${ifAnimation ? 'bounceInLeft animated':''}`"
        >
          <router-link to='/projects' class='each_link'>
            <p>{{ $t('My_PROJECTS') }}</p>
            <img v-lazy="`/image/home/myprojects${userAgent === 'pc' ? '': '-mobile'}.jpg`" alt="$i18n.t('My_PROJECTS')">
          </router-link>
        </el-col>
        <el-col
          :span='(userAgent !== "phone" && userAgent !== "pad-v") ? 8 : 24'
          class='last'
          id='homeSk'
          :class="`detail_list_item ${ifAnimation ? 'bounceIn animated':''}`"
        >
          <router-link to='/skills' class='each_link'>
            <p>{{ $t('MY_SKILLS') }}</p>
            <img v-lazy="`/image/home/myskills${userAgent === 'pc' ? '': '-mobile'}.jpg`" alt="$i18n.t('MY_SKILLS')">
          </router-link>
        </el-col>
      <el-col
          :span='(userAgent !== "phone" && userAgent !== "pad-v") ? 8 : 24'
          class='last'
          id='homeBlog'
          :class="`detail_list_item ${ifAnimation ? 'bounceInRight animated':''}`"
        >
          <router-link to='/blog' class='each_link'>
            <p>{{ $t('BLOG') }}</p>
            <img v-lazy="`/image/home/blog${userAgent === 'pc' ? '': '-mobile'}.jpg`" alt="$i18n.t('MY_SKILLS')">
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aboutPart',
  data() {
    return {
      addAnimation: false
    }
  },
  props: {
    userAgent: String
  },
  methods: {
    checkPosition() {
      //当前滚动位置
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      //当前滚动位置
      let windowHeight = $(window).height()
      //添加动画的元素的开始位置 (防止报错,建议写死)
      var animationPart = $('#homeList').offset().top
      var postionToSee = scrollTop + windowHeight
      // console.log("scrollTop::"+scrollTop)
      // console.log("postionToSee::"+postionToSee)
      // console.log("animationPart::"+animationPart)
      if (postionToSee >= animationPart ) {
        this.addAnimation = true
      } else {
        this.addAnimation = false
      }
    },
    openResume(){
      // this.$refs.pdfView[0].print()
      window.open(`https://ning-xin.com${this.resumeLink}`)
    },
  },
  mounted() {
    window.addEventListener('scroll', this.checkPosition)
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkPosition)
  },
  activated() {
    window.addEventListener('scroll', this.checkPosition)
  },
  deactivated() {
    window.removeEventListener('scroll', this.checkPosition)
  },
  computed: {
    mailTo() {
      return `mailto:${this.$t('EMAIL')}`
    },
    resumeLink() {
      return `${this.$i18n.locale === 'zh_cn' ? '/file/XinNing-Resume-CN.pdf' : '/file/XinNing-Resume-EN.pdf'}`
    },
    ifAnimation() {
      return (this.userAgent === 'pc' ? this.addAnimation : true)
    }
  },
  watch: {}
}
</script>

<style scoped lang='stylus'>
.aboutPart
  .top_intro
    margin: auto;
    text-align: center;
    font-size: 24px;
    color: #5f6464;
    line-height: 54px;
    padding: 105px 0 74px;

  .bottom_list
    max-width: 1240px;
    margin: 0px auto 84px auto;
    height: 250px;

    .detail_list
      .detail_list_item
        //display: inline-block;
        //float: left;
        //height: 250px;
        //max-width: 400px;
        //width 100%
        //text-align: center;
        //margin-right: 20px;
        position: relative;
        overflow: hidden;
        //background: #eee;
        opacity 0
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both
        //@media screen and (max-width: 768px)
        //  height 25vh
        //@media screen and (max-width: 475px)
        //  height 18vh
        .each_link
          width 100%
          p
            display: block;
            float: left;
            font-size: 30px;
            font-weight bold
            height: 40px;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -20px;
            z-index: 3;
            color: #fff;
            border-bottom: 1px solid rgba(255, 255, 255, 0);
            transform: translate(-50%, 0);
            transition: all 0.3s ease-out;
            padding-bottom: 5px;
            -webkit-transition: width 1s linear;

          p:after
            content: ' ';
            width: 0;
            height: 2px;
            background: #fff;
            bottom: 8px;
            left: 0;
            position: absolute;
            opacity: 0;
            -webkit-transition: all 0.2s linear;

          img
            display: block;
            z-index: 1;
            transform: scale(1);
            transition: all 0.3s ease-out;
            //position: absolute;
            //top: 0;
            //bottom: 0;
            //left: 0;
            //right: 0;
            //margin: auto;
            max-width: 100%;
            max-height: 100%;
            min-height: 8vh;
        .each_link:after
          display: block;
          content: "";
          height: 100%;
          width: 100%;
          background: rgba(0, 82, 217, 0.7);
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.3s ease-out;

        .each_link:hover:after
          opacity: 1;

        .each_link:hover img
          transform: scale(1.024);

        .each_link:hover p:after
          opacity: 1;
          left: 0;
          width: 100%;

      .detail_list_item.animated
        opacity 1

.aboutPart-pad,.aboutPart-pad-v, .aboutPart-phone
  .bottom_list
    width 90%
    height auto

.aboutPart-pad,.aboutPart-pad-v
  & *
    font-size .20rem!important

  .top_intro
    font-size .20rem
    padding .5rem .2rem .2rem .2rem
    text-align left
    text-indent: 2em;
  .each_link
    p
      top 62%!important
.aboutPart-pad-v
  .bottom_list
    .detail_list_item
      margin-bottom .2rem!important
.aboutPart-phone
  & *
    font-size .2rem!important

  .top_intro
    width 95%
    text-align left
    text-indent: 1em;
    padding .2rem .15rem
  .bottom_list
    margin-bottom .2rem!important
    .detail_list
      .detail_list_item
        margin-bottom .15rem!important
</style>
