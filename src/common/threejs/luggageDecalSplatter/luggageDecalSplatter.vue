<template>
  <div class="decalSplatter">
    <div class="main_wrapper">
      <div id="decals">
        <div class="top_nav clearfix">
          <div class="map active">Map</div>
          <div class="recent">Recently used</div>
        </div>
        <div class="map_decals clearfix" id="map_decals">
          <div class="upload_wrapper clearfix" id="decal_upload">
            <div class="text_ipload">
              <p class="open_upload" v-if="showMore">+ Upload decal(png)</p>
              <p class="close_upload" v-if="!showMore">+</p>
            </div>
            <input id="upload_input"  name="file" type="file" multiple="false" onchange="uploadMap(this.files)" title="Upload Image Search"/>
          </div>
          <div class="map_wrapper clearfix" id="map_wrapper">
            <div class="each_decal"
                 v-for="index of totalDecalsNumer"
                 :key="index"
                 @click="changeCurrentDecal"><img :src="'/image/decals/'+index+'.png'" alt=""></div>
          </div>
          <div class="recently_wrapper clearfix" id="recently_wrapper">
            <div class="no_recently">No recently used decals!</div>
          </div>
        </div>
        <div class="show_more" @click="showMore = !showMore"><img src="/image/3dBuilder/arrow.png" alt="" width="7" height="14"></div>
      </div>
      <div id="container" @click="containerMouseDown" @mouseup="containerMouseUp" @mousemove="onTouchMove"></div>
      <div id="info">
        Imp decal splatter
        <div class="ie_notice" v-if="showIEnote">We highly recommend you open current page in Chrome or Firefox.</div>
      </div>
    </div>
    <loadingDataProgress  v-if="showLoading" :progressingBar="this.progressingBar"/>
  </div>
</template>

<script>
    import * as THREE from 'three/build/three.module.js'
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
    import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
    import {STLExporter} from 'three/examples/jsm/exporters/STLExporter'
    import {DecalGeometry} from 'three/examples/jsm/geometries/DecalGeometry'
    import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
    import loadingDataProgress from '@/common/loadingDataProgress/loadingDataProgress';
    export default {
        name: "luggageDecalSplatter",
        components:{
            loadingDataProgress
        },
        data(){
            return{
                showLoading : true,
                mouse:null,
                mouseX:0,
                mouseY:0,
                mouseHelper :null,
                showIEnote:false,
                showMore:true,
                renderer:null,
                camera:null,
                scene:null,
                plane:null,
                mesh:null,
                controls:null,
                container : null,
                exporter : null,
                line : null,
                raycaster:null,
                defaultSTL : '/models/stl/ascii/luggage.stl',
                totalDecalsNumer:52,
                decals : [], // to save all shot decals
                decalMap:{}, //decal list map obj
                recentlyUsedDecal:[],//to save all recently used decals
                params : {},
                currentSize : null, //current mouse decal size
                position : null,// shot postion
                orientation : null, // shot orientation
                decalMaterial : null,
                textureLoader: null,
                currentDecal:'/image/decals/1.png',// set first decal as default decal
                currentmaterial:null, //current mouse decal material (for mouseHelper,and current decal)
                decalDiffuse:null, // set decal decalMaterial map
                decalNormal :null,// set decal decalMaterial normalMap
                shotFlag:false, //是否已经shot/  if shot decal
                progressingBar : 0,
                menuShowFlag : false, //current menu status flag
                intersects : [],
                intersection : null,
                controlRotate : true, // the controls enableRotate
                clickedLeftMouse : false, //mouse left click
                focusedDecals:[],//鼠标位置的decal集合  all decals of mouse position
                focusedDecalFlag:null,//鼠标位置的decal Flag
                focusedDecalUUID:null, //鼠标位置的decal uuid    top decal uuid of mouse position/focused decal uuid
                decalsPRobj:{}, // all shot decals' position and rotation
                moved : false, //controls 是否可以动
                currentPosition:null,//current mouse decal position (for mouseHelper)
            }
        },
        methods:{
            IEVersion() {
                var userAgent = navigator.userAgent; //get the userAgent info of browser
                var isIE = userAgent.indexOf( "compatible" ) > - 1 && userAgent.indexOf( "MSIE" ) > - 1; //判断是否IE<11浏览器
                var isEdge = userAgent.indexOf( "Edge" ) > - 1 && ! isIE; //判断是否IE的Edge浏览器 check if it is Edge
                var isIE11 = userAgent.indexOf( 'Trident' ) > - 1 && userAgent.indexOf( "rv:11.0" ) > - 1;
                if (isIE) {
                    var reIE = new RegExp( "MSIE (\\d+\\.\\d+);" );
                    reIE.test( userAgent );
                    var fIEVersion = parseFloat( RegExp["$1"] );
                    if (fIEVersion == 7) {
                        return 7;
                    } else if (fIEVersion == 8) {
                        return 8;
                    } else if (fIEVersion == 9) {
                        return 9;
                    } else if (fIEVersion == 10) {
                        return 10;
                    } else {
                        return 6;//IE版本<=7
                    }
                } else if (isEdge) {
                    return 'edge';//edge
                } else if (isIE11) {
                    return 11; //IE11
                } else {
                    return - 1;//不是ie浏览器
                }
            },
            init(){
                const _this = this;
                _this.renderer = new THREE.WebGLRenderer( { antialias: true } );  //new a three renderer
                _this.renderer.setPixelRatio( window.devicePixelRatio );
                _this.renderer.setSize( window.innerWidth, window.innerHeight);
                _this.container.appendChild( _this.renderer.domElement ); //append renderer to container

                /*stats = new Stats(); //网络帧数
                    container.appendChild( stats.dom );*/

                _this.scene = new THREE.Scene();
                _this.scene.name = "scene"; //give the name of scene
                // sky + ground
                //sky
                _this.scene.background = new THREE.Color( 0xcce0ff );
                _this.scene.fog = new THREE.Fog( 0xcce0ff, 50, 1000 );
                // ground
                var loaderText = new THREE.TextureLoader();
                var groundTexture = loaderText.load( '/image/decals/grasslight-big.jpg' );
                groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
                groundTexture.repeat.set( 25, 25 );
                groundTexture.anisotropy = 1;
                groundTexture.encoding = THREE.sRGBEncoding;
                var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
                var meshGround = new THREE.Mesh( new THREE.PlaneBufferGeometry( 6000, 6000 ), groundMaterial );
                meshGround.position.y = - 50;
                meshGround.rotation.x = - Math.PI / 2;
                meshGround.receiveShadow = true;
                meshGround.name ="meshGround";
                _this.scene.add( meshGround );
                // sky + ground end

                // scene.add( new THREE.AxesHelper( 50 ) ); //坐标位置辅助线 Coordinate system

                // 相机位置距离 camera position
                _this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
                _this.camera.position.z = 120;
                _this.camera.target = new THREE.Vector3();

                var lights = new THREE.PointLight( 0xffffff, 0.2 ); //camera light， You do not need any other lights in your scene if you use this pattern.
                _this.camera.add( lights );
                _this.scene.add( _this.camera );

                _this.controls = new OrbitControls( _this.camera, _this.renderer.domElement ); // project controller
                _this.controls.minDistance = 50; //设置相机距离原点的最近距离 min distance of camera to coordinate origin
                _this.controls.maxDistance = 200;//设置相机距离原点的最远距离 max distance of camera to coordinate origin
                _this.controls.enablePan=false; //右键不能移动

                _this.exporter = new STLExporter(); //导出工具  exporter tool

                // LIGHTS
                _this.scene.add( new THREE.AmbientLight( 0xFFFFFFF,1.2) );//（环境光） environment light

                // 鼠标红线 mouse helper line
                var geometry = new THREE.BufferGeometry();
                geometry.setFromPoints( [new THREE.Vector3(), new THREE.Vector3()] );

                var lineMaterial = new THREE.LineBasicMaterial( {
                    color: 0xFF0000,
                    linewidth: 100,
                    linecap: 'round',
                    linejoin: 'round'
                } );
                _this.line = new THREE.Line( geometry, lineMaterial );
                _this.line.visible = false; //hide the line
                _this.line.name = "line";
                _this.scene.add( _this.line ); //鼠标辅助线

                _this.loadSTL(_this.defaultSTL,_this.decals);
                _this.raycaster = new THREE.Raycaster();
                _this.initGUI();//all the control GUI

                window.addEventListener( 'resize', _this.onWindowResize, false );

                _this.controls.addEventListener( 'change', function () {
                    _this.moved = true;
                } );
                _this.onWindowResize();
                _this.animate(); //render and so on
            },
            containerMouseDown(e){
                const _this = this;
                console.log("containerMouseDown")
                _this.moved = false;
                if (e.button == 0) { //mouse left button
                    if(_this.focusedDecalFlag&&_this.shotFlag){
                        _this.controls.enableRotate = false; //disable the controls'Rotate
                        _this.controlRotate = false;
                    }
                    else{
                        _this.controls.enableRotate = true; //enable the controls'Rotate
                        _this.controlRotate = true;
                    }
                    _this.clickedLeftMouse = true;
                }
            },
            containerMouseUp(e){
                const _this = this;
                console.log("containerMouseUp")
                if (e.button == 0) { //mouse left button
                    // menuShowFlag = true;
                    _this.clickedLeftMouse = false;
                    if(!_this.focusedDecalFlag){
                        _this.controls.enableRotate = true; //enable the controls'Rotate
                        _this.controlRotate = true;
                    }
                    // console.log("鼠标左键!")
                    var menuStatus = $(".right_click_menu").css("display"); //check the right clicked menu show or not
                    if (menuStatus != 'block') {
                        _this.checkIntersection();
                        if (!  _this.moved && _this.intersection.intersects && !_this.shotFlag) {
                            _this.shoot(0);
                            // 做点shoot后，取消鼠标decal，remove decal after shoot
                            _this.leftClick = true;
                            _this.shotFlag = true;
                            _this.clearCache( _this.mouseHelper );
                            _this.scene.remove( _this.mouseHelper ); //after shot, remove the mouseHelper
                            $( ".activeDecal" ).removeClass( 'activeDecal' ); //after shot, remove the active decal style
                        }
                    }
                }else if (e.button == 2){ //mouse right button
                    // console.log("鼠标右键!");
                    if(_this.focusedDecalFlag){ //if focused decal, then right click to show the menu for this decal
                        if(_this.focusedDecalUUID){
                            _this.showNhideMenu(1);
                        }
                    }
                }
            },
            onWindowResize() {
                var leftDecalWidth = $("#decals").width(); //left decal side width
                this.camera.aspect = (window.innerWidth-leftDecalWidth) / window.innerHeight;
                this.renderer.setSize( window.innerWidth-leftDecalWidth, window.innerHeight );
                // camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                // renderer.setSize( window.innerWidth, window.innerHeight );
            },
            animate() {
                requestAnimationFrame( this.animate );
                this.renderer.render( this.scene, this.camera );
                // stats.update();
            },
            initGUI(){
                const _this = this;
                var gui = new GUI();
                gui.add( _this.params, 'SUBMIT' );
                // gui.add( params, 'minScale', 1, 30 );
                gui.add( _this.params, 'maxScale', 1, 30 ).name( 'Mouse Decal Size' ).onChange( _this.updateDecalSize );
                gui.add( _this.params, 'rotation', -180, 180).name( 'Mouse Decal Rotation' ).onChange( _this.updateDecalTransform ); //.name( 'rotation' ).onChange( updateDecalTransform )
                gui.add( _this.params, 'back' ).name("Remove last Decal");
                gui.add( _this.params, 'forward' ).name("Restore last Decal");
                gui.add( _this.params, 'clear' ).name("Clear All");
                gui.open();
                $(".dg ul li:nth-of-type(1)").addClass("exportSTL");
                $(".dg ul li:nth-of-type(2)").addClass("decal_size");
                $(".dg ul li:nth-of-type(3)").addClass("rotation");
                $(".dg ul li:nth-of-type(4)").addClass("back_btn");
                $(".dg ul li:nth-of-type(5)").addClass("forward_btn");
                // 首次禁止操作rotation，否则报错
                // $(".rotation").find(".property-name").text("rotation( -180°- 180° )");
                // $(".rotation").addClass("rotation_cover");
                // $(".rotation div:eq(0)").addClass("rotation_no");
                // $(".rotation").find("input").addClass("input_no");
                // 首次禁止操作rotation，否则报错 end
                $(".dg.ac .dg.main.a:eq(0)").addClass("main_menu");

                var rightMenuGUI = new GUI();
                rightMenuGUI.add( _this.params, 'Size', 1, 30 ).name( 'Size' ).onChange( _this.updateDecalSizeMenu);
                rightMenuGUI.add( _this.params, 'rotationHide', -180, 180).name( 'Rotation' ).onChange( _this.updateDecalTransformMenu); //.name( 'rotation' ).onChange( updateDecalTransform )
                rightMenuGUI.add( _this.params, 'remove').name( 'Delete' ); //
                rightMenuGUI.open();
                $(".dg.ac .dg.main.a:eq(1)").addClass("right_click_menu");
                $(".right_click_menu .close-button").addClass("needHide");
                $(".right_click_menu ul li:nth-of-type(1)").addClass("menu_decal_size");
                $(".right_click_menu ul li:nth-of-type(2)").addClass("menu_rotation");
                $(".right_click_menu ul li:nth-of-type(3)").addClass("delect_current");
            },
            loadSTL( file,decalMapArr ) {
                const _this = this;
                // ASCII file
                if (!file) {
                    file = '/models/stl/ascii/luggage.stl';
                }
                var loader = new STLLoader();
                loader.load( file, function ( geometry ) {
                    var material = new THREE.MeshPhongMaterial( { color: 0x9B9EA1 } );
                    _this.mesh = new THREE.Mesh( geometry, material );
                    //position
                    _this.mesh.position.set( 0, 0, 0 );
                    _this.mesh.rotation.set( 1.6, 0, 0);
                    _this.mesh.scale.set( .08, .08, .08 );
                    _this.mesh.castShadow = true;
                    _this.mesh.receiveShadow = true;
                    _this.mesh.name = "luggage";
                    _this.scene.add( _this.mesh );
                    if(decalMapArr.length>0){
                        for (var i in decalMapArr){
                            _this.scene.add( decalMapArr[i] );
                        }
                    }
                    var currentscale = _this.params.maxScale;
                    _this.currentSize.set( currentscale, currentscale, currentscale );
                    var currentmaterial1 = _this.decalMaterial.clone();
                    _this.mouseHelper= new THREE.Mesh( new DecalGeometry(_this.mesh, _this.position, _this.orientation, _this.currentSize ), currentmaterial1 );
                    _this.mouseHelper.name = 'mouseHelper';
                    _this.scene.add( _this.mouseHelper );
                    console.log(_this.scene.children)
                    setTimeout(function () {
                        $(".each_decal:eq(0)").trigger("click"); //激活鼠标首次decal显示
                    },200)
                    _this.showLoading = false;
                },
                // onProgress callback
                function ( xhr ) {
                    // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                    _this.progressingBar =( xhr.loaded / xhr.total * 100 )
                },
                // onError callback
                function ( err ) {
                    console.log( 'An error happened :' +err );
                });
            },
            changeCurrentDecal(e){
                const _this = this;
                const obj = e.target;
                _this.showLoading = true;
                // return function(obj){
                // console.log(img);
                $(".each_decal").removeClass("activeDecal");
                var img;
                if($(obj).hasClass("each_decal")){
                    $(obj).addClass("activeDecal");
                    img = $(obj).find("img").attr("src");
                }
                else{
                    $(obj).closest(".each_decal").addClass("activeDecal");
                    img = $(obj).attr("src");
                }
                _this.currentDecal = img;
                _this.decalDiffuse = _this.textureLoader.load( _this.currentDecal );
                _this.decalNormal =  _this.textureLoader.load( _this.currentDecal );
                _this.decalMaterial = new THREE.MeshPhongMaterial( {
                    specular: 0x444444,
                    map: _this.decalDiffuse,
                    normalMap: _this.decalNormal,
                    normalScale: new THREE.Vector2( 1, 1 ),
                    shininess: 30,
                    transparent: true,
                    depthTest: true,
                    depthWrite: false,
                    polygonOffset: true,
                    polygonOffsetFactor: - 4,
                    wireframe: false,
                    color:0xC3C3C3,
                } );
                _this.changeMouseDecal();
                _this.shotFlag = false; //恢复可点击shoot
            },
            changeMouseDecal(){
                const _this = this;
                // 改变鼠标decal
                var currentscale = _this.params.maxScale;
                _this.currentSize.set( currentscale, currentscale, 30 );
                _this.currentmaterial = _this.decalMaterial.clone();
                _this.position.set(0, 0, 0); //reset position
                _this.orientation.set(0,0,0);//reset orientation
                _this.clearCache(_this.mouseHelper);
                _this.scene.remove(_this.mouseHelper);
                _this.mouseHelper= new THREE.Mesh( new DecalGeometry( _this.mesh, _this.currentPosition, _this.orientation, _this.currentSize ), _this.currentmaterial );
                _this.scene.add(_this.mouseHelper)
                // 改变鼠标decal end
                _this.showLoading = false;
            },
            onTouchMove( event ) {
                const _this = this;
                var x, y;
                if (event.changedTouches) {
                    x = event.changedTouches[0].pageX;
                    y = event.changedTouches[0].pageY;
                } else {

                    x = event.clientX;
                    y = event.clientY;

                }
                var leftDecalWidth = $("#decals").width(); //left decal side width
                _this.mouse.x = (x / (window.innerWidth + leftDecalWidth)) * 2 - 1;
                // mouse.x = ( x / window.innerWidth ) * 2 - 1;
                _this.mouse.y = -(y / window.innerHeight) * 2 + 1;
                if (!_this.menuShowFlag) {
                    _this.checkIntersection();
                }
                if (!_this.controlRotate && _this.clickedLeftMouse) { // https://github.com/spite/THREE.DecalGeometry/issues/9
                    if (_this.focusedDecalUUID) {
                        for (var i in _this.decals) {
                            var currentDecal = _this.decals[i];
                            if (currentDecal.uuid == _this.focusedDecalUUID) {
                                for (var j in _this.decalsPRobj) {
                                    if (_this.focusedDecalUUID == _this.decalsPRobj[j].uuid) {
                                        var thisShootPostion = _this.decalsPRobj[j].position;
                                        var thisShootrotation = _this.decalsPRobj[j].orientation;
                                        var this_size = _this.decalsPRobj[j].size;
                                        thisShootPostion.copy(_this.mouseHelper.position);
                                        _this.params.Size = this_size;
                                        break;
                                    }
                                }
                                _this.decalMaterial = currentDecal.material;
                                _this.clearCache(currentDecal);
                                _this.scene.remove(currentDecal);
                                _this.decals.splice(i, 1); //remove element that index is i in array decals
                                _this.shoot(5, thisShootrotation, thisShootPostion);
                                break;
                            }
                        }
                    }
                }
            },
            checkIntersection() {
                const _this = this;
                if (! _this.mesh) return;

                _this.raycaster.setFromCamera( _this.mouse, _this.camera );
                _this.raycaster.intersectObject( _this.mesh, false, _this.intersects );

                if (_this.intersects.length > 0) {
                    var p = _this.intersects[0].point;
                    _this.mouseHelper.position.set( 0, 0, 0 );
                    _this.mouseHelper.position.copy( p );  //copy intersection position to mouseHelper
                    _this.intersection.point.copy( p );
                    /*1.克隆旧的法线 2.旧法线乘以模型的世界矩阵得到归一化后的法线 3.和一个标量相乘，放大10倍。 4.加上点击点的坐标，进行平移。*/
                    var n = _this.intersects[0].face.normal.clone();
                    n.transformDirection( _this.mesh.matrixWorld );
                    n.multiplyScalar( 10 );
                    n.add( _this.intersects[0].point );

                    _this.intersection.normal.copy( _this.intersects[0].face.normal );
                    _this.mouseHelper.lookAt( n );

                    var positions = _this.line.geometry.attributes.position;
                    positions.setXYZ( 0, p.x, p.y, p.z );
                    positions.setXYZ( 1, n.x, n.y, n.z );
                    positions.needsUpdate = true;


                    if(_this.shotFlag){ //if shot, we can pick decal

                        // var sceneChilds = scene.children;
                        var sceneChilds = _this.raycaster.intersectObjects( _this.scene.children ); //get all objects in the current position of your mouse;
                        for(var i in sceneChilds){
                            if(sceneChilds[i]["object"]){
                                var currentObj =  sceneChilds[i]["object"];
                                if(currentObj["name"] == "decal"){ //get all objects whose name is decal in the current position of your mouse;
                                    _this.focusedDecals.push(currentObj);
                                }
                            }
                        }
                        if(_this.focusedDecals.length>0){
                            var topDecal = _this.focusedDecals[_this.focusedDecals.length-1]; //get last shot decal object in the current position of your mouse;
                            if(_this.focusedDecalUUID){
                                // eslint-disable-next-line no-redeclare
                                for(var i in _this.decals){
                                    if(_this.decals[i].uuid == _this.focusedDecalUUID){ //reset the last focused decal object color
                                        _this.decals[i].material.color.set("#C3C3C3");
                                        break;
                                    }
                                    else{
                                        _this.decals[i].material.color.set("#C3C3C3");
                                    }
                                }
                            }
                            _this.focusedDecalUUID = topDecal.uuid; //reset the current focused decal object uuid
                            _this.focusedDecalFlag = true;
                            topDecal.material.color.set( '#f00' ); //set the current focused decal object color
                        }
                        else{
                            _this.showNhideMenu(0);
                            if(_this.focusedDecalUUID){ //if current position of your mouse do not have decal, reset all decal color;

                                // eslint-disable-next-line no-redeclare
                                for(var i in _this.decals){
                                    if(_this.decals[i].uuid == _this.focusedDecalUUID){//reset the last focused decal object color
                                       _this.decals[i].material.color.set("#C3C3C3");
                                        break;
                                    }
                                    else{
                                        _this.decals[i].material.color.set("#C3C3C3");
                                    }
                                }
                            }
                            _this.focusedDecalFlag = false;
                        }
                    }
                    _this.focusedDecals = []; //reset decals array
                    _this.intersection.intersects = true;
                    _this.intersects.length = 0;

                } else {
                    _this.intersection.intersects = false;
                    _this.line.visible = false;
                    _this.showNhideMenu(0);
                    // eslint-disable-next-line no-redeclare
                    for(var i in _this.decals){ //if do not have intersects, clean the select status and clean the focusedDecalUUID
                        if(_this.decals[i].uuid == _this.focusedDecalUUID){//if current position of your mouse do not have decal, reset all decal color;
                            _this.decals[i].material.color.set("#C3C3C3");//reset the last focused decal object color
                            break;
                        }
                    }
                    _this.focusedDecals = [];
                    _this.focusedDecalFlag =false;
                    _this.focusedDecalUUID = "";
                    _this.controls.enableRotate = true; //enable the controls'Rotate
                    _this.controlRotate = true;
                }
            },
            shoot(type,lastRotation,lastPosition) { //type:0 第一次点击 1，旋转贴图 3: 选中贴图的旋转 4, 选中贴图改变大小尺寸
                const _this = this;
                // 当前选择贴图替换
                var sameImgNum=0;
                for(var i in _this.recentlyUsedDecal){
                    if(_this.recentlyUsedDecal[i] == _this.currentDecal){
                        sameImgNum++;
                    }
                }
                if(sameImgNum == 0){
                    _this.recentlyUsedDecal.push(_this.currentDecal);
                }

                // 当前选择贴图替换end
                if(type==1 || type == 3|| type == 4|| type == 5){
                    _this.position.copy( lastPosition );
                    _this.orientation.copy( lastRotation);
                }
                else{
                    _this.position.copy( _this.intersection.point );
                    _this.orientation.copy( _this.mouseHelper.rotation );
                    if(_this.orientation._z == 0 && _this.params.rotation !=0){ //default orientation z is 0, if
                        _this.orientation._z = _this.params.rotation / 60;
                    }
                    _this.lastShootPostion = _this.position;
                    _this.lastShootrotation =_this.orientation;
                }
                // if ( params.rotate ) orientation.z = Math.random() * 2 * Math.PI;
                var scale = _this.params.maxScale;
                if(type == 3 || type == 4|| type == 5){ //type 3，4 is change selected decal, so using other size attr
                    scale = _this.params.Size;
                }
                _this.size.set( scale, scale, scale );
                var material = _this.decalMaterial.clone();
                var m = new THREE.Mesh( new DecalGeometry( _this.mesh, _this.position, _this.orientation, _this.size ), material );
                m.name = 'decal';
                _this.decals.push( m );
                _this.scene.add( m );
                var prObj = {};
                prObj["position"]=_this.position.clone();
                prObj["orientation"]=_this.orientation.clone();
                prObj["size"]=scale;
                prObj["uuid"]=m.uuid;
                _this.decalsPRobj[m.uuid] = prObj;
                if(type == 3 || type == 4){ //each time reshoot, the decalGeometry is the new one, so the uuid changed
                    _this.focusedDecalUUID = m.uuid;
                }
                if(_this.decals.length>0){
                    if(_this.decals.length>0){
                        $(".back_btn").addClass("active_back")
                    }
                }
                // _this.createMap("recently_wrapper",_this.recentlyUsedDecal);
            },
            showNhideMenu(type){ //type 1: show 0:hide
                const _this = this;
                if(type == 0){
                    _this.menuShowFlag = false;
                    _this.focusedDecalFlag = false; //mouse focus or not
                    $(".right_click_menu,.right_menu_bg").hide(); //if flag == false, hide menu
                    $(".main_menu").show();
                }
                else {
                    var this_size;
                    var this_rotation;
                    if(_this.focusedDecalUUID){
                        for(var j in _this.decalsPRobj){
                            if(_this.focusedDecalUUID == _this.decalsPRobj[j].uuid){
                                this_size = _this.decalsPRobj[j].size;
                                this_rotation =_this.decalsPRobj[j].orientation;
                                _this.params.Size = this_size;
                                $(".right_click_menu").find(".menu_decal_size input").val(this_size); //reset menu size number
                                var this_size_width = 100/30*this_size;
                                $(".right_click_menu").find(".menu_decal_size .slider-fg").css({"width": this_size_width+'%'});//reset menu size slider length
                                _this.updateDecalSizeMenu();
                                var this_rotation_input;
                                if(this_rotation.z == 0){
                                    this_rotation_input = 0
                                }
                                else{
                                    this_rotation_input = this_rotation.z * 60;
                                }
                                $(".right_click_menu").find(".menu_rotation input").val(this_rotation_input); //reset menu size number
                                var this_rotation_width;
                                if(this_rotation_input>=0){
                                    if(this_rotation_input == 0 ){
                                        this_rotation_width = 50;
                                    }
                                    else{
                                        this_rotation_width = (this_rotation_input/180)*50+50;
                                    }
                                }
                                else{
                                    if(this_rotation_input == -180){
                                        this_rotation_width = 0;
                                    }
                                    else{
                                        this_rotation_width = (-this_rotation_input/180)*50;
                                    }
                                }

                                $(".right_click_menu").find(".menu_rotation .slider-fg").css({"width": this_rotation_width+'%'});//reset menu size slider length

                                break;
                            }
                        }
                    }

                    $( ".right_click_menu,.right_menu_bg" ).show(); //show menu
                    $( ".right_click_menu" ).css( { "left": _this.mouseX, "top": _this.mouseY } );
                    $(".main_menu").hide();
                    setTimeout(function(){
                        _this.menuShowFlag = true;
                    },500)
                }
            },
            /**
             * 清空当前obj对象的缓存
             * @param mesh  mesh对象
             * */
            clearCache(currentMesh) {
                currentMesh.geometry.dispose();
                currentMesh.material.dispose();
            }


        },
        mounted() {
            this.container = document.getElementById( 'container' );
            if(this.IEVersion()!==-1){
                this.showIEnote=true;
            }
            this.currentSize = new THREE.Vector3( 10, 10, 10 )
            this.params = {  //params for GUI
                SUBMIT:function (){
                    this.exportASCII();
                },
                /*minScale: 10,*/
                maxScale: 30,
                maxScaleHide: 30,
                Size: 30,
                rotation: Math.PI /180, // positive is counter-clockwise   Math.PI = 3.14 = 180°
                rotationHide: Math.PI /180, // positive is counter-clockwise   Math.PI = 3.14 = 180°
                back: function () {
                    this.removeLastDecals();
                },
                forward: function () {
                    this.returnLastDecals();
                },
                clear: function () {
                    this.removeDecals();
                },
                remove:function(){
                    this.removeSelectedDecal();
                }}
            this.textureLoader = new THREE.TextureLoader();
            this.decalDiffuse = this.textureLoader.load( '/image/decals/1.png' );  // set decal decalMaterial map
            this.decalNormal = this.textureLoader.load( '/image/decals/1.png' ); // set decal decalMaterial normalMap
            this.decalMaterial = new THREE.MeshPhongMaterial( {
                // ambient:0x444444,//环境光颜色）
                specular: 0x444444, //（镜面反射光颜色）
                // shininess:30, //（镜面反射光强度）此属性指定 specular 镜面反射光部分的亮度。默认值是 30
                // emissive:0x444444, //（自发光颜色）
                map: this.decalDiffuse,
                normalMap: this.decalNormal,
                normalScale: new THREE.Vector2( 1, 1 ),
                name:"decalMaterial",
                shininess: 30,
                transparent: true,
                depthTest: true,
                depthWrite: false,
                polygonOffset: true,
                polygonOffsetFactor: - 4,
                wireframe: false,
                color:0xC3C3C3,
            } )
            this.position = new THREE.Vector3();  // shot postion
            this.orientation = new THREE.Euler(); // shot orientation
            this.intersection = {
                intersects: false,
                point: new THREE.Vector3(),
                normal: new THREE.Vector3()
            }
            this.mouse = new THREE.Vector2();
            this.currentPosition = new THREE.Vector3(0,0,0);//current mouse decal position (for mouseHelper)
            this.init();

        }
    }
</script>

<style scoped lang="stylus">
.decalSplatter
  .main_wrapper
    width: 100%;
    position: relative;
    div#decals
      width: 3.55rem
      min-width: 1.27rem;
      height: 100%;
      float: left;
      background: #F4F4F4;
      position: fixed;
      left: 0;
      top: 0;
      overflow: auto
      .top_nav
        margin: 0 auto;
        width: 3.2rem;
        .map,.recent
          float: left;
          width: 50%;
          display: inline-block;
          text-align: center;
          color:#333;
          font-size:.16rem;
          line-height:.26rem;
          cursor: pointer
        .map.active
          border-bottom: 2px solid #333;
      .map_decals
        #decal_upload
          position: relative;
          cursor: pointer;
          .text_ipload
            cursor: pointer;
            color: #999;
            width: 95%;
            margin: 10px auto;
            padding: .1rem;
            text-align: center;
            border: 1px dashed #999;
            .open_upload
              margin: 0;
              font-size .13rem
          #upload_input
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 9px;
            width: 95%;
            height: 36px;
            opacity: 0;
            z-index: 1;
            font-size .13rem
        .map_wrapper,.recently_wrapper
          margin: 0 auto;
          width: 330px;
          .each_decal
            position: relative;
            width: 100px;
            height: 100px;
            float: left;
            border:1px solid #D6DBE1;
            margin: 5px;
            background: #F4F4F4;
            img
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              max-width: 100%;
              max-height: 100%;
          .each_decal.activeDecal
            border:1px solid red



      .show_more
        background-image: url("/image/decals/showmore.png");
        background-repeat: no-repeat;
        background-size: cover;
        position: fixed;
        left: 355px;
        top: 50%;
        width: 17px;
        height: 47px;
        cursor: pointer;
        img
          position: absolute;
          left: 6px;
          top: 17px;
          cursor: pointer;
    div#decals.close
      width: 127px;
      overflow-x: hidden
      .top_nav
        .recent
          display: none
      .map_wrapper,.recently_wrapper,.top_nav
        width: 1.08rem
    #container
      position fixed
      right 0
      top 0
      bottom 0
      z-index 1




</style>
