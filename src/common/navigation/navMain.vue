<template>
  <div id='nav'>
    <pcNav v-if="userAgent && userAgent === 'pc'"></pcNav>
    <mobileNav v-if="userAgent && userAgent !== 'pc'"></mobileNav>
  </div>
</template>

<script>
import pcNav from './pcNav'
import mobileNav from './mbNav/drawerMenu'

export default {
  name: 'navMain',
  props: {
    userAgent: String
  },
  components: {
    pcNav,
    mobileNav,
  },
  data() {
    return {
    }
  },
  mounted() {
    // console.log(this.userAgent,'this.userAgent')
    // console.log(this.$root.windowWidth,'this.$root.windowWidth')
    // console.log(this.userAgent && this.userAgent !== 'phone' && this.$root.windowWidth, 'userAgent && userAgent !== \'phone\' && this.$root.windowWidth')
    // console.log(this.userAgent && this.userAgent === 'phone' || !this.$root.windowWidth, 'userAgent && userAgent === \'phone\' || !this.$root.windowWidth')
  }
}
</script>

<style scoped>

</style>
