<template>
  <div class="skill_wrapper">
    <meteorShower></meteorShower>
    <snowMeteor></snowMeteor>
    <!--<topBanner
      :bannerImg="'/image/banner3.png'"
      :bannerContent="''"></topBanner>-->
    <div class="skill_container">
      <h1 class="title">{{$t('skills.infor[0]')}}</h1>
      <p class="each_info"
         v-for="(item,index) in $t('skills.infor').slice(1)"
         :key="index">
        {{item}}
      </p>
      <div v-if="resetPosition == true" class="resetRandomP"><img :src="imgUrl" alt=""></div>
      <animatedWindow
        :imgUrl="imgUrl"
        ref="child"
        :randomWindow="randomWindow"
        />
      <skillsProgress :key="timer"></skillsProgress>
    </div>
  </div>
</template>

<script>
    import meteorShower from "@/common/meteorShower/meteorShower";
    import snowMeteor from '@/common/meteorShower/snowMeteor.vue';
    import animatedWindow from "@/common/animatedWindow/animatedWindow";
    import skillsProgress from "./components/skillsProgress";
    export default {
        name: "skills",
        components: {
            // topBanner,
            meteorShower,
            snowMeteor,
            skillsProgress,
            animatedWindow,
        },
        data(){
            return {
                timer:'',
                imgUrl:'/image/skills/random.png',
                tet:'Random',
                resetPosition:false,
                randomWindow:false,
            }
        },
        methods:{
            reloadSkill(){
                this.timer = new Date().getTime()
            },
            showRandom(){
                this.resetPosition=false;
                this.$refs.child.moveObj(".child_box",$(".skill_container").width(),$(".skill_container").height());
            }
        },
        mounted() {
            this.showRandom();
        },
        watch:{
            'randomWindow':function(){
                if(0 == this.randomWindow){
                    this.resetPosition=true;
                    console.log("123")
                }
            }
        },
        beforeRouteLeave(to,from,next){
            $(".child_box").find(".close_port").trigger("click");
            next();
        }
    }
</script>

<style scoped lang="stylus">
.skill_wrapper
  position: relative;
  background url("/image/meteorshower.gif")
  .skill_container
    position: relative;
    .title
      font-size .35rem
      color #fff
      padding .2rem
    .each_info
      font-size .2rem
      color #fff
      line-height .3rem
    .resetRandomP
      position: absolute;
      top .1rem
      left .1rem
  .random_color
    cursor pointer
    color #fff
    font-size .18rem
    line-height .3rem
</style>
