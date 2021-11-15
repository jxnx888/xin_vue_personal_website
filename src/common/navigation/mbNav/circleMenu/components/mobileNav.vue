<template>
  <div class="menu-container">
    <div class="menu-bar-con">
      <button class="menu-bar-btn" @click="isOpenChange" v-bind:class="{'btn-active':isOpen}">
        <span class="icon iconfont">&#xe76e;</span> <!-- change the menu icon -->

      </button>
    </div>
    <ul class="menu-item-list">
      <menu-item
        v-for="item of iconImgArr"
        :key="item.id"
        :radius="radius"
        :index="item.id"
        :angleCur="startAngle+angleStep*(item.id-1)"
        :animationDuration="animationDuration"
        :itemAnimationDelay="0 + (item.id * itemAnimationDelay)"
        :icon="'icon-'+item.iconName"
        :showItem="showItem"
        :isOpen="isOpen"
        :total="iconImgArr.length"
        :currentIndex="currentIndex"
        v-on:showItemChange="showItemChange"
        v-on:isOpenChange="isOpenChange"
        v-on:animationCountIncrease=" (val) => {animationCountIncrease(val)}"
        :link="item.iconLink"
      >
      </menu-item>

    </ul>
  </div>
</template>

<script>
    import item from './navItem'

    export default {
        components: {
            'menu-item': item
        },
        props: {
            startAngle: {
                default: 0
            },
            radius: {
                default: 100
            },
            itemAnimationDelay: {
                default: 0.04
            },
            animationDuration: {
                default: 0.5
            },
            endAngle: {
                default: 315
            },
            itemNum: {
                default: 8
            },
            iconImgArr: Array,
        },
        data() {
            return {
                showItem: true,
                isOpen: false,
                total: this.iconImgArr.length,
                count: 0,
                currentIndex: -1
            }
        },
        computed: {
            angleStep() {
                return (this.endAngle - this.startAngle) / (this.itemNum - 1)//计算每个item的夹角

            }
        },
        created() {
            //      把每个button的背景图片的class插入到html中,方便以后使用。
            let cssRule = ''
            this.iconImgArr.map((item) => {
                cssRule += this.gennerateIconStyle(item)
            })
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = cssRule
            document.head.appendChild(style)
        },
        methods: {
            // 产生icon的类
            gennerateIconStyle(icon) {
                let cssRule = '.icon-' + icon.iconName + '{' +
                    'background-image: url(' + icon.iconUrl + ');' +
                    'background-size: ' + icon.iconSize + '%; ' +
                    '}\n'
                return cssRule
            },
            animationCountIncrease() {
                this.count++
                if (this.count === this.total) {
                    this.isOpenChange()
                    this.count = 0
                }
            },
            showItemChange(index) {
                this.showItem = false
                this.currentIndex = index
            },
            isOpenChange() {
                if (!this.isOpen && !this.showItem) {
                    this.showItem= true
                }
                this.isOpen = !this.isOpen
            },
            /*setAmination() {
                let angleCur = this.startAngle
            }*/

        },
    }
</script>

<style scope lang="stylus" type="text/stylus">
  .menu-container
    user-select none
    border-radius 50%
    transition box-shadow .28s cubic-bezier(.4, 0, .2, 1)
    box-shadow 0 2px 5px 0 rgba(0, 0, 0, .26)
    padding 0
    margin 0
    box-sizing border-box
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)

    .menu-bar-con
      .menu-bar-btn
        position absolute
        border-radius 50%
        width: 1.2rem
        height: 1.2rem
        z-index 1
        cursor pointer
        transition all .28s cubic-bezier(.4, 0, .2, 1)
        border none
        background-color #6cb1fe
        color white
        outline none

        &.btn-active
          transform rotate(45deg)

        &:hover
          box-shadow 0 8px 17px 0 rgba(0, 0, 0, .2)

        .icon
          font-size 32px
          line-height 100%
          position relative

        .iconfont
          font-size: 25px;

    .menu-item-list
      list-style-type none
</style>
