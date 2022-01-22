<template>
  <div ref='basicMapbox' id='mapContainer' :class='`mapContainer-${$root.$userAgent}`'></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
// import MapboxLanguage  from '@mapbox/mapbox-gl-language'
export default {
  name: 'mapbox',
  props: {
    centerLatLng: {
      type: Array,
      require: true
    },
    zoom: {
      type: Number,
      require: false,
      default() {
        return 9
      }
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      MapboxAccessToken: 'pk.eyJ1IjoianhueDg4OCIsImEiOiJja3gwam15cm0wMzM3Mm9uazFoajY3MDA0In0.ZzWly2VumNGqIOuM6-COEQ',
      MapboxStyle: 'mapbox://styles/jxnx888/ckx0jl4xl2ahb14muqthr3a0p',
      centerLatLngAr: [-73.56244160935152, 45.49302570938374],
      geojson: [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-73.56244160935152, 45.49302570938374],
          },
          'properties': {
            'title': 'My Location',
            'description': "I'm here!",
            'iconSize': [30, 30]
          }
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      mapboxgl.accessToken = this.MapboxAccessToken

      // 英文标注转换为中文
      // mapboxgl.setRTLTextPlugin(
      //   "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js"
      // );
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: this.MapboxStyle,
        center: this.centerLatLngAr,
        zoom: this.zoom
      })
      // 设置语言
      // var language = new MapboxLanguage({ defaultLanguage: "zh" });
      // map.addControl(language);

      // Create a new marker.
      // Set marker options.
      // eslint-disable-next-line no-unused-vars
      /*const marker = new mapboxgl.Marker({
        color: '#FFFFFF',
        draggable: false
      }).setLngLat(this.centerLatLngAr)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${this.geojson[0].properties.title}</h3><p>${this.geojson[0].properties.description}</p>`
            )
        )
        .addTo(map)
*/
      this.addMarkers(map);
      // 地图导航
      var nav = new mapboxgl.NavigationControl()
      map.addControl(nav, 'top-left')
      // 比例尺
      var scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial'
      })
      map.addControl(scale)
      scale.setUnit('metric')
      // 全图
      map.addControl(new mapboxgl.FullscreenControl())
      // 定位
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
// When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
// Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
        })
      )
    },
    addMarkers(map) {
      // add markers to map
      // Add markers to the map.
      for (const marker of this.geojson) {
// Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker';
        el.style.backgroundImage = `url(${this.calcUrl})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        // el.addEventListener('click', () => {
        //   window.alert(marker.properties.message);
        // });

        // Add markers to the map.
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      }
    }
  },
  computed: {
    mapSize() {
      let styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      }
      return styleObj
    },
    calcUrl() {
      // console.log("this.icon", this.publicPath + "image/head_ico.png")
      return this.publicPath + "image/head_ico.png";
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src='mapbox-gl/dist/mapbox-gl.css' />
<style lang='stylus' scoped>
/*@import "mapbox-gl/dist/mapbox-gl.css";*/
#mapContainer
  width: 100%;
  height: 500px;

#mapContainer.mapContainer-phone
  height 30vh

</style>
