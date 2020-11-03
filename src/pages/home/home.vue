<template>
  <div>
    <topBannerSwiper :bannerList="bannerList"></topBannerSwiper>

  </div>
</template>

<script>
    import topBannerSwiper from "@/common/topBannerSwiper/topBannerSwiper";
    export default {
        name: "home",
        components: {
            topBannerSwiper
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
