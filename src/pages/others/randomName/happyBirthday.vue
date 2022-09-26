<template>
  <div id='happy_birthday' class='twinkling_wrapper'>
    <div id='close' class='iconfont' @click='closeWindowChild'>&#xe602;</div>
    <div class='text-happy'> {{ wishText }}</div>
    <div id='container' class='clearfix'></div>
  </div>
</template>

<script>
import * as THREE from 'three/build/three.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export default {
  name: 'happyBirthday',
  props: {
    birthName: String
  },
  data() {
    return {
      container: null,
      scene: null,
      camera: null,
      renderer: null,
      cakeModel: null,
      cakeWithFlame: null,
      mouseX: 0,
      mouseY: 0,
      windowHalfX: null,
      windowHalfY: null,
      allFlameMaterials: [],
      flames: [],
      cakeRotSpeed: 0.0030,
      spheres: [],
      ballColors: [0x00bfff, 0xff00ff, 0x7cfc00, 0xdc143c, 0x7fff00, 0x00bfff, 0x00ffff, 0xff0000],
      balloonCount: 100,
      balloonSpeed: 0.0001,
      wishText: ``,
      textColors: [0x00bfff, 0xff00ff, 0x7cfc00, 0xdc143c, 0x7fff00, 0x00bfff, 0x00ffff, 0xff0000],
      textScaleSize: 0.3, //delta scale for letters
      textAnimeColors: [], // Index of current color for each letter
      textRotSpeed: 0.2,  // Text world rotation speed. in degree
      textInitialSize: 120, // Initial font size for text
      textYScope: 5,  // Text Sin wave height.
      textYSpeed: 10,  // Text Sin wave speed
      textBevelThickness: 3, // Text bevel thickness
      textBevelSize: 3,   // Text bevel size
      // textFont : "fonts/gentilis_bold.typeface.json",  // textFont  ::Only ThreeJS fonts are available
      distanceToText: 1000, // Distance from cakemodel to text
      textSizeInAngle: 8, // Angle width for each letter.
      textRot: 0,  // current text rotation.
      textColorTransformSpeed: 50, // text color transform speed.  !CAUTION: The smaller the faster
      textObjects: [],
      dx: null,
      dy: null,
      dz: null,
      // Do NOT modify following variables!  used for render ticker
      clock: new THREE.Clock(),
      time: 0,
      r: 11,
      initialAngle: 2,

      CONTAIN_WIDTH: null,
      CONTAIN_HEIGHT: null,
      listener: null,
      backgroundSound: null
    }
  },
  methods: {
    init() {
      const _this = this
      _this.container = document.getElementById('container')
      //Configure renderer settings-------------------------------------------------
      _this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      _this.renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1)
      // _this.renderer.setSize(window.innerWidth, window.innerHeight)
      _this.renderer.setSize(_this.CONTAIN_WIDTH, _this.CONTAIN_HEIGHT)
      _this.renderer.autoClear = true
      _this.renderer.setClearColor(0x000000, 0.0)
      _this.container.appendChild(_this.renderer.domElement)
      //------------------------------------------------

      _this.cakeWithFlame = new THREE.Group

      // Create an empty scene
      _this.scene = new THREE.Scene()

      // Create a basic perspective camera
      _this.camera = new THREE.PerspectiveCamera(75, this.CONTAIN_WIDTH / this.CONTAIN_HEIGHT, 1, 5000)
      _this.scene.add(_this.camera)

      _this.camera.position.z = 30
      _this.camera.position.y = 8
      _this.camera.lookAt(new THREE.Vector3(0, -20, 0))

      //Create the lights
      const ambientLight = new THREE.AmbientLight(0xFFFFFF, .5)
      _this.scene.add(ambientLight)

      const lights = []
      lights[0] = new THREE.DirectionalLight(0xffffff, 0.5)
      lights[0].position.set(1, 0, 0)
      lights[1] = new THREE.DirectionalLight(0x11E8BB, 0.5)
      lights[1].position.set(0.75, 1, 0.5)
      lights[2] = new THREE.DirectionalLight(0x8200C9, 0.5)
      lights[2].position.set(-0.75, -1, 0.5)
      _this.scene.add(lights[0])
      _this.scene.add(lights[1])
      _this.scene.add(lights[2])

      // Skybox
      var path = '/models/Park2/'
      var format = '.jpg'
      var urls = [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
      ]
      // get all skybox image urls into *urls* variable.
      var textureCube = new THREE.CubeTextureLoader().load(urls) // load skybox images
      textureCube.format = THREE.RGBFormat  // set skybox color format as RGB
      _this.scene.background = textureCube  // set loaded skybox texture into scene.

      // Event handle
      window.addEventListener('resize', _this.onWindowResize, false)
      document.addEventListener('mousemove', _this.onDocumentMouseMove, false)

      // Free Orbit control : Traditional orbit controller.
      _this.controls = new OrbitControls(_this.camera, _this.renderer.domElement) // project controller

      // var controls = new THREE.OrbitControls(_this.camera, _this.renderer.domElement);
      _this.controls.enableDamping = true
      _this.controls.dampingFactor = 0.25
      _this.controls.enableZoom = true
      _this.controls.target.set(0, 0.5, 0)
      _this.controls.update()
      _this.controls.minDistance = 20 //设置相机距离原点的最近距离 min distance of camera to coordinate origin
      _this.controls.maxDistance = 100//设置相机距离原点的最远距离 max distance of camera to coordinate origin
      _this.controls.rotateSpeed = .3
      _this.addAudio()
      // Add spheres (balloon)
      _this.addBalloons()
      _this.geoletters()
      _this.render()
    },
    addAudio() {
      const _this = this
      // create an AudioListener and add it to the camera
      _this.listener = new THREE.AudioListener()
      _this.camera.add(_this.listener)
      // create a global audio source
      _this.backgroundSound = new THREE.Audio(_this.listener)
      // load a sound and set it as the Audio object's buffer
      const audioLoader = new THREE.AudioLoader()
      audioLoader.load('/mp3/happy-birthday.mp3', function(buffer) {
        _this.backgroundSound.setBuffer(buffer)
        _this.backgroundSound.setLoop(true)
        _this.backgroundSound.setVolume(.4)
        _this.backgroundSound.play()
      })
    },
    addBalloons() {
      const _this = this
      var geometry = new THREE.SphereBufferGeometry(100, 32, 16) // basic balloon geometry (initially it's sphere)
      var lineGeo = new THREE.Geometry() // geometry for balloon tail

      // Balloon tail
      lineGeo.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 2, 0),

        new THREE.Vector3(1, 2, 0),
        new THREE.Vector3(2, 4, 1),

        new THREE.Vector3(2, 4, 1),
        new THREE.Vector3(0, 6, 2),

        new THREE.Vector3(0, 6, 2),
        new THREE.Vector3(0, 8, 4),

        new THREE.Vector3(0, 8, 4),
        new THREE.Vector3(2, 10, 4)
      )
      var lineMat = new THREE.LineBasicMaterial({  // balloon tail material: you can customize *color*
        color: 0xaaaaaa,
        linewidth: 5,
        transparent: true,
        opacity: 0.6
      })

      // Create balloons according to balloon count
      for (var i = 0; i < _this.balloonCount; i++) {

        /*
         * Here I control balloons as group of balloon sphere and tail.
         */

        var sphereGroup = new THREE.Group //  create new empty group.
        var material = new THREE.MeshPhongMaterial({   // balloon sphere material.
          color: _this.ballColors[i % _this.ballColors.length],
          transparent: true,
          opacity: 0.4,
          shininess: 50,
          specular: 0x777777
        })
        var mesh = new THREE.Mesh(geometry, material)  // create balloon mesh

        var line = new THREE.LineSegments(lineGeo, lineMat)  // create balloon tail

        // set balloon position as random.
        mesh.position.x = Math.random() * 20 - 10
        mesh.position.y = Math.random() * 20 - 10
        mesh.position.z = Math.random() * 1000 - 500

        // *** the following code exists to avoid balloon and cake collision.
        // Basically balloons move on given z-plan so make sure balloons not placed on same z plan as cake.
        if (Math.abs(mesh.position.z) < 40)
          mesh.position.z = 40 + Math.abs(mesh.position.z)

        // set random balloon size
        // adding .3 for limiting minimal scale of balloon. (if we don't do it we can have very small balloon)
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * .1 + .3
        mesh.scale.y *= 1.2 // make balloon shape better.

        // set balloon tail position.
        line.position.x = mesh.position.x
        line.position.y = mesh.position.y - 100 * mesh.scale.y - 10
        line.position.z = mesh.position.z
        line.scale.x = line.scale.y = line.scale.z = mesh.scale.y

        // add created balloon and tail to group
        sphereGroup.add(mesh)
        sphereGroup.add(line)

        // IMPORTANT we add balloon group here. (not balloon and tail object)
        _this.scene.add(sphereGroup)

        // save created balloon for later control
        _this.spheres.push(sphereGroup)
      }

    },
    // Add Cake Object
    geoletters() {
      const _this = this
      _this.cakeModel = new THREE.Object3D()

      // add cakeWithFlame group. right now it's just empty group.
      // like balloon we also manage cake as group with cakemodel and candle flame
      _this.scene.add(_this.cakeWithFlame)
      // load model obj and material
      var loader = new MTLLoader()
      loader.setPath('/models/birthdayCake/')
        .load('Birthday_Cake.mtl', function(materials) {
          materials.preload()
          new OBJLoader()
            .setMaterials(materials)
            .setPath('/models/birthdayCake/')
            .load('Birthday_Cake.obj', function(object) {
              // set loaded cake object to cakeModel and set initial position and rotation.
              // IMPORTANT: for position.z and x I applied those values to make sure
              // the position of candles match with generated candle flame.
              _this.cakeModel.add(object)
              _this.cakeModel.rotation.x = -Math.PI / 2
              _this.cakeModel.position.y = -20
              _this.cakeModel.position.z = -0.5
              _this.cakeModel.position.x = -0.2

              // add generated cakemodel to group.
              _this.cakeWithFlame.add(_this.cakeModel)

              _this.placeFlames() // insert flames
              _this.insertText()  // insert Happy Birthday text.
            })
        })
    },
    // Generate flame
    flame(isFrontSide, x, z) {
      // This function creates one flame and places it on given x, z place
      const _this = this
      var caseMesh = new THREE.Mesh() // create empty mesh.
      var flameGeo = new THREE.SphereBufferGeometry(0.5, 32, 32) // initial flame geometry. Initially it's sphere.
      var flameMaterials = []
      // CAUTION: the following codes are just provided from 3rd party.
      // Please don't udpate following codes.
      flameGeo.translate(0, 0.5, 0)
      var flameMat = _this.getFlameMaterial(isFrontSide)
      flameMaterials.push(flameMat)
      var flame = new THREE.Mesh(flameGeo, flameMat)
      flame.position.set(x, 2.6, z)
      flame.rotation.y = THREE.Math.degToRad(-45)

      _this.flames.push(flame)
      _this.allFlameMaterials.push(flameMaterials)

      caseMesh.add(flame)

      // add created flame to cakeWithFlame group.
      _this.cakeWithFlame.add(caseMesh)
    },
    getFlameMaterial(isFrontSide) {
      let side = isFrontSide ? THREE.FrontSide : THREE.BackSide
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
            uniform float time;
            varying vec2 vUv;
            varying float hValue;

            //https://thebookofshaders.com/11/
            // 2D Random
            float random (in vec2 st) {
                return fract(sin(dot(st.xy,
                                     vec2(12.9898,78.233)))
                             * 43758.5453123);
            }

            // 2D Noise based on Morgan McGuire @morgan3d
            // https://www.shadertoy.com/view/4dS3Wd
            float noise (in vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);

                // Four corners in 2D of a tile
                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));

                // Smooth Interpolation

                // Cubic Hermine Curve.  Same as SmoothStep()
                vec2 u = f*f*(3.0-2.0*f);
                // u = smoothstep(0.,1.,f);

                // Mix 4 coorners percentages
                return mix(a, b, u.x) +
                        (c - a)* u.y * (1.0 - u.x) +
                        (d - b) * u.x * u.y;
            }

            void main() {
              vUv = uv;
              vec3 pos = position;

              pos *= vec3(0.8, 2, 0.725);
              hValue = position.y;
              //float sinT = sin(time * 2.) * 0.5 + 0.5;
              float posXZlen = length(position.xz);

              pos.y *= 1. + (cos((posXZlen + 0.25) * 3.1415926) * 0.25 + noise(vec2(0, time)) * 0.125 + noise(vec2(position.x + time, position.z + time)) * 0.5) * position.y; // flame height

              pos.x += noise(vec2(time * 2., (position.y - time) * 4.0)) * hValue * 0.0312; // flame trembling
              pos.z += noise(vec2((position.y - time) * 4.0, time * 2.)) * hValue * 0.0312; // flame trembling

              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
            }
          `,
        fragmentShader: `
            varying float hValue;
            varying vec2 vUv;

            // honestly stolen from https://www.shadertoy.com/view/4dsSzr
            vec3 heatmapGradient(float t) {
              return clamp((pow(t, 1.5) * 0.8 + 0.2) * vec3(smoothstep(0.0, 0.35, t) + t * 0.5, smoothstep(0.5, 1.0, t), max(1.0 - t * 1.7, t * 7.0 - 6.0)), 0.0, 1.0);
            }

            void main() {
              float v = abs(smoothstep(0.0, 0.4, hValue) - 1.);
              float alpha = (1. - v) * 0.99; // bottom transparency
              alpha -= 1. - smoothstep(1.0, 0.97, hValue); // tip transparency
              gl_FragColor = vec4(heatmapGradient(smoothstep(0.0, 0.3, hValue)) * vec3(0.95,0.95,0.4), alpha) ;
              gl_FragColor.rgb = mix(vec3(0,0,1), gl_FragColor.rgb, smoothstep(0.0, 0.3, hValue)); // blueish for bottom
              gl_FragColor.rgb += vec3(1, 0.9, 0.5) * (1.25 - vUv.y); // make the midst brighter
              gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.66, 0.32, 0.03), smoothstep(0.95, 1., hValue)); // tip
            }
          `,
        transparent: true,
        side: side
      })
    },
    // Add Flames per each candle
    placeFlames() {
      // Calculate each position of candle tip and place flames for them.
      const _this = this
      for (var i = 0; i < 16; i++) {
        const a = THREE.Math.degToRad(360 / 16 * i + _this.initialAngle) + _this.cakeModel.rotation.z
        const x = _this.r * Math.cos(a)
        const z = _this.r * Math.sin(a)
        _this.flame(true, x, z)
      }
    },
    // Add fancy "Happy Birthday!" text
    insertText() {
      const _this = this

      // Creates text object for each letter of string.
      // Text animation happens centerd on cakeModel.
      // Given text just goes around the cakeModel
      const loader = new THREE.FontLoader()
      const textPath = '/font/SimHei_Regular.json'  // textFont  ::Only ThreeJS fonts are available

      loader.load(textPath, function(font) {

        _this.wishText.split('').map((letter, i) => {

          // Initialize Color of text as randome one.
          _this.textAnimeColors[i] = parseInt(Math.random() * _this.textColors.length)

          // Create text geometry
          var textGeo = new THREE.TextGeometry(letter, {
            font: font,
            size: _this.textInitialSize,
            height: _this.textInitialSize / 2,
            curveSegments: 4,
            bevelThickness: _this.textBevelThickness,
            bevelSize: _this.textBevelSize,
            bevelEnabled: true
          })

          // Using buffergeometry for performance.
          textGeo = new THREE.BufferGeometry().fromGeometry(textGeo)

          // Create text material : similar to balloon material
          var material = new THREE.MeshPhongMaterial({
            color: _this.textColors[_this.textAnimeColors[i]],
            flatShading: true,
            shininess: 50,
            specular: 0x777777,
            transparent: true,
            opacity: 0.7
          })

          // Create textMesh for one letter.
          var textMesh = new THREE.Mesh(textGeo, material)
          // calculate rotation of i-th letter.
          var rot = Math.PI / 180 * _this.textSizeInAngle * i

          // calculate position based on rot.
          textMesh.position.x = _this.distanceToText * Math.sin(rot) + _this.cakeModel.position.x
          textMesh.position.z = _this.distanceToText * Math.cos(rot) * _this.cakeModel.position.z
          textMesh.position.y = 0

          // add generated mesh to scene.
          _this.scene.add(textMesh)

          // save generated mesh for later control
          _this.textObjects.push(textMesh)

        })

        // Make sure audio plays after cake model & letter loads
        // var a = document.getElementById('audio');
        // a.play().then(() => console.log("Audio Playing"));

      })
    },
    onWindowResize() {
      this.CONTAIN_WIDTH = document.getElementById('happy_birthday').offsetWidth
      this.CONTAIN_HEIGHT = document.getElementById('happy_birthday').offsetHeight
      this.camera.aspect = this.CONTAIN_WIDTH / this.CONTAIN_HEIGHT
      this.camera.updateProjectionMatrix() //maintain aspect ratio
      this.renderer.setSize(this.CONTAIN_WIDTH, this.CONTAIN_HEIGHT)

    },
    onDocumentMouseMove(event) {
      this.mouseX = (event.clientX - this.windowHalfX) / 10
      this.mouseY = (event.clientY - this.windowHalfY) / 10
    },
    render() {
      const _this = this
      // On above codes we only generated static objects / letters
      // In this function we implement all moving parts.

      requestAnimationFrame(_this.render)

      // rotate candleFlame.
      _this.cakeWithFlame.rotation.y -= _this.cakeRotSpeed


      // random candle flame flicker
      // CAUTION: following code has been done via 3rd party
      // Please do not update it.

      _this.time += _this.clock.getDelta()

      if (_this.allFlameMaterials.length > 0) {
        _this.allFlameMaterials.map(function(flameMaterial, i) {
          flameMaterial[0].uniforms.time.value = _this.time + i
        })
      }


      // Balloon random movement
      var timer = _this.balloonSpeed * Date.now()

      for (var i = 0, il = _this.spheres.length; i < il; i++) {
        var sphere = _this.spheres[i]
        sphere.position.x = 500 * Math.cos(timer + i)
        sphere.position.y = 200 * Math.sin(timer + i * 1.1)
      }


      // Text Animation

      // calculate next rotation angle of text. textRot changes from 359 -> 0
      _this.textRot -= _this.textRotSpeed
      if (_this.textRot < 0) { // make it loop.
        _this.textRot = _this.textRot + 360
      }
      // In case the text passes calculated threshold point we shift color of each letter by 1.
      // and insert new random color at first letter.
      if ((_this.textRot % (_this.textRotSpeed * _this.textColorTransformSpeed)) < _this.textRotSpeed) {
        for (var j = _this.wishText.length - 1; j > 0; j--)
          _this.textAnimeColors[j] = _this.textAnimeColors[j - 1]
        _this.textAnimeColors[j] = parseInt(Math.random() * _this.textColors.length)
      }

      // impolemtn movement for each letter.
      _this.wishText.split('').map((letter, i) => {
        // following if-statement exists to avoid the case when text is not loaded.
        if (!_this.textObjects[i])
          return

        // calculate i-th letter rotation angle.
        var rot = Math.PI / 180 * (_this.textSizeInAngle * i + _this.textRot)

        // calculate position of i-th letter.
        // it follows circular path centered on cakeModel with radius of *distanceToText*.
        _this.textObjects[i].position.x = _this.distanceToText * Math.sin(rot) + _this.cakeModel.position.x
        _this.textObjects[i].position.z = _this.distanceToText * Math.cos(rot) * _this.cakeModel.position.z
        _this.textObjects[i].position.y = _this.cakeModel.position.y + Math.sin(rot * _this.textYSpeed) * _this.textYScope

        // Make sure the text faces to cakeModel.
        _this.textObjects[i].rotation.y = -rot

        // Make i-th letter scale respond to calculated rot
        _this.textObjects[i].scale.x = 1 + Math.sin(rot * _this.textYSpeed) * _this.textScaleSize
        _this.textObjects[i].scale.y = 1 + Math.sin(rot * _this.textYSpeed) * _this.textScaleSize

        // on threshold angle points set updated color.
        if ((_this.textRot % (_this.textRotSpeed * _this.textColorTransformSpeed)) < _this.textRotSpeed) {
          _this.textObjects[i]['material']['color'].set(_this.textColors[_this.textAnimeColors[i]])
        }

      })


      // camera mouse animation

      _this.dx = (_this.mouseX - _this.camera.position.x) * .05
      _this.dy = (-_this.mouseY - _this.camera.position.y) * .05

      _this.camera.position.x += _this.dx
      _this.camera.position.y += _this.dy

      _this.camera.lookAt(_this.scene.position)


      _this.renderer.setClearColor('#000000')
      _this.renderer.render(_this.scene, _this.camera)
    },
    closeWindowChild() {
      this.backgroundSound.pause()
      this.$emit('closeWindow')
    }
  },
  mounted() {
    this.CONTAIN_HEIGHT = document.getElementById('happy_birthday').offsetHeight
    this.CONTAIN_WIDTH = document.getElementById('happy_birthday').offsetWidth
    this.windowHalfX = this.CONTAIN_WIDTH / 2
    this.windowHalfY = this.CONTAIN_HEIGHT / 2
    this.wishText = `Happy Birthday! Dear ${this.birthName}!`
    this.init()
  },

  watch: {
    CONTAIN_WIDTH(newVal) {
      if (newVal) {
        this.CONTAIN_WIDTH = document.getElementById('happy_birthday').offsetWidth
        this.CONTAIN_HEIGHT = document.getElementById('happy_birthday').offsetHeight
      }
    },
    CONTAIN_HEIGHT(newVal) {
      if (newVal) {
        this.CONTAIN_WIDTH = document.getElementById('happy_birthday').offsetWidth
        this.CONTAIN_HEIGHT = document.getElementById('happy_birthday').offsetHeight
      }
    }
  }
}
</script>

<style scoped lang='stylus'>

#happy_birthday
  position: fixed;
  top 100px
  left 5vw
  width 90vw
  height calc(100vh - 200px)
  z-index 999

  &.twinkling_wrapper
    -webkit-animation-name: twinkling;
    animation-name: twinkling;
    -webkit-animation-duration: 2s;
    animation-duration: 2s

  #close
    position: absolute
    right 10px
    top 10px
    font-size 30px
    color #f00
    z-index 99999
    cursor pointer

  .text-happy
    position: absolute;
    top 15px
    left 0
    right 0
    z-index 9999
    text-align center
    color #fff
    font-size 20px

  #container
    position: absolute;
    top 0
    left 0
    right: 0;
    width 100%
    height 100%
    z-index 999
    min-height: 5rem;
    background: #79B1EA; /* Old browsers */
    background: -moz-linear-gradient(top, #79B1EA 0%, #4E92EF 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #79B1EA 0%, #4E92EF 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #79B1EA 0%, #4E92EF 100%);

</style>