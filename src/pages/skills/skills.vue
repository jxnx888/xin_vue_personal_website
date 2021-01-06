<template>
  <div class="skill_wrapper">
    <topBanner
      :bannerImg="'/image/banner3.png'"
      :bannerContent="''"></topBanner>
    <div class="skill_container">
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
    import topBanner from "@/common/topStaticBanner/topBanner";
    import animatedWindow from "@/common/animatedWindow/animatedWindow";
    import skillsProgress from "./components/skillsProgress";
    export default {
        name: "skills",
        components: {
            topBanner,
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
            },
            resetRandomPosition(){
              this.resetPosition=true;
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
  background #333
  .skill_container
    position: relative;
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
