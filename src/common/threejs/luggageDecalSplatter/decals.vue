<template>
  <div id="container" @mousemove="onTouchMove" @mouseup="mouseUp" @mousedown="moved = false"></div>
</template>

<script>
    import * as THREE from 'three/build/three.module.js'
    import Stats from 'three/examples/jsm/libs/stats.module.js';
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
    import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
    // import {STLExporter} from 'three/examples/jsm/exporters/STLExporter'
    import {DecalGeometry} from 'three/examples/jsm/geometries/DecalGeometry'
    import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
    export default {
        name: "decals",
        data(){
            return {
                container : null,
                renderer:null,
                scene   :null,
                camera  :null,
                stats   :null,
                mesh   :null,
                line   :null,
                raycaster   :null,
                intersection : {
                    intersects: false,
                    point: new THREE.Vector3(),
                    normal: new THREE.Vector3()
                },
                mouse : new THREE.Vector2(),
                intersects : [],
                textureLoader : null,
                decalDiffuse : null,
                decalNormal : null,
                decalMaterial : null,
                decals : [],
                mouseHelper : null,
                position : null,
                orientation : null,
                size : null,
                params : null,
                moved : false,

            }
        },
        methods:{
            init() {
                const _this = this;
                _this.renderer = new THREE.WebGLRenderer( { antialias: true } );
                _this.renderer.setPixelRatio( window.devicePixelRatio );
                _this.renderer.setSize( window.innerWidth, window.innerHeight );
                _this.container.appendChild( _this.renderer.domElement );
                _this.stats = new Stats();
                _this.container.appendChild( _this.stats.dom );
                _this.scene = new THREE.Scene();
                _this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
                _this.camera.position.z = 120;
                _this.camera.target = new THREE.Vector3();

                var controls = new OrbitControls( _this.camera, _this.renderer.domElement );
                controls.minDistance = 50;
                controls.maxDistance = 200;

                _this.scene.add( new THREE.AmbientLight( 0x443333 ) );

                var light = new THREE.DirectionalLight( 0xffddcc, 1 );
                light.position.set( 1, 0.75, 0.5 );
                _this.scene.add( light );

                // eslint-disable-next-line no-redeclare
                var light = new THREE.DirectionalLight( 0xccccff, 1 );
                light.position.set( - 1, 0.75, - 0.5 );
                _this.scene.add( light );

                var geometry = new THREE.BufferGeometry();
                geometry.setFromPoints( [ new THREE.Vector3(), new THREE.Vector3() ] );

                _this.line = new THREE.Line( geometry, new THREE.LineBasicMaterial() );
                _this.scene.add( _this.line );

                _this.loadLeePerrySmith();

                _this.raycaster = new THREE.Raycaster();

                _this.mouseHelper = new THREE.Mesh( new THREE.BoxBufferGeometry( 1, 1, 10 ), new THREE.MeshNormalMaterial() );
                _this.mouseHelper.visible = false;
                _this.scene.add( _this.mouseHelper );

                window.addEventListener( 'resize', _this.onWindowResize, false );


                controls.addEventListener( 'change', function () {

                    _this.moved = true;

                } );


                var gui = new GUI();

                gui.add( _this.params, 'minScale', 1, 30 );
                gui.add( _this.params, 'maxScale', 1, 30 );
                gui.add( _this.params, 'rotate' );
                gui.add( _this.params, 'clear' );
                gui.open();

                _this.onWindowResize();
                _this.animate();

            },
            mouseUp(){
                const _this = this;
                _this.checkIntersection();
                if ( ! _this.moved && _this.intersection.intersects ) _this.shoot();

            },
            checkIntersection() {
                const _this = this;
                if ( ! _this.mesh ) return;

                _this.raycaster.setFromCamera( _this.mouse, _this.camera );
                _this.raycaster.intersectObject( _this.mesh, false, _this.intersects );

                if ( _this.intersects.length > 0 ) {

                    var p = _this.intersects[ 0 ].point;
                    _this.mouseHelper.position.copy( p );
                    _this.intersection.point.copy( p );

                    var n = _this.intersects[ 0 ].face.normal.clone();
                    n.transformDirection( _this.mesh.matrixWorld );
                    n.multiplyScalar( 10 );
                    n.add( _this.intersects[ 0 ].point );

                    _this.intersection.normal.copy( _this.intersects[ 0 ].face.normal );
                    _this.mouseHelper.lookAt( n );

                    var positions = _this.line.geometry.attributes.position;
                    positions.setXYZ( 0, p.x, p.y, p.z );
                    positions.setXYZ( 1, n.x, n.y, n.z );
                    positions.needsUpdate = true;

                    _this.intersection.intersects = true;
                    _this.intersects.length = 0;

                } else {

                    _this.intersection.intersects = false;

                }

            },
            onTouchMove( event ) {
              const _this = this;
                var x, y;

                if ( event.changedTouches ) {

                    x = event.changedTouches[ 0 ].pageX;
                    y = event.changedTouches[ 0 ].pageY;

                } else {

                    x = event.clientX;
                    y = event.clientY;

                }

                _this.mouse.x = ( x / window.innerWidth ) * 2 - 1;
                _this.mouse.y = - ( y / window.innerHeight ) * 2 + 1;

                _this.checkIntersection();

            },
            loadLeePerrySmith() {
                const _this = this;
                var loader = new STLLoader();

                loader.load( '/models/stl/ascii/luggage.stl', function ( geometry ) {

                    var material = new THREE.MeshPhongMaterial( { color: 0x9B9EA1 } );
                    _this.mesh = new THREE.Mesh( geometry, material );
                    _this.mesh.position.set( 0, 0, 0 );
                    _this.mesh.rotation.set( 1.6, 0, 0);
                    _this.mesh.scale.set( .08, .08, .08 );
                    _this.mesh.castShadow = true;
                    _this.mesh.receiveShadow = true;
                    _this.mesh.name = "luggage";
                    _this.scene.add( _this.mesh );
                    // _this.mesh.scale.set( 10, 10, 10 );

                } );

            },
            shoot() {
                const _this = this;
                _this.position.copy( _this.intersection.point );
                _this.orientation.copy( _this.mouseHelper.rotation );

                if ( _this.params.rotate ) _this.orientation.z = Math.random() * 2 * Math.PI;

                var scale = _this.params.minScale + Math.random() * ( _this.params.maxScale - _this.params.minScale );
                _this.size.set( scale, scale, scale );

                var material = _this.decalMaterial.clone();
                material.color.setHex( Math.random() * 0xffffff );

                var m = new THREE.Mesh( new DecalGeometry( _this.mesh, _this.position, _this.orientation, _this.size ), material );

                _this.decals.push( m );
                _this.scene.add( m );

            },
            removeDecals() {
                const _this = this;
                for(const i in _this.decals){
                    _this.scene.remove( _this.decals[i]);
                }
                _this.decals = [];

            },
            onWindowResize() {

                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize( window.innerWidth, window.innerHeight );

            },
            animate() {

               requestAnimationFrame( this.animate );
               this.renderer.render( this.scene, this.camera );
               this.stats.update();

            }
        },
        mounted() {
            this.container = document.getElementById( 'container' );

                this.intersection = {
                intersects: false,
                point: new THREE.Vector3(),
                normal: new THREE.Vector3()
            };
            this.mouse = new THREE.Vector2();
            this.textureLoader = new THREE.TextureLoader();
            this.decalDiffuse = this.textureLoader.load( '/image/decals/1.png' );
            this.decalNormal = this.textureLoader.load( '/image/decals/1.png' );
            this.decalMaterial = new THREE.MeshPhongMaterial({
                specular: 0x444444,
                map: this.decalDiffuse,
                normalMap: this.decalNormal,
                normalScale: new THREE.Vector2(1, 1),
                shininess: 30,
                transparent: true,
                depthTest: true,
                depthWrite: false,
                polygonOffset: true,
                polygonOffsetFactor: -4,
                wireframe: false
            });
            this.position = new THREE.Vector3();
            this.orientation = new THREE.Euler();
            this.size = new THREE.Vector3( 10, 10, 10 );
            this.params = {
                minScale: 10,
                    maxScale: 20,
                    rotate: true,
                    clear: function () {
                    this.removeDecals();
                }
            };
            this.init();
        }
    }
</script>

<style scoped>
  body {
    margin: 0;
    background-color: #000;
    color: #fff;
    font-family: Monospace;
    font-size: 13px;
    line-height: 24px;
    overscroll-behavior: none;
  }

  a {
    color: #ff0;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    cursor: pointer;
    text-transform: uppercase;
  }

  canvas {
    display: block;
  }

  #info {
    position: absolute;
    top: 0px;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
    z-index: 1; /* TODO Solve this in HTML */
  }

  a, button, input, select {
    pointer-events: auto;
  }

  .dg.ac {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 2 !important; /* TODO Solve this in HTML */
  }

  #overlay {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    background-color: #000000;
    color: #ffffff;
  }

  #overlay > div {
    text-align: center;
  }

  #overlay > div > button {
    height: 20px;
    background: transparent;
    color: #ffffff;
    outline: 1px solid #ffffff;
    border: 0px;
    cursor: pointer;
  }

  #overlay > div > p {
    color: #777777;
    font-size: 12px;
  }

</style>
