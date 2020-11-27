<template>
  <div class="contact_wrapper">
    <baidumap></baidumap>
    <contactInfo></contactInfo>
  </div>
</template>

<script>
  import baidumap from "./components/baidumap";
  import contactInfo from "./components/contactInfo";
export default {
  name: "contact",
    components:{
      baidumap,
      contactInfo
    }
}
</script>

<style scoped lang="stylus">

</style>
