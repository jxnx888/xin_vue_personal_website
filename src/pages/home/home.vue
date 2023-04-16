<template>
  <div>
    <topBannerSwiper
      v-if='bannerList.length>1'
      :imgs='bannerList'
      :userAgent='userAgent'
    />
    <topBanner
      v-else
      :bannerList='bannerList'
      :userAgent='userAgent'
    />
    <aboutPart
      :userAgent='userAgent'
    />
    <projects
      v-if='userAgent === "pc"'
      :userAgent='userAgent'
    />
    <mProjects
      v-if='userAgent !== "pc"'
      :userAgent='userAgent'
    />
    <keepLearning
      :userAgent='userAgent'
    />
  </div>
</template>

<script>
import topBannerSwiper from './components/topSwiper/topSwiper.vue'
import topBanner from './components/topBanner/topBanner'
import aboutPart from '@/pages/home/components/aboutPart/aboutPart'
import projects from '@/pages/home/components/projects/projects'
import mProjects from '@/pages/home/components/projects/m-projects'
import keepLearning from '@/pages/home/components/keepLearning/keepLearning'

export default {
  name: 'home',
  components: {
    topBanner,
    topBannerSwiper,
    aboutPart,
    projects,
    mProjects,
    keepLearning
  },
  props: {
    userAgent: String
  },
  data() {
    return {
      bannerList: ['/image/banner1.png']
    }
  },
}
</script>

<style scoped lang='stylus'>

</style>
