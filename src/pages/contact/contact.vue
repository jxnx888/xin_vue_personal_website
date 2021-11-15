<template>
  <div class='contact_wrapper'>
    <!--    <baidumap></baidumap>-->
    <hereMap
      :centerLatLng='centerLatLng'
      :zoom = 'zoom'
    />
    <contactInfo></contactInfo>
  </div>
</template>

<script>
// import baidumap from "./components/baidumap";
import hereMap from './components/hereMap'
import contactInfo from './components/contactInfo'

export default {
  name: 'contact',
  components: {
    // baidumap,
    hereMap,
    contactInfo
  },
  data() {
    return {
      centerLatLng:{lat: 45.49302570938374, lng:  -73.56244160935152},
      zoom: 15,
    }
  }
}
</script>

<style scoped lang='stylus'>

</style>
