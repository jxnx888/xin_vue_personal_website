<template>
  <div :class='`clearfix blog blog-${$root.$userAgent}`'>
    <topBanner
      :bannerImg="'/image/banner3.png'" />
    <div class='blog-container'>
      <div class='left-side'>
        <div class='article'>{{$t('ARTICLES')}}</div>
        <router-view :key="$route.fullPath" :blogData='blogData' /> <!--用于子路由渲染-->
      </div>
      <div class='right-side'>
        <blogSide :blogData='blogData' />
      </div>
    </div>
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
      blogData: []
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
    }
  },
  mounted() {

  },
  created() {
    this.getBlog()
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
      .blog-title
        text-align center

    .right-side
      width 25%
      float right
      padding .15rem
</style>
