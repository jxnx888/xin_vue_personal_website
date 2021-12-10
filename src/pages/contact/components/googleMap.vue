<template>
  <GmapMap
    id='mapContainer'
    :center="centerLatLng"
    :zoom="zoom"
    map-type-id="terrain"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>

<script>

export default {
  name: 'hereMap',
  props: {
    centerLatLng: Object,
    zoom: Number
  },
  data() {
    return {
      map: null,
      platform: null,
      profileImg: '',

    }
  },
  mounted() {
  },
  methods: {
  },
  computed:{
    markers(){
      return [{
        position: this.centerLatLng
      }]
    } ,
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
