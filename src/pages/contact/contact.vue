<template>
  <div class='contact_wrapper'>
    <!--    <baidumap></baidumap>-->
    <Mapbox
      :centerLatLon='centerLatLngA'
      :zoom='zoom'
    />
    <contactInfo></contactInfo>
  </div>
</template>

<script>
// import baidumap from "./components/baidumap";
import Mapbox from './components/mapbox'
import contactInfo from './components/contactInfo'

export default {
  name: 'contact',
  components: {
    // baidumap,
    // hereMap,
    Mapbox,
    contactInfo
  },
  data() {
    return {

      // centerLatLng:{lat: 45.49302570938374, lng:  -73.56244160935152},
      centerLatLng: { lat: -73.56244160935152, lng: 45.49302570938374 },
      centerLatLngA: [-73.56244160935152, 45.49302570938374],
      zoom: 15
    }
  }
}
</script>

<style scoped lang='stylus'>
.contact_wrapper
  width 100%
</style>
