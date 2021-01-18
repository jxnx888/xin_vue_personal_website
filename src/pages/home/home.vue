<template>
  <div>
    <topBannerSwiper :bannerList="bannerList"></topBannerSwiper>
    <aboutPart></aboutPart>
    <projects></projects>
    <keepLearning></keepLearning>
  </div>
</template>

<script>
    import topBannerSwiper from "./components/topBanner/topBanner";
    import aboutPart from "@/pages/home/components/aboutPart/aboutPart";
    import projects from "@/pages/home/components/projects/projects";
    import keepLearning from "@/pages/home/components/keepLearning/keepLearning";
    export default {
        name: "home",
        components: {
            topBannerSwiper,
            aboutPart,
            projects,
            keepLearning
        },
        data() {
            return {
                bannerList: ['/image/banner1.png'],
            }
        },
        methods: {

            getHomeInfo() {
                this.$ajax.get('/mock/index.json') // npm run build ==>  ./static/mock/index.json
                    .then(this.getHomeInfoSucc)
            },
            getHomeInfoSucc(res) {
                 if (res && res.data) {
                    const data = res.data;
                    this.homeTopSwiperList = data.homeTopSwiperList;
                     // console.log("data:" + JSON.stringify(data))
                 }
            }
        },
        mounted() {
            this.getHomeInfo()
        }
    }
</script>

<style scoped lang="stylus">

</style>
