<template>
  <div class="aboutPart">
    <div class="top_intro">
      <p>{{ $t('home.welcome[0]') }}</p>
      <p>{{ $t('home.welcome[1]') }}
        <a :href="resumeLink" download="/file/XinNing-Resume-CN.pdf">{{ $t('home.welcome[2]') }}</a>
        <!--{{ $t('home.welcome[3]') }}
        <a :href="resumeLink" download="/file/XinNing-Resume-CN.pdf">{{ $t('home.welcome[4]') }}</a>-->.</p>
      <p>{{ $t('home.welcome[5]') }}
        <a href="mailto:jxnx888@hotmail.com">jxnx888@hotmail.com</a>,</p>
      <p>{{ $t('home.welcome[6]') }}
      <router-link to="/contact">{{ $t('home.welcome[7]') }}</router-link>
      </p>
    </div>
    <div class="bottom_list" id="homeList">
      <ul class="detail_list clearfix">
        <li id="homeAM" :class="addAnimation?'bounceInLeft animated':''">
          <router-link  to="/aboutme" class="each_link">
            <p>{{ $t('home.aboutme') }}</p>
            <img v-lazy="'/image/home/aboutme1.jpg'" alt="">
          </router-link>
        </li>
        <li id="homePj" :class="addAnimation?'bounceIn animated':''">
          <router-link  to="/projects" class="each_link">
            <p>{{ $t('home.myprojects') }}</p>
            <img v-lazy="'/image/home/myprojects.jpg'" alt="">
          </router-link>
        </li>

        <li class="last" id="homeSk" :class="addAnimation?'bounceInRight animated':''">
          <router-link  to="/skills" class="each_link">
            <p>{{ $t('home.myskills') }}</p>
            <img v-lazy="'/image/home/myskills.jpg'" alt="">
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutPart",
    data() {
        return {
            resumeLink:'/file/XinNing-Resume-CN.pdf',
            addAnimation:false,
        }
    },
    methods: {
        checkPosition() {
            //当前滚动位置
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            //当前滚动位置
            let windowHeight = $(window).height();
            //添加动画的元素的开始位置 (防止报错,建议写死)
            var animationPart = $("#homeList").offset().top;
            var postionToSee = scrollTop+windowHeight;
            // console.log("scrollTop::"+scrollTop)
            // console.log("animationPart::"+animationPart)
            if(postionToSee>=animationPart){
                this.addAnimation=true;
            }
            else{
                this.addAnimation=false;
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.checkPosition);
    },
    destroyed() {
        window.removeEventListener('scroll', this.checkPosition);
    },
    activated() {
        window.addEventListener('scroll', this.checkPosition);
    },
    deactivated() {
        window.removeEventListener('scroll', this.checkPosition);
    },
    watch: {
        '$i18n.locale'(newValue, oldValue) {
            if(newValue!=oldValue)   {
                if('zh_cn' == newValue){
                    this.resumeLink = '/file/XinNing-Resume-CN.pdf';
                }
                else{
                    this.resumeLink = '/file/XinNing-Resume-EN.pdf';
                }
            }
        }
    }
}
</script>

<style scoped lang="stylus">
.aboutPart
  .top_intro
    width: 1200px;
    margin: auto;
    text-align: center;
    font-size: 24px;
    color: #5f6464;
    line-height: 54px;
    padding: 105px 0 74px;
  .bottom_list
    width: 1240px;
    margin: 0px auto 84px auto;
    height: 250px;
    .detail_list
      li
        display: inline-block;
        float: left;
        height: 250px;
        width: 400px;
        text-align: center;
        margin-right: 20px;
        position: relative;
        overflow: hidden;
        background: #eee;
        opacity 0
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both
        .each_link
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
            border-bottom: 1px solid rgba(255,255,255,0);
            transform: translate(-50%,0);
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
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            max-width: 100%;
            max-height: 100%;

        .each_link:after
          display: block;
          content: "";
          height: 100%;
          width: 100%;
          background: rgba(0,82,217,0.7);
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
      li.last
        margin-right 0
      li.animated
        opacity 1
</style>
