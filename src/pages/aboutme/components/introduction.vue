<template>
  <div class="introduction">
    <pdfViewer
    :pdfUrl='`${this.$i18n.locale === "zh_cn" ? pdfCN : pdfEN}`'
    />
  </div>
</template>

<script>
import pdfViewer from '../../../common/pdfViewer'

    export default {
      name: "introduction",
      components: {
        pdfViewer
      },
      data() {
        return {
          pdfCN: 'file/XinNing-Resume-CN.pdf',
          pdfEN: 'file/XinNing-Resume-EN.pdf',
        }
      }
    }
</script>

<style scoped>

</style>
