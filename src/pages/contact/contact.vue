<template>
  <div class="contact_wrapper">
    <!-- https://dafrok.github.io/vue-baidu-map/#/ -->
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
      <bm-geolocation :anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-marker :position="tagCoordinate" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}">
        <bm-label :content="$t('contact.tagInfo') " :labelStyle="{color: 'red', fontSize : '16px'}" :offset="{width: -50, height: 50}"/>
      </bm-marker>


    <!--  <bm-overlay
          pane="labelPane"
          :class="{sample: true, active}"
          @draw="draw"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        <div>我爱北京天安门</div>
      </bm-overlay>-->

      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation><!--定位-->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> <!--比例尺-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> <!--缩放控件-->
    </baidu-map>

  </div>
</template>

<script>

export default {
  name: "contact",
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 20,
      tagCoordinate: {lng: 0, lat: 0},
      active: false
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 121.389652
      this.center.lat = 31.22903
      this.tagCoordinate.lng = 121.389652
      this.tagCoordinate.lat = 31.22903
      this.zoom = 20
    },
    draw ({el, BMap, map}) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(121.389652, 31.22903))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }
}
</script>

<style scoped lang="stylus">
.contact_wrapper
  .map
    width: 100%;
    height: 500px;

.sample {
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: rgba(0,0,0,0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}
.sample.active {
  background: rgba(0,0,0,0.75);
  color: #fff;
}
</style>