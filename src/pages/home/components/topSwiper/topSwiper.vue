<template>
<div>
  <swiperGallery></swiperGallery>
</div>
</template>

<script>
    import swiperGallery from '@/common/swiperGallery/swiperGallery.vue'

    export default {
        name: "topSwiper",
        props: {
            list: Array
        },
        components: {
            swiperGallery
        }
    }
</script>

<style scoped>

</style>
