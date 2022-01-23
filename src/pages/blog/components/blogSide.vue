<template>
  <div class='blog-side'>
    <div class='type-list'>
      <div class='article'>{{ $t('MY_TAGS') }}</div>
      <div class='type-list-wrapper'>
        <router-link
          class='each_type'
          v-for='(value, key, index) in typeList'
          :key='index'
          :to="{path:'/blog/list',query: { tag: key }}"
        >
          {{ key }} ({{ value }})
        </router-link>
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
      typeList: {}
    }
  },
  methods: {
    getTypeList() {
      let _this = this
      let data = this.blogNewData

      let obj = {}
      data && data.forEach((item, index) => {
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
    }

  },
  mounted() {
  },
  watch: {
    blogData(newValue, oldValue) {
      if (newValue != oldValue) {
        this.blogNewData = newValue
        this.getTypeList()
      }
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

a
  color #2c3e50
  &:hover
    color #2c3e50
    text-decoration underline
</style>
