<template>
  <div>asdf
<!--    <topSwiper :list="homeTopSwiperList"></topSwiper>-->
  </div>
</template>

<script>
    // import topSwiper from './components/topSwiper/topSwiper'

    export default {
        name: "home",
        components: {
            // topSwiper
        },
        data() {
            return {
                homeTopSwiperList: [],
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
