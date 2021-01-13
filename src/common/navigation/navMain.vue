<template>
    <div id="nav">
      <pcNav v-if="!mobile"></pcNav>
<!--      <mobileNav v-if="mobile"></mobileNav>-->
    </div>
</template>

<script>
  import pcNav from './pcNav/navEl'
  // import mobileNav from './mbNav/navEl'
    export default {
        name: "navMain",
        components:{
            pcNav,
            // mobileNav
        },
        data () {
            return {
                mobile:false
            }
        },
        mounted() {
            this.mobile=/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
        }
    }
</script>

<style scoped>

</style>
