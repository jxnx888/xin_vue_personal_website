<template>
  <div class="skill_wrapper">
    <topBanner
      :bannerImg="'/image/banner3.png'"
      :bannerContent="''"></topBanner>
    <div class="random_color" @click="reloadSkill">Random</div>
    <skillsProgress :key="timer"></skillsProgress>
  </div>
</template>

<script>
    import topBanner from "@/common/topStaticBanner/topBanner";
    import skillsProgress from "./components/skillsProgress";
    export default {
        name: "skills",
        components: {
            topBanner,
            skillsProgress
        },
        data(){
            return {
                timer:''
            }
        },
        methods:{
            reloadSkill(){
                this.timer = new Date().getTime()
            }
        }
    }
</script>

<style scoped lang="stylus">
.skill_wrapper
  background #333
  .random_color
    cursor pointer
    color #fff
    font-size .18rem
    line-height .3rem
</style>
