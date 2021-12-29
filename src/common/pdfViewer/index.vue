
<template>
  <div class="priview-pdf-img" ref='preView'>
    <div :class='`print-btn ${absoluteBtn ? "print-btn-abs" : ""}`' ref='printBtn' @click='pdfPrintAll()'>{{$t('PRINT')}}</div>
    <pdf
      ref='pdfView'
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
      style='width: 100%;max-width: 1200px;margin: auto'
    ></pdf>

  </div>
</template>
<script>
import pdf from 'vue-pdf'

export default {
  name: 'pdf-viewer',
  components: {
    pdf
  },
  data(){
    return {
      src: '',
      numPages: undefined,
      absoluteBtn: false
    }
  },
  props: {
    // 外部传递pdfUrl 即可
    pdfUrl: {
      type: String,
      default: '',
      require: true
    }
  },
  computed: {
    pdfSrc () {
      return this.pdfUrl
    }
  },
  methods:{
    loadingTask() {
      this.src = pdf.createLoadingTask(this.pdfSrc);
      this.src.promise.then((pdf) => {
        this.numPages = pdf.numPages
      }).catch((error) => {
        console.log('There was an pdf pdf error, error.response')
        console.log(error)
      })
    },
    pdfPrintAll(){
      // this.$refs.pdfView[0].print()
      window.open(`https://ning-xin.com/${this.pdfSrc}`)
    },
    btnScroll() {
      //当前滚动位置
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      //元素总高度
      var boxHeight = this.$refs.preView.offsetHeight;
      //元素可滚动的最低最低位置
      let bottomGap = boxHeight - this.$refs.printBtn.offsetHeight - window.innerHeight + 160 + 100 + 100 -34 - 10 - 90 // 160 footer高度 100 nav高度 100 按钮固定的高度bottom 1rem 按钮高度34 10 margin 90 按钮距离footer多少停留
      this.absoluteBtn = scrollTop >= bottomGap;
    },
  },
  mounted() {
    this.loadingTask();
    window.addEventListener('scroll', this.btnScroll)
  },
  watch: {
    '$i18n.locale'(newValue, oldValue) {
      if (newValue != oldValue) {
        this.$nextTick(function() {
          this.loadingTask()
        })
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.btnScroll, false)
  },
  //keep-alive 激活状态，无法销毁监听，需要使用deactivated来销毁
  deactivated() {
    window.removeEventListener('scroll', this.btnScroll, false)
  },
}
</script>
<style lang='stylus' scoped>
btn-right = .7rem
.priview-pdf-img
  position: relative;
  .print-btn
    position fixed
    bottom 1rem
    right btn-right
    z-index: 1;
    width 1.3rem
    height .34rem
    line-height: 34px;
    color: #FFF
    font-weight: bold;
    font-size: 14px;
    background: #F78C3E;
    text-align: center;
    cursor: pointer;
    border-radius: 17px;
    margin-bottom: 10px
  .print-btn.print-btn-abs
    position: absolute;
    bottom:0
    rigth btn-right
</style>
