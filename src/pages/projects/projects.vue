<template>
  <div class="project_wrapper clearfix">
    <div class="project_banner">
      <topBanner
        :bannerImg="'/image/banner2.png'"
        :bannerContent="$t('projects.bannerInfo')"></topBanner>
    </div>
    <threeDBuilder v-if="showTD && !mobile" :key="timer"></threeDBuilder>
    <mobileThreeDBuilder v-if="showTD && mobile" :key="timer"></mobileThreeDBuilder>
    <forFun v-if="showTester" :key="timer" :forFunJson="forFunJson"></forFun>
    <luggageDecalSplatter  v-if="showDecal" :key="timer" ></luggageDecalSplatter>
    <div class="project_main clearfix">
      <div v-for="(value,key,index) in projectsJson"
           :key="index"
           class="each_career clearfix">
        <h1 :id="key.replace(/ /g,'')" class="company_name">
          <div class="jobTitle">{{value.jobtitle}}</div>
          <div class="jobCompany">-- {{value.companyName}}</div>
          <div class="jobduration">-- {{value.startDate}} - {{value.endDate}} ({{value.duration}}) </div>
          <div class="jobResponsibilities">
            -- Responsibilities
            <ul>
              <li v-for="(resp,rIndex) in value.responsibilities"
                  :key="rIndex">
                {{resp}}
              </li>
            </ul>
          </div>
        </h1>
        <projectTem
          v-for="childItem of value.projects"
          :key="childItem.id"
          :bgImg="childItem.img"
          :titleInf="childItem.title"
          :desc="childItem.desc"
          :tags="childItem.tags"
          :link="childItem.url"
          :code="childItem.code"
        :showTD="showTD"
          :id="childItem.title.replaceAll(' ','')"
      ></projectTem>
    </div>
    <div class="animation_menu" :class="scrollingMenu? 'scrollMenu':''"  v-if="!mobile">
      <div class="each_company_menu"
           v-for="(item, index) in menuArr"
           :key='index'
           :class="activeMenuIndex == index ? 'active_menu':''"
           @click="jumpToRelate(item.replace(/ /g,''),index)"
      >{{item}}
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    import topBanner from "@/common/topStaticBanner/topBanner";
    import projectTem from './components/projectTem'
    import threeDBuilder from '@/common/threejs/threeDBuilder/ThreeDimensionalBuilder'
    import mobileThreeDBuilder from '@/common/threejs/threeDBuilder/mobileThreeDimensionalBuilder'
    import forFun from "@/common/forFun/forFun";
    import luggageDecalSplatter from "@/common/threejs/luggageDecalSplatter/decals";
    export default {
        name: "projects",
        components: {
            topBanner,
            projectTem,
            threeDBuilder,
            mobileThreeDBuilder,
            forFun,
            luggageDecalSplatter
        },
        data() {
            return {
                projectsJson: {},
                forFunJson: {},
                menuArr: [],
                scrollingMenu:false,
                activeMenuIndex:0,
                mobile:false,
                showTD:false,
                showTester:false,
                showDecal:false,
                timer:'',
            }
        },
        methods: {
            getProject() {
                var url = '/mock/projects.json';
                var lang = this.$i18n.locale;
                if( 'zh_cn' == lang){
                    url = '/mock/projectsCN.json';
                }
                this.$ajax.get(url) // npm run build ==>  ./static/mock/index.json
                    .then(this.getProjectSucc)
                    .catch(function (res) {
                        console.log("error:" + res)
                    })
            },
            getProjectSucc(res) {
                console.log(res);
                if (res.data.code == 200) {
                    const data = res.data.data;
                    this.projectsJson = data;
                    for (let i in data) {
                        this.menuArr.push(i)
                    }
                }
            },
            jumpToRelate(id,index) {
                $("html,body").scrollTop($("#"+id).offset().top)
                this.activeMenuIndex = index;
                this.menuScroll()
            },
            menuScroll(){
                //当前滚动位置
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
                //滚动菜单的高度
                var animation_menu_Height = $(".animation_menu").height();
                // project_main 的整体的开始位置 防止报错,写死
                var oriMoveTopP = $(".project_main").offset().top;
                // project_wrapper可以滚动的最大位置 == project_wrapper顶部位置加高度
                var moveBottomP = oriMoveTopP + $(".project_wrapper").height();

                if(scrollTop>=oriMoveTopP-100 && (scrollTop)<=(moveBottomP-animation_menu_Height)){ //-100 因为动态导航会遮挡右侧菜单
                    this.scrollingMenu = true;//菜单固定class
                    const menuArr = this.menuArr;
                    for (var i in menuArr) {
                        var thisOffsetTop = $('#' + menuArr[i].replace(/ /g,'')).offset().top - 120; //  -100 提前改变菜单
                        if (scrollTop >= thisOffsetTop) { //检测滚动距离，记录下方距离最近的一个id
                            this.activeMenuIndex = i;
                        }
                    }
                    $(".scrollMenu").css("top",scrollTop-oriMoveTopP+140);//40改为140 因为动态导航会遮挡右侧菜单
                }
                else if(scrollTop<oriMoveTopP){
                    this.scrollingMenu = false;
                    this.activeMenuIndex = 0;
                    $(".animation_menu").css("top","50px");
                }
            },
            showThreeD(){
                this.timer = new Date().getTime()
                this.showTD = !this.showTD
            },
            getForFun() {
                var url = '/mock/yuandian.json';
                this.$ajax.get(url) // npm run build ==>  ./static/mock/index.json
                    .then(this.getForFunSucc)
                    .catch(function (res) {
                        console.log("error:" + res)
                    })
            },
            getForFunSucc(res) {
                console.log(res);
                if (res.data.code == 200) {
                    const data = res.data.data;
                    this.forFunJson = data
                }
            },
            showTest(){
                this.timer = new Date().getTime()
                this.showTester = !this.showTester
            },
            showDecals(){
                this.timer = new Date().getTime()
                this.showDecal = !this.showDecal
            },
            resizeDecals(){
                $(".decalsMain,.decalWrapper").css({'width':$(window).width(),'height':$(window).height()})
            },
            checkQuery(){
              if (this.$route.query.jump !== 'null') {
                  const jumpTo = this.$route.query.jump;
                  console.log("has query:" + jumpTo)
                  let inter = setInterval(() => {
                      let target = document.getElementById(jumpTo);
                      if (target) {
                          clearInterval(inter)
                          target.scrollIntoView()
                      }
                  },100)
              }
            }
        },
        mounted() {
            this.getProject();
            this.getForFun();
            window.addEventListener('scroll', this.menuScroll)
            this.mobile=/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
            window.addEventListener( 'resize', this.resizeDecals, false );
            // 判断commentId 是否有值，如果没有的话，就不进行跳转，我这里就用'null'来判断了，你们随意
            // document.querySelector用来获取element，有个坑，id值不能全为数字，否则报错，所以我在id值前面加了id，id格式大致是：id123456
            // scrollIntoView就是用来跳转到锚点的函数
            this.checkQuery()
        },
        //keep-alive 激活状态，缓存不会再走mounted，所以走activated来获取参数
        activated() {
            this.checkQuery()
        },
        destroyed () {
            window.removeEventListener('scroll', this.menuScroll, false)
            window.removeEventListener( 'resize', this.resizeDecals, false );
        },
        //keep-alive 激活状态，无法销毁监听，需要使用deactivated来销毁
        deactivated () {
            window.removeEventListener('scroll', this.menuScroll, false)
            window.removeEventListener( 'resize', this.resizeDecals, false );
        },
        watch: {
            showTester(newValue, oldValue) {
                if(newValue != oldValue){
                    if(newValue == true){
                        $("html").css("overflow",'hidden')
                    }
                    else{
                        $("html").css("overflow",'visible')
                    }
                }
            },
            showTD(newValue, oldValue) {
                console.log(newValue)
                if(newValue != oldValue){
                    if(newValue == true){
                        $("html").css("overflow",'hidden')
                    }
                    else{
                        $("html").css("overflow",'visible')
                    }
                }
            },
            showDecal(newValue, oldValue) {
                if(newValue != oldValue){
                    if(newValue == true){
                        $("html").css("overflow",'hidden')
                    }
                    else{
                        $("html").css("overflow",'visible')
                    }
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
.project_wrapper
  .project_main
    width: 1200px;
    margin: 0px auto 1rem;
    position relative
    @media screen and (max-width: 768px)
      width 100%
    .each_career
      width 980px;
      margin: .3rem auto;
      @media screen and (max-width: 768px)
        width 100%
      .company_name
        text-align left
        font-weight bold
        color #333
        margin .2rem 0
        .jobTitle
          font-size .25rem
          line-height .35rem
          text-shadow: 4px 3px 3px #a28d8d;
        .jobCompany,.jobduration,.jobResponsibilities
          font-size .15rem
          line-height .2rem
          color #999
        .jobResponsibilities
          ul
            li
              font-size .15rem
              color #999
              line-height .2rem
              list-style: initial;
              margin-left .35rem

.animation_menu
      position: absolute;
      top: 50px;
      right: -50px;
      z-index 9
      width: 130px;
      margin:0 auto 20px;
      .each_company_menu
        width: 100%;
        height: 34px;
        line-height: 34px;
        color: #333333;
        font-weight: bold;
        font-size: 14px;
        background: #eee;
        text-align: center;
        cursor: pointer;
        border-radius: 17px;
        margin-bottom: 10px
      .active_menu
        background: #F78C3E;
        color:#FFF
</style>
