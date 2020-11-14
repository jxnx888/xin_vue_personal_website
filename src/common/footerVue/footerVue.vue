<template>
  <div class="footer_wrapper">
    <footer class="common_footer">
      <el-row>
        <el-col :span="8" class="footer_each">
          123
        </el-col>
        <el-col :span="8" class="footer_each">
          <div class="download_file"><a href="/file/XinNing-Resume-CN.pdf" download="/file/XinNing-Resume-CN.pdf"><i
            class="el-icon-printer"></i>{{$t('footer.resume')}}</a></div>
          <div class="download_file" v-if="currentLang==='en_us'"><a download=""><i class="el-icon-printer"></i>{{$t('footer.coverletter')}}</a></div>
        </el-col>
        <el-col :span="8" class="footer_each">
          Follow Me
          <div class="each_social">
            <a href="" class="">i</a>
          </div>
        </el-col>
        <el-col :span="24" class="footer_copyright">
          Copyright 2015-2020 | Xin Ning
        </el-col>
      </el-row>
    </footer>
  </div>
</template>

<script>
    export default {
        name: "footerVue",
      data(){
          return{
            currentLang: this.$i18n.locale
          }
      },
      created () {
        this.watchLang();
      },
      methods:{
        watchLang(){
          // 判断当前环境是中文还是英文
          this.currentLang = this.$i18n.locale;
          console.log( this.currentLang )
        }
      },
      watch:{

      }
    }
</script>

<style scoped lang="stylus">
  .footer_wrapper
    background #cceaf2
    min-height: 100px;

    .common_footer
      width 1200px
      margin auto
      .footer_each
        text-align center
</style>
