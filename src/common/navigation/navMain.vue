<template>
  <div id='nav'>
    <pcNav v-if="$root.$userAgent && $root.$userAgent !== 'phone' && this.$root.windowWidth"></pcNav>
    <mobileNav v-if="$root.$userAgent && $root.$userAgent === 'phone' || !this.$root.windowWidth"></mobileNav>
  </div>
</template>

<script>
import pcNav from './pcNav'
import mobileNav from './mbNav/drawerMenu'

export default {
  name: 'navMain',
  components: {
    pcNav,
    mobileNav,
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
