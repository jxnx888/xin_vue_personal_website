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
    <div class="project_main clearfix">
      <div v-for="(value,key,index) in projectsJson"
           :key="index"
           class="each_career clearfix">
        <h1 :id="key.replace(/ /g,'')" class="company_name">
          <p class="jobTitle">{{value.jobtitle}}</p>
          <p class="jobCompany">-- {{value.companyName}}</p>
          <p class="jobduration">-- {{value.startDate}} - {{value.endDate}} ({{value.duration}}) </p>
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
    import threeDBuilder from '../../common/threejs/threeDBuilder/ThreeDimensionalBuilder'
    import mobileThreeDBuilder from '../../common/threejs/threeDBuilder/mobileThreeDimensionalBuilder'
    import forFun from "@/common/forFun/forFun";
    export default {
        name: "projects",
        components: {
            topBanner,
            projectTem,
            threeDBuilder,
            mobileThreeDBuilder,
            forFun
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

                if(scrollTop>=oriMoveTopP && (scrollTop)<=(moveBottomP-animation_menu_Height)){
                    this.scrollingMenu = true;//菜单固定class
                    const menuArr = this.menuArr;
                    for (var i in menuArr) {
                        var thisOffsetTop = $('#' + menuArr[i].replace(/ /g,'')).offset().top;
                        if (scrollTop >= thisOffsetTop) { //检测滚动距离，记录下方距离最近的一个id
                            this.activeMenuIndex = i;
                        }
                    }
                    $(".scrollMenu").css("top",scrollTop-oriMoveTopP+40);
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
            }
        },
        mounted() {
            this.getProject();
            this.getForFun();
            window.addEventListener('scroll', this.menuScroll)
            this.mobile=/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
        },
        destroyed () {
            window.addEventListener('scroll', this.menuScroll)
        }
    }
</script>

<style scoped lang="stylus">
.project_wrapper
  .project_main
    width: 1200px;
    margin: 0px auto;
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
        .jobCompany
          font-size .15rem
          line-height .2rem
          color #999
        .jobduration
          font-size .15rem
          color #999
          line-height .2rem
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
