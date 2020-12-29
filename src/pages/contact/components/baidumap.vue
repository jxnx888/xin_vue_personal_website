<template>
  <div class="map_wrapper">
    <!-- https://dafrok.github.io/vue-baidu-map/#/ -->
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
      <bm-marker :position="tagCoordinate" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: '/image/head_ico.png', size: {width: 25, height: 25},}"  @click="infoWindowOpen" class="map_marker">
        <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" class="info_window">
          <div class="title">{{$t('contact.tagInfo[2]')}}</div>
          <div class="title BMap_bubble_title">{{$t('contact.tagInfo[0]')}}</div>
          <div class="address">{{$t('contact.tagInfo[1]')}}</div>
        </bm-info-window>
      </bm-marker>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation><!--定位-->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> <!--比例尺-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> <!--缩放控件-->
    </baidu-map>

  </div>
</template>

<script>
    export default {
        name: "baidumap",
        data () {
            return {
                center: {lng: 0, lat: 0},
                zoom: 20,
                tagCoordinate: {lng: 0, lat: 0},
                active: false,
                show: true
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
            },
            infoWindowClose () {
                this.show = false
            },
            infoWindowOpen () {
                this.show = true
            }
        }
    }
</script>

<style scoped lang="stylus">
  .contact_wrapper
    .map
      width: 100%;
      height: 500px;
      >>> .BMap_pop
        top: 100px!important;
        left: 840px!important;
      >>> .BMap_shadow
        top 143px!important

  .title {
    color:#CC5522;
    font-size 14px;
    line-height: 20px;
  }
  .address{
    color:#333;
    font-size 14px;
    line-height: 20px;
  }
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
