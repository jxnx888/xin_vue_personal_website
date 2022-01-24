<template>
  <div id='cnblogs_post_body' :class='`blog blog-${$root.$userAgent} clearfix`'>
    <div v-if='currentBlog && currentBlog.content !== ""'>
      <h1 class='blog-title'>{{ currentBlog.title }}</h1>
      <div v-html='currentBlog.content'></div>
    </div>
    <div v-else :style='{textAlign:"center"}'>
      {{ $t('SOMETHING_WRONG') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogTem',
  props: {
    blogData: Array
  },
  data() {
    return {
      blogId: 0,
      currentBlog: []
    }
  },
  methods: {
    getBlogId() {
      this.blogId = this.$route.params.id
      this.currentBlog = this.blogData.find((item) => item.id == this.blogId)
    }
  },
  mounted() {
    this.getBlogId()
  },
  computed: {},
  watch: {
    blogData: {
      immediate: true,    // 这句重要
      handler () {
        this.getBlogId()
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~@/assets/style/blog-common.css'
.blog
  min-height: 80vh;
  text-align left
  max-width: 1200px;
  margin auto

  .left-side
    width 70%
    float left
    padding .15rem
    line-height 1.6
    font-size: 14px;

    .blog-title
      text-align center

  .right-side
    width 25%
    float right
</style>
