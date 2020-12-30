<template>
  <div class="meteorShower">
    <ul>
      <li class="star" v-for="item in starArr" :key="item.id"
          :style="{top:item.top+'px',left:item.left+'px',animationDelay:item.delay+'s'}"
      ></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "meteorShower",
        data(){
            return {
                starArr:[],  //定义数组存储星星的一些属性以及个数
                starsCount:6 //星星数量
            }
        },
        methods:{
            setStarCount() { //生成星星的方法
                for(let i = 0; i < this.starsCount; i++) { // i < 星星个数
                    let star = {} //定义存储一个星星的对象
                    let top = parseInt(Math.random()*1000) //定义星星的top值
                    let left = parseInt(Math.random()*1500)  //定义星星的left值
                    let delay = parseInt(Math.random()*10)  //定义星星的动画延迟时间
                    star.id = i
                    star.top = top
                    star.left = left
                    star.delay = delay
                    this.starArr.push(star)
                }
            }
        },
        created() { //Vue实例的生命周期函数
            this.setStarCount()
        }
    }
</script>

<style scoped>
  .meteorShower{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    overflow: hidden;
  }
  .star{
    /* 使用伪元素制作尾巴,此处可以写流星头部的形状 */
    /* 我觉得头部不带形状才好看,所以不写 */
    width: 2px;
    height: 2px;
    position: relative;
    opacity: 0;
    animation: star-fall 2s linear infinite;
    z-index: -1;
  }
  .star::after{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    /* 这里用边框写了个长三角形作为流星的尾巴 */
    border: 3px solid transparent;
    border-left-width: 200px;
    border-left-color: rgba(255,255,255,.7);
    /* 变形,旋转-45° 拉伸 */
    transform: rotate(-45deg) translate3d(1px,3px,0);
    /* 设置原点 */
    transform-origin: 0% 100%;
  }

  /* 流星滑落动画 */
  @keyframes star-fall {
    0% {
      opacity: 0;
      transform: scale(0.5) translate3d(0, 0, 0);
      /* 兼容一些浏览器 */
      -webkit-transform: scale(0.5) translate3d(0, 0, 0);
      -moz-transform: scale(0.5) translate3d(0, 0, 0);
    }
    50% {
      opacity: 1;
      transform: translate3d(-200px, 200px, 0);
      -webkit-transform: translate3d(-200px, 200px, 0);
      -moz-transform: translate3d(-200px, 200px, 0);
    }
    100% {
      opacity: 0;
      transform: scale(1.2) translate3d(-300px, 300px, 0);
      -webkit-transform: scale(1.2) translate3d(-300px, 300px, 0);
      -moz-transform: scale(1.2) translate3d(-300px, 300px, 0);
    }
  }
</style>
