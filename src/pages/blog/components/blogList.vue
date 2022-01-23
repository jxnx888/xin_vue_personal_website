<template>
  <div :class='`bolg-list bolg-list-${$root.$userAgent} clearfix`' ref='blogList' id='blogListId'>
    <el-row>
      <el-col
        v-for='(item, index ) in finalData.slice((currentPage-1)*pageSize,currentPage*pageSize)'
        :key='index'
        class='each-card clearfix'
      >
        <router-link :to="{path:`/blog/${item.id}`,query:{page:currentPage,pagesize:pageSize}}">

          <el-col :span='7' class='card-img-wrapper'>
            <img
              class='card-img'
              v-lazy='`/image/blog/${item.type[0].toLowerCase().replace(/ /g,"")}.jpg`'
              :key='`/image/blog/${item.type[0].toLowerCase()}.jpg/${index}`'
              :alt='item.type[0]'>
          </el-col>
          <el-col :span='17' class='each-blog-info'>
            <h3 class='blog-title'>{{ item.title }}</h3>
            <p class='blog-abstract'>{{ item.abstract }}</p>
            <el-row class='blog-bottom'>
              <el-col :span='14' class='bolg-tags'>
                <span
                  v-for='(tag, tagIndex) in item.type'
                  class='bolg-tag'
                  :key='tagIndex'
                ><em class='iconfont' :style='{color:tagColor[tag]}'>&#xe866;</em>{{ tag }}</span>
              </el-col>
              <el-col :span='10' class='blog-time'>{{ $t('POSTED') }} @ {{ item.time }}
                <!--                <span class='blog-read'>{{$t('VIEW')}}(99+)</span>-->
              </el-col>
            </el-row>
          </el-col>
        </router-link>
      </el-col>
    </el-row>
    <el-pagination
      ref='pagination'
      background
      @size-change='handleSizeChange'
      @current-change='handleCurrentChange'
      :hide-on-single-page='false'
      :current-page='currentPage'
      :page-sizes='[5, 10, 20, 40]'
      :page-size='pageSize'
      layout='total, sizes, prev, pager, next, jumper'
      :total='finalData.length'>
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'blogList',
  components: {},
  props: {
    blogData: Array
  },
  data() {
    return {
      tag: '',
      tagColor: {
        'JavaScript': '#fcdc00',
        'TypeScript': '#3178c6',
        'Node.js': '#d52bb3',
        'MongoDB': '#8ad684',
        'IOS': '#000000',
        'Microsoft Exchange Server': '#0272b9'
      },
      currentPage: 1, //初始页
      pageSize: 5    //每页的数据
    }
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pageSize = size
      // 切换size的时候，页面重置
      this.replacePath(1, size)
      this.scrollTop()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.replacePath(currentPage, this.pageSize)
      this.scrollTop()
    },
    // 翻页后滚动条回到页面顶端
    scrollTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    checkParams() {
      this.tag = this.$route.query.tag
      this.currentPage = Number(this.$route.query.page || this.currentPage)
      this.pageSize = Number(this.$route.query.pagesize || this.pageSize)
      this.replacePath(this.currentPage, this.pageSize)
    },
    getArticleCount() {
      this.$emit('getTotalArticle', this.finalData.length)
    },
    replacePath(page, pageSize) {
      let path = this.$route.fullPath
      let paramPage = this.$route.query.page
      let paramSize = this.$route.query.pagesize
      if(paramPage != page || paramSize!=pageSize){
        this.$router.replace({ path, query: { page: page, pagesize: pageSize } })
      }
    }

  },
  created() {
    this.checkParams()
  },
  mounted() {
    this.getArticleCount()
  },
  computed: {
    finalData() {
      let _this = this
      if (_this.tag) {
        return _this.blogData.filter((item) => item.type.find((childItem) => _this.tag === childItem))
      } else {
        return this.blogData
      }
    }
  },
  watch: {
    finalData(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getArticleCount()
      }
    }
  }

}
</script>

<style scoped lang='stylus'>
.bolg-list
  max-width: 1200px;
  text-align left
  margin .2rem auto

  .each-card
    width 100%
    padding .15rem
    border: 1px solid #e9eaec;
    background: #f7f7f7;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    transition: all .2s ease-in-out;
    margin-bottom .2rem
    cursor pointer

    &:hover
      box-shadow: 0 1px 6px #9e9d9d;
      border-color: #eee;

      .blog-title
        text-decoration underline

    .card-img-wrapper
      display block

      .card-img
        max-width: 100%;
        margin auto
        max-height 1.5rem
        border-radius .05rem

    .each-blog-info
      padding-left .15rem

    .blog-title
      font-size: .16rem;
      font-weight: 700;
      color #000
      padding-bottom: .2rem;

    .blog-abstract
      font-size .14rem
      color #333
      line-height .2rem
      overflow: hidden;
      display: -webkit-box;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space: normal;

    .blog-bottom
      display: flex;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: space-between;
      align-items: baseline;
      padding-top: 0.23rem;

      .bolg-tag
        em.iconfont
          font-size .18rem

      //    color #d52bb3
      //
      //.bolg-tag:nth-of-type(2)
      //  em.iconfont
      //    color #52cb9a
      //
      //.bolg-tag:nth-of-type(3)
      //  em.iconfont
      //    color #0000ff

      .blog-time
        font-size .12rem
        color #666
        text-align right

        .blog-read
          color #666

a
  color #2c3e50

  &:hover
    color #2c3e50
</style>
