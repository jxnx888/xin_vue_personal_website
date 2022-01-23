<template>
  <div :class='`clearfix blog blog-${$root.$userAgent}`'>
    <topBanner
      :bannerImg="'/image/banner3.png'"
      :bannerSlice = "bannerSlice"
    />
    <div class='blog-container'>
      <div :class='`left-side left-side-${$root.$userAgent}`'>
        <div class='article'>{{$t('ARTICLES')}} <span class='article-type' v-if='$route.query.tag'>({{ $route.query.tag }})</span> {{totalArticle}}</div>
        <router-view :key="$route.fullPath" :blogData='blogData' @getTotalArticle='getTotalArticle($event)' /> <!--用于子路由渲染-->
      </div>
      <div class='right-side'>
        <blogSide :blogData='blogData' />
      </div>
    </div>
    <el-backtop class='back-top' target=".article"></el-backtop>
  </div>
</template>

<script>
import topBanner from '@/common/topStaticBanner/topBanner'
import blogSide from './components/blogSide'

export default {
  name: 'blog',
  components: {
    topBanner,
    blogSide
  },
  data() {
    return {
      blogData: [],
      totalArticle: null,
      currentType: null
    }
  },
  methods: {
    getBlog() {
      var url = '/mock/blogEN.json'
      var lang = this.$i18n.locale
      if ('zh_cn' === lang) {
        url = '/mock/blogCN.json'
      }
      this.$ajax.get(url) // npm run build ==>  ./static/mock/index.json
        .then(this.getBlogSucc)
        .catch(function(res) {
          console.log('error:' + res)
        })
    },
    getBlogSucc(res) {
      // console.log(res)
      if (res.data.code === 200) {
        const data = res.data.data
        this.blogData = data
        // console.log(this.blogData, 'this.blogData')
      }
    },
    getTotalArticle(count){
      this.totalArticle = `(${count})`
    },
    getCurrentType(type){
      this.currentType = type
    }
  },
  mounted() {

  },
  created() {
    this.getBlog()
  },
  computed:{
    bannerSlice(){
      if(this.$route.name === 'BlogDetail'){
        return 2
      } else{
        return null
      }
    }
  },
  watch: {
    '$i18n.locale'(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getBlog()
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
.blog
  .blog-container
    max-width: 1200px;
    margin auto

    .left-side.left-side-pad-v,.left-side.left-side-phone
      width 100%
    .left-side
      width 70%
      float left
      padding .15rem
      line-height 1.6
      font-size: 14px;
      .article
        text-align left
        font-size .2rem
        font-weight bold
        position: relative;
        &::after
          content ' '
          position: absolute;
          left 0
          bottom 0
          width 100%
          height 1px
          border-bottom 1px solid #999
        .article-type
          font-size .15rem
          font-weight normal
          color #999
      .blog-title
        text-align center

    .right-side
      width 25%
      float right
      padding .15rem
</style>
