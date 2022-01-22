<template>
  <div id='mapContainer' :class='`mapContainer-${$root.$userAgent}`' ref='hereMap'></div>
</template>

<script>

import H from '@here/maps-api-for-javascript'

export default {
  name: 'hereMap',
  props: {
    centerLatLng: Object,
    zoom: Number
  },
  data() {
    return {
      apikey: 'HGEjn61855SYutGZvH8eZOUWJBDwv9pWT9VXQOYVUKw',
      map: null,
      platform: null,
      profileImg: ''
    }
  },
  async mounted() {
    // Initialize the platform object:
    this.platform = new H.service.Platform({
      apikey: this.apikey
    })
    this.initializeHereMap()
  },
  methods: {
    initializeHereMap() { // rendering map
      if (!this.map) {
        const mapContainer = this.$refs.hereMap
        // Obtain the default map types from the platform object
        var maptypes = this.platform.createDefaultLayers()

        // Instantiate (and display) a map object:
        // 创建地图实例
        this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
          zoom: this.zoom,
          pixelRatio: window.devicePixelRatio || 1,
          center: this.centerLatLng
        })

        // Create a marker icon from an image URL:
        var icon = new H.map.Icon('/image/head_ico.png')

        // Create a marker using the previously instantiated icon:
        const marker = new H.map.Marker(
          this.centerLatLng,
          { icon: icon }
        )
        this.map.addObject(marker)

        addEventListener('resize', () => this.map.getViewPort().resize())

        //Step 3: make the map interactive
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // eslint-disable-next-line no-unused-vars
        new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

        // add UI
        // 创建ui实例

        H.ui.UI.createDefault(this.map, maptypes)
        // End rendering the initial map


      }
    }
  }
}
</script>

<style scoped lang='stylus'>
#mapContainer
  width: 100%;
  height: 500px;
#mapContainer.mapContainer-phone
  height 30vh
</style>
