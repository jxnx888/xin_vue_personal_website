<template>
  <div :class='`bolg-list bolg-list-${$root.$userAgent} clearfix`'>
    <el-row>
      <div
        v-for='(item, index ) in finalData'
        :key='index'
        class='each-card clearfix'
      >
        <router-link
          :to='`/blog/${item.id}`'
        >
          <el-col :span='7' class='card-img-wrapper'>
            <img
              class='card-img'
              v-lazy='`/image/blog/${item.type[0].toLowerCase()}.jpg`'
              :key='`/image/blog/${item.type[0].toLowerCase()}.jpg/${index}`'
              :alt='item.type[0]'>
          </el-col>
          <el-col :span='17' class='each-blog-info'>
            <h3 class='blog-title'>{{ item.title }}</h3>
            <p class='blog-abstract'>{{ item.abstract }}</p>
            <div class='blog-bottom'>

              <div class='bolg-tags'>
                <span
                  v-for='(tag, tagIndex) in item.type'
                  class='bolg-tag'
                  :key='tagIndex'
                ><em class='iconfont'>&#xe866;</em>{{ tag }}</span>
              </div>

              <div class='blog-time'>{{ $t('POSTED') }} @ {{ item.time }}
                <!--                <span class='blog-read'>{{$t('VIEW')}}(99+)</span>-->
              </div>
            </div>
          </el-col>
        </router-link>
      </div>
    </el-row>
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
      tag: ''
    }
  },
  methods: {},
  mounted() {
    this.tag = this.$route.query.tag
  },
  computed:{
    finalData(){
      let _this = this
      if(_this.tag){
        let final = _this.blogData.filter((item)=>item.type.find((childItem)=>_this.tag === childItem))
        return final
      } else{
        return this.blogData
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

    .blog-title
      font-size: .16rem;
      font-weight: 700;
      color #000
      padding-bottom: .2rem;

    .blog-abstract
      font-size .14rem
      color #333
      line-height .2rem
      padding-bottom: .2rem;

    .blog-bottom
      display: flex;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: space-between;
      align-items: center;

      .bolg-tag
        em.iconfont
          font-size .18rem
          color #d52bb3

      .bolg-tag:nth-of-type(2)
        em.iconfont
          color #52cb9a

      .bolg-tag:nth-of-type(3)
        em.iconfont
          color #0000ff

      .blog-time
        font-size .12rem
        color #666

        .blog-read
          color #666

a
  color #2c3e50

  &:hover
    color #2c3e50
</style>
