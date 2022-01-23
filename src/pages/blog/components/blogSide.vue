<template>
  <div :class="`blog-side ${fixedShow ? 'fixedShow':''} ${fixedHide ? 'fixedHide':''}`" ref='BlogSide'>
    <div class='type-list'>
      <div class='article'>{{ $t('MY_TAGS') }}</div>
      <div class='type-list-wrapper'>
        <div
          v-for='(value, key, index) in typeList'
          :key='index'
          :class='`each_type ${key === tag ? "active-tag":""}`'
          @click="goToPage(key)"
        >
          {{ key }} ({{ value }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogSide',
  props: {
    blogData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      blogNewData: [],
      typeList: {},
      tag: null,
      lastScrollTop: 0,
      fixedHide: false, // nav是否隐藏
      fixedShow: false, // nav显示
    }
  },
  methods: {
    getTypeList() {
      let _this = this
      let data = this.blogNewData
      let obj = {}
      data && data.forEach((item) => {
        //执行代码
        let type = item.type
        for (let i in type) {
          let filterArr = Object.keys(obj).filter((keyItem) => keyItem === type[i])
          if (filterArr.length) {
            obj[type[i]] = obj[type[i]] + 1
          } else {
            obj[type[i]] = 1
          }
        }
      })
      _this.typeList = obj
    },
    checkParams(){
      this.tag = this.$route.query.tag
    },
    sidePosition(){
      const navHeight = document.getElementsByClassName('nav_wrapper')[0].scrollHeight // 100 $(".nav_wrapper").height();
      const bannerHeight = document.getElementsByClassName('banner')[0].scrollHeight;
      const scrollTop = $(window).scrollTop()
      if (scrollTop >= (navHeight + bannerHeight)) {
        this.fixedHide = true
        this.fixedShow = scrollTop - this.lastScrollTop <= 0;
      } else {
        this.fixedHide = false
        this.fixedShow = false
      }
      this.lastScrollTop = scrollTop
    },
    goToPage(tag){
      if(this.$route.query.tag === tag ) {
        return
      }
      this.$router.push({path:'/blog/list',query: { tag: tag }})
    }

  },
  mounted() {
    this.checkParams()
    window.addEventListener('scroll', this.sidePosition)
  },
  destroyed() {
    window.removeEventListener('scroll', this.sidePosition) // 销毁监听
  },
  //keep-alive 激活状态，无法销毁监听，需要使用deactivated来销毁
  deactivated() {
    window.removeEventListener('scroll', this.sidePosition) // 销毁监听
  },
  watch: {
    blogData(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.blogNewData = newValue
        this.getTypeList()
      }
    },
    $route: {
      handler: function(val){
        if(val){
          this.checkParams()
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  computed: {}
}
</script>

<style scoped lang='stylus'>
.blog-side
  .type-list
    .article
      text-align left
      font-size .2rem
      font-weight bold
      line-height: 1.6;
      position: relative;
      &::after
        content ' '
        position: absolute;
        left 0
        bottom 0
        width 100%
        height 1px
        border-bottom 1px solid #999
    .type-list-wrapper
      margin .2rem auto

      .each_type
        display block
        text-align left
        line-height .2rem
        cursor: pointer;
      .active-tag
        color #999
        cursor not-allowed
.blog-side.fixedHide
  position: fixed;
  top .1rem
.blog-side.fixedShow
  position: fixed;
  top 1rem
a
  color #2c3e50
  &:hover
    color #2c3e50
    text-decoration underline
</style>
