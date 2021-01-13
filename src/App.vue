<template>
  <div id="app">
    <navMain></navMain>
    <keep-alive>
      <router-view class="mainBody"/>
    </keep-alive>
    <footerVue></footerVue>
  </div>
</template>
<script>
    import navMain from './common/navigation/navMain'
    import footerVue from "./common/footerVue/footerVue";
    export default {
        name: "App",
        components:{
            navMain,
            footerVue
        }
    }
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  .mainBody
    margin-top 1rem
</style>
