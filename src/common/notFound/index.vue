<template>
  <div class='page-404'>
    <img src='/image/icon-404.png' alt=''>
    <p>{{ $t('404') }}</p>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang='stylus'>
.page-404
  height calc(100vh - 260px)
</style>
