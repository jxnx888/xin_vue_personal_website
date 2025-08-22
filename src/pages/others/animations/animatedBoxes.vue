<template>
  <div class='animatedBoxes'>
    <div class='topControl'>
      <el-button type='primary' class='randomize' @click='shuffle(false)'>Randomize</el-button>
      <el-button type='success' @click='shuffle(true)'>Order</el-button>
    </div>
    <div class='imageVideoSelector'>
      Play with:
      <el-radio v-model='playWith' label='Image'>Image</el-radio>
      <el-radio v-model='playWith' label='Video'>Video</el-radio>
      <el-input placeholder='Please add image link' :v-model='currentImage' :value='currentImage'>
        <template slot='prepend'>Image</template>
      </el-input>
      <el-divider>OR</el-divider>
      <el-input placeholder='Please add video(mp4) link' v-model='currentVideo' :value='currentVideo'>
        <template slot='prepend'>Video</template>
      </el-input>

    </div>
    <div class='grid' id='container'>
      <div v-for='n in 16' :key='n' :class='`item item${n}`'
           :style='{ viewTransitionName: `item${n}`}'>
        <img v-if='playWith ==="Image" && currentImage' :src='currentImage' alt='avatar' :id='`img${n}`'
             :style='checkPosition(n)'>
                <video v-else-if='playWith !=="Image" && currentVideo' :src='currentVideo'
                       :style='checkPosition(n)' autoplay muted loop></video>
      </div>
    </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'

export default {
  name: 'animatedBoxes',
  props: {},
  data () {
    return {
      originData: [],
      containerWidth: 0,
      playWith: 'Image',
      currentImage: '/image/avatar.jpg',
      currentVideo: '/mp4/nianhuibunengting7.mp4'
    }
  },
  methods: {
    checkPosition (n) {
      const row = Math.floor((n - 1) / 4) // 行 (0-3)
      const col = (n - 1) % 4 // 列 (0-3)
      const positionX = col * 25 // X 位置 (0%, 25%, 50%, 75%)
      const positionY = row * 25 // Y 位置 (0%, 25%, 50%, 75%).
      if (this.containerWidth) {
        return {
          width: `${this.containerWidth}px`,
          height: `${this.containerWidth}px`,
          transform: `translate(-${positionX}%, -${positionY}%)`
        }
      }
      return {}
    },
    shuffleItems (items, order) {
      const data = Array.from(items)
        .map((item) => ({ value: item, sort: Math.random() }))
      if (order) {
        return data.sort((a, b) => {
          const aIndex = parseInt(a.value.className.replace(/item/g, '').trim())
          const bIndex = parseInt(b.value.className.replace(/item/g, '').trim())
          return aIndex - bIndex
        })
          .map(item => item.value)
      }
      // 按照随机的 sort 值排序
      return data.sort((a, b) => a.sort - b.sort)
        .map(item => item.value)
    },
    shuffle (order) {
      const grid = document.querySelector('.grid')
      const shuffledItems = this.shuffleItems(grid.children, order)
      document.startViewTransition(() => {
        grid.replaceChildren(...shuffledItems)
      })
    }
  },
  mounted () {
// 使用 nextTick 确保 DOM 渲染完成
    this.$nextTick(() => {
      // 获取 container 元素
      const container = document.getElementById('container')

      // 确保容器不为 null
      if (container) {
        // 获取并输出宽度
        const containerWidth = container.offsetWidth
        this.containerWidth = containerWidth
        console.log('Container width:', containerWidth)
      } else {
        console.error('Container not found!')
      }
    })

  },
  destroyed () {

  },
  deactivated () {
  },
  watch: {},
  computed: {}
}
</script>
<style scoped lang='stylus'>
.animatedBoxes {
  padding: 15px;

  .topControl {

  }

  .imageVideoSelector {
    width: 80%;
    margin: 15px auto;
  }

  .grid {
    display: grid;
    margin: auto;
    grid-template-columns: repeat(4, 1fr); /* 4 列 */
    grid-template-rows: repeat(4, 1fr); /* 4 行 */
    width: calc(80vmin - 100px); /* 使网格在可视范围内适应 */
    height: calc(80vmin - 100px); /* 高度等于宽度，确保正方形 */
    //gap: 10px; /* 每个格子之间的间距 */

    .item {
      view-transition-class: item;
      width: 100%;
      height: 100%; /* 确保占满整个格子 */
      position: relative; /* 使子元素可以绝对定位 */
      overflow: hidden; /* 隐藏超出部分 */

      img {
        position: absolute; /* 绝对定位 */
        top: 0;
        left: 0;
        object-fit: cover; /* 保持比例裁剪 */
        transform: translate(-50%, -50%); /* 精确居中 */
      }
    }

    ::view-transition-group(*.item) {
      animation-duration: 420ms;
      animation-timing-function: cubic-bezier(1, -0.62, 0.61, 1.37);
    }

  }
}
</style>
