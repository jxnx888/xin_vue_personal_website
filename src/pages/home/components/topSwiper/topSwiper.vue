<template>
<div>
  <swiperGallery :imgs='imgs'>
    <autoTyping
      :userAgent='userAgent'
      :key='timer'
      :dataType="$t('INTRODUCTION')"
    />
  </swiperGallery>
</div>
</template>

<script>
    import swiperGallery from '@/common/swiperGallery/swiperGallery.vue'
    import autoTyping from '@/common/autoTyping/autoTyping'

    export default {
        name: "topSwiper",
        props: {
          imgs: Array,
            list: Array
        },
        components: {
            swiperGallery,
          autoTyping
        }
    }
</script>

<style scoped>

</style>
