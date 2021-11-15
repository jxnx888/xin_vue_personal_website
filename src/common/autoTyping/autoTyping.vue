<template>
  <div :class="`typeWrite not-select typeWrite-${this.$root.userAgent}`">

    <h1 class="typewrite-word" data-period="2000"
        :data-type="dataType">
      <span class="wrap typewrite-cursor"></span>
    </h1>
  </div>

</template>

<script>
import {onloadFn} from './typeWrite'

export default {
  name: "autoTyping",
  props: {
    dataType: String
  },
  data() {
    return {

    }
  },
    mounted() {
        onloadFn();
    }
}
</script>

<style scoped lang="stylus">
  .typewrite-word
    span.typewrite-cursor::after
      content "|"
      display inline
      color #eee
      width 5px
      height 1rem
      line-height 1rem
      position: relative;
      top -3px
    span.typewrite-cursor-anim::after
      -webkit-animation: twinkling 1s 1s infinite;
      animation: twinkling 1s 1s infinite;
      transition all .1s
  .typeWrite.typeWrite-pc, .typeWrite.typeWrite-pad
    position: absolute;
    left 50%
    color: #6ba2ca;
    font-size: 24px;
  .typeWrite.typeWrite-pc
    width: 650px;
    bottom: 8%;
    transform translate(-50%, -8%)
    & *
      font-size .24rem
  .typeWrite.typeWrite-pad
    width: 80%;
    bottom: 20%;
    transform translate(-50%, -20%)
    & *
      font-size .18rem
    h1
      line-height: .5rem;
      height: .5rem;
height-phone = .6rem
half-height-phone = .3rem
  .typeWrite.typeWrite-phone
    width: 95%
    height: height-phone
    margin: .2rem  auto
    background-color: #fff
    -webkit-border-radius: .1rem
    -moz-border-radius: .1rem
    border-radius: .1rem
    color:#000
    & *
      font-size: .14rem;
    .typewrite-word
      line-height: height-phone
      text-align: center
      color: #4aba92
      border:  2px solid #cdcdcd
      border-radius: .1rem
    h1
      position relative
      height: height-phone
      line-height: height-phone
    span
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      display: inline-block;
      vertical-align: middle;
      line-height: half-height-phone;
      &:after
        height: half-height-phone
        line-height: half-height-phone
        color #000
        top -1px
    svg
      margin-top: -65px
      top: 0
      left: 0
      width: 100%
      height: 100%
      border-radius: .1rem
      rect
        top: 0
        left: 0
        width: 100%
        height: 100%
        border-radius: .1rem
        stroke: #4aba92
        stroke-width:4px
        stroke-dasharray: 40 //dash length
        animation: animate 3s linear infinite
        fill: transparent
  @keyframes animate
  {
    0%{
      stroke-dashoffset:800 //speed
    }
    100%{
      stroke-dashoffset:0
    }

  }

</style>
