<template>
  <div id="app">
    <navMain></navMain>
    <router-view/>
  </div>
</template>
<script>
    import navMain from './common/navigation/navMain'
    export default {
        name: "App",
        components:{
            navMain
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
  margin-top 60px
</style>
