<template>
  <div class="typeWrite">

    <h1 class="typewrite-word" data-period="2000"
        :data-type="$t('home.intro')">
      <span class="wrap"></span>
    </h1>
  </div>

</template>

<script>
import './typeWrite'

export default {
  name: "autoTyping",
  data() {
    return {

    }
  },
/*  methods: {
    startTextType(){
      var elements = document.getElementsByClassName('typewrite-word');
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          const loopNum = 0;
          period = parseInt(period, 10) || 2000;
          const txt = '';
          const isDeleting = false;
          this.$options.methods.tick(elements[i], JSON.parse(toRotate), period,loopNum,txt,isDeleting);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite-word > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);
    },
    tick(el, toRotate, period,loopNum,txt,isDeleting){
      var i = loopNum % toRotate.length;
      var fullTxt = toRotate[i];
      if (isDeleting) {
        txt = fullTxt.substring(0, txt.length - 1);
      } else {
        txt = fullTxt.substring(0, txt.length + 1);
      }

     el.innerHTML = '<span class="wrap">' + txt + '</span>';

      var delta = 200 - Math.random() * 100;

      if (isDeleting) { delta /= 2; }

      if (!isDeleting && txt === fullTxt) {
        delta = period;
        isDeleting = true;
      } else if (isDeleting && txt === '') {
        isDeleting = false;
        loopNum++;
        delta = 500;
      }
      setTimeout(function () {
        this.tick();
      }, delta);
    }
  },
  mounted() {
    this.startTextType();
  }*/
}
</script>

<style scoped lang="stylus">
@media screen and (min-width: 769px)
  .typeWrite
    position: absolute;
    bottom: 60px;
    left: 50%;
    margin-left: -325px;
    width: 650px;
    color: #6ba2ca;
    font-size: 24px;
  .typeWrite *
    font-size: 24px;
@media screen and (max-width: 768px)
  .typeWrite
    width: 95%
    height: 1rem
    margin: .2rem  auto
    background-color: #fff
    -webkit-border-radius: .1rem
    -moz-border-radius: .1rem
    border-radius: .1rem
    color:#000
    .typewrite-word
      line-height: 1rem
      text-align: center
      color: #4aba92
      border:  2px solid #b969a8
      border-radius: .1rem
    h1
      height: 1rem
      line-height: 1rem
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