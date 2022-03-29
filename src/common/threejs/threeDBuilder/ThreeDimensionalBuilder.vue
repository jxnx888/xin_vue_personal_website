<template>
  <div class='builder fixedBuilder'>
    <div :class='`main_wrapper main_wrapper_${this.$i18n.locale}`' id='mainWrapper'>
      <div id='container' class='clearfix' @click='containerListenner' @mousedown='containerMouseDown'
           @mousemove='containerMouseMove' @mouseup='containerMouseUp'></div>
      <div class='show_more clearfix' @click='showMoreFn()' :class="showMore?'':'show_more_close'"><img
        src='/image/3dBuilder/arrow.png' alt=''></div>
      <div v-show='showMore' id='shapes' class='clearfix'>
        <div class='shapes_wrapper' v-if='!shapesListShow && !cartoonStlShow'>
          <div class='shapes_options normal' @click='showModule(0)'>{{ $t('REGULAR') }} {{ $t('MODEL') }} <i
            class='iconfont arrow arrow_right'>&#xe6f8;</i></div>
          <div class='shapes_options cartoon' @click='showModule(1)'>{{ $t('CARTOON') }} {{ $t('MODEL') }} <i
            class='iconfont arrow arrow_right'>&#xe6f8;</i></div>
        </div>
        <div id='childWrapper' v-if='shapesListShow || cartoonStlShow'>
          <div class='child_wrapper normal_wrapper' v-if='shapesListShow'>
            <div class='child_title' @click='hideModule()'><i class='iconfont arrow'>&#xe720;</i>{{ $t('REGULAR') }}
              {{ $t('MODEL') }}
            </div>
            <div v-for='(item, index) in shapesList'
                 :key=index
                 :class='item.title'
                 @click='selectModule(0,item.code,index,item.module)'
                 class='module shapes drag'>
              <input v-if="item.module =='shape'" class='this_module' type='hidden' value='0'>
              <input v-else-if="item.module =='stl'" class='this_module' type='hidden' value='1'>
              <input v-else-if="item.module =='text'" class='this_module' type='hidden' value='2'>
              <input class='this_code' type='hidden' :value='item.code'>
              <div class='drag sprint' :class="'sprint_'+item.title"
                   v-lazy:background-image="'/image/3dBuilder/3dPrinting/sprint_'+item.title+'.png'"></div>
              <div class='name drag'>{{ $t(item.name) }}</div>
            </div>
          </div>
          <div class='child_wrapper cartoon_wrapper' v-if='cartoonStlShow'>
            <div class='child_title' @click='hideModule()'><i class='iconfont arrow'>&#xe720;</i>{{ $t('CARTOON') }}
              {{ $t('MODEL') }}
            </div>
            <div v-for='(item, index) in cartoonStlList'
                 :key=index
                 :class='item.title'
                 @click='selectModule(1,item.code,index,item.module)'
                 class='module lego drag'>
              <input class='this_module' type='hidden' value='1'>
              <input class='this_code' type='hidden' :value='index'>
              <div class='drag sprint sprintY' :class="'sprint_'+item.title"
                   v-lazy:background-image="'/image/3dBuilder/3dPrinting/sprint_'+item.title+'.png'"></div>
              <div class='name drag'>{{ $t(item.name) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class='module_btns clearfix'>
        <div class='btn_main go_mainPage' @click='leaveBuilder()'>
          <div class='btn_child btn_home'><i class='iconfont'>&#xe651;</i></div>
          <div class='module_btn_name'>{{ $t('BACK') }}</div>
        </div>
        <div class='btn_main save_module save_stl' :class="activeSave?'':'noActive_save'" @click='saveModuleShow(0)'>
          <div class='btn_child btn_save_module'><i class='iconfont'>&#xe710;</i></div>
          <div class='module_btn_name'>{{ $t('SAVE') }}</div>
        </div>
      </div>
      <div class='obj_control has_right_menu'>
        <div class='obj_control_wrapper clearfix' v-if='controlBar'>
          <div class='control_btn undo_control ' :class="undoActive?'':'noActive_control'" @click='redoUndo(0)'>
            <i class='iconfont'>&#xe696;</i>
            <div class='btn_name'>{{ $t('REDO') }}</div>
          </div>
          <div class='control_btn redo_control ' :class="redoActive?'':'noActive_control'" @click='redoUndo(1)'>
            <i class='iconfont'>&#xe697;</i>
            <div class='btn_name'>{{ $t('UNDO') }}</div>
          </div>
          <div class='control_btn size_control' @click='changeControls(0)'>
            <div class='icon_wrapper'>
              <i class='iconfont'>&#xe6aa;</i>
            </div>
            <div class='btn_name'>{{ $t('CHANGE_SIZE') }}</div>
          </div>
          <div class='control_btn trans_control active_control' @click='changeControls(1)'>
            <div class='icon_wrapper'>
              <i class='iconfont'>&#xe69b;</i>
            </div>
            <div class='btn_name'>{{ $t('MOVE') }}</div>
          </div>
          <div class='control_btn rotate_control' @click='changeControls(2)'>
            <div class='icon_wrapper'>
              <i class='iconfont'>&#xe626;</i>
            </div>
            <div class='btn_name'>{{ $t('ROTATE') }}</div>
          </div>
          <div class='control_btn zoomin_control' @click='showChild(0)'>
            <i class='iconfont'>&#xe64e;</i>
            <div class='btn_name'>{{ $t('ZOOM') }}</div>
            <div class='zoom_options' v-if='showZoomOption'>
              <div class='zoom_opt' @click='zoomView(50)'>50%</div>
              <div class='zoom_opt' @click='zoomView(100)'>100%</div>
              <div class='zoom_opt' @click='zoomView(200)'>200%</div>
            </div>
          </div>
          <!--<div class="control_btn zoomout_control" @click="cameraSides(7)">
                  <i class="iconfont">&#xe691;</i>
                  <div class="btn_name">放大</div>
              </div>
              <div class="control_btn zoomout_control" @click="cameraSides(8)">
                  <i class="iconfont">&#xe632;</i>
                  <div class="btn_name">缩小</div>
              </div>-->
          <div class='control_btn delete_control' @click='deletedSelected()'>
            <i class='iconfont'>&#xe783;</i>
            <div class='btn_name'>{{ $t('DELETE') }}</div>
          </div>
          <div class='control_btn color_control_wrapper' v-if='colorControl' @click='showChild(1)'>
            <div class='color_circle outside_color' :class="isWhite?'white_color_circle':''"></div>
            <div class='btn_name'>{{ $t('COLOR') }}</div>
            <div class='color_wrapper' v-if='showColorOption'>
              <div class='color_control yellow_control' @click='changeCurrentColor(1)'>
                <div class='color_circle'></div>
              </div>
              <div class='color_control white_control' @click='changeCurrentColor(0)'>
                <div class='color_circle'></div>
              </div>
            </div>
          </div>

        </div>
        <!--<div class="zoom_control">
              <div class="iconfont" @click="cameraSides(7)">&#xe611;</div>
              <div class="zoom_index">100%</div>
              <div class="iconfont" @click="cameraSides(8)">&#xe626;</div>
          </div>-->
      </div>
    </div>
    <div class='save_name_module_bg' v-if='saveNmaeWindow'></div>
    <div class='save_name_module' v-if='saveNmaeWindow'>
      <div class='save_name_title'>{{ $t('NAME') }}</div>
      <div class='save_name_tip'>{{ $t('NAME_MODEL') }}</div>
      <input type='text' placeholder="$t('ENTER_MODEL_NAME')" maxlength='14' id='save_name'
             oninput="saveModuleName(this,'oninput')"
             onblur="saveModuleName(this,'onblur')" onFocus="saveModuleName(this,'onFocus')"
             onkeyup="this.value=this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g ,'')"
             blur="saveModuleName(this,'blur')"
             :value=this.getTimeStr()
      >
      <div class='save_name_verify'>{{ $t('ENTER_MODEL_NAME') }}</div>
      <div class='btn_wrapper clearfix'>
        <img src='/image/3dBuilder/3dPrinting/btn_yes1.png' class='save_name_ok' @click="activeSave?exportMoudle(0):''">
        <img src='/image/3dBuilder/3dPrinting/btn_close.png' class='imgBtn save_name_cancle'
             @click='saveModuleShow(1)'>
      </div>
    </div>
    <div class='save_ask_module_bg' v-if='notSaveNote'></div>
    <div class='save_ask' v-if='notSaveNote'>
      <div class='save_name_title'>{{ $t('NOTE') }}</div>
      <div class='save_name_tip'>
        {{ $t('SAVE_OR_NOT') }}
      </div>
      <div class='btn_wrapper clearfix'>
        <img src='/image/3dBuilder/3dPrinting/btn_no.png' class='go_home_ok' @click='goHomeSaveModule(0)'>
        <img src='/image/3dBuilder/3dPrinting/btn_yes.png' class='go_home_ok' @click='goHomeSaveModule(1)'>
        <img src='/image/3dBuilder/3dPrinting/btn_close.png' class='imgBtn save_name_cancle' @click='hideAskWindow()'>
      </div>
    </div>
    <div class='note'>
      <div class='select_module'>选择一个模型，点击 箭头按 <span class='red'>X</span>,<span class='green'>Y</span>,<span
        class='blue'>Z</span>单向缩放,点击中心方块或 者双指，进行整体 缩放
      </div>
    </div>
    <div class='text_window' v-if='showTextWindow'>
      <div class='text_title'>{{$t('GENERATE_TEXT')}}</div>
      <input type='text' placeholder="$t{'ENTER_TEXT'}" maxlength='10' id='textContent' @input='textInputFn'
             @blur='textInputFn'>
      <div class='btn_wrapper clearfix'>
        <div class='btns btn_ok text_ok' :class="inputCanConfirm?'':'btn_disable'"
             @click='inputCanConfirm?insertWord():null'>{{$t('CONFIRM')}}
        </div>
        <div class='btns btn_cancle text_cancle' @click='showInput(1)'>{{$t('CANCEL')}}</div>
      </div>
    </div>
    <div class='control_type' v-if='controlType' v-text='statusTxt'>{{$t('CURRENT_STATUS')}} {{$t('MOVE')}}</div>
    <div id='loading_data' :class="showMore?'hideShowMore':''" v-if='showLoading'><img
      src='/image/3dBuilder/loading.gif' alt=''>
      <div class='processingbar'>
        <div class='barwidth' :style="{width:progressingBar+'%'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/threejs/common.css'
import * as THREE from 'three/build/three.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'
// import {TransformControls} from 'three/examples/jsm/controls/TransformControls'
import { TransformControls } from '@/assets/threejs/TransformControls.js'
// import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
// import { OrientationControls } from './js/OrientationControls2.js'
import { OrientationControls } from '@/assets/threejs/OrientationControls2.js'

export default {
  name: 'ThreeDimensionalBuilder',
  data() {
    return {
      mobile: false,
      WORK_SPACE_SIZE: 200,
      CONTAIN_WIDTH: null,
      CONTAIN_HEIGHT: null,
      SHAPE_SIZE: 20,
      LIMIT_SIZE: 4,
      renderer: null,
      camera: null,
      cameraZoom: 1,
      scene: null,
      plane: null,
      objects: [],
      shapesObj: [], //所有的当前已放置的obj
      gridHelper: null,
      gradGroundMesh: null,
      mouseHelper: null,
      mouseHelperMaterial: null,
      focusedTransformObj: null,
      deleteObjFlag: null,
      gradGroundMesh1: null,
      composer: null,
      renderPass: null,
      outlinePass: null,
      effectFXAA: null,
      controls: null,
      transformControl: null,
      container: null,
      orientationContr: null,
      controlsMoved: false,
      shapesEventL: null,
      shapesMain: null,
      showMore: true,
      showZoomOption: false,
      showColorOption: false,
      isWhite: true,
      colorControl: true,
      selectedDragObj: null,
      selectedDragObjFlag: null,
      dragObj: null,
      dragedFlag: null,
      maxW: null,
      maxH: null,
      movedDir: null,
      shapesList: [],
      cartoonStlList: [],
      shapesListShow: true,
      cartoonStlShow: false,
      controlBar: false,
      redoActive: false,
      undoActive: false,
      stlGeoFlag: null, //0: get 1 stl
      showTextWindow: false,
      currentObj: null,
      textInput: '',
      textInput1: '',
      fontLoader: null,
      wordFont: null,
      wordColor: 0xdddddd,
      shootedFlag: false,
      currentObjMesh: null,
      currentObjMaterial: null,
      currentModule: 0,//编辑模式，各种基础模型
      // container监听事件
      transformDragFlag: false,
      twoPointTouchFlag: false,
      mouse: null,
      raycaster: null,
      isShiftDown: false,
      saveFlag: false,//是否保存
      activeSave: false,//是否激活保存样式
      saveNmaeWindow: false,//是否显示保存窗口
      notSaveNote: false,//是否显示未保存提示窗口
      goHomeFlag: false,//是否是点击返回按钮
      allOperation: [],//all the operated operation(undo)
      eachObjectInfo: {},//每一个对象的每一个步骤；
      eachRedoObjectInfo: {},//每一个对象的每一个步骤；
      redoOperation: [],//all the redo operation : false,
      selectedObjects: [],//当前加outline的对象
      statusTxt: null,
      controlType: null,//是否显示文案
      transformControlModeType: 1, //当前transformControl的 模式  0:scale  1:translate  2:rotate
      intersectsSelect: [], //焦点 交点
      intersection: {
        intersects: false,
        point: new THREE.Vector3(),
        normal: new THREE.Vector3()
      },
      tcScale: null,
      tcScaleYPosition: null,
      tcScaleY: null,
      tcScaleYPositionFlag: null,
      tcX: null,
      tcY: null,
      tcZ: null,
      showLoading: false,
      progressingBar: 0,
      inputCanConfirm: false

    }
  },
  methods: {
    init() {
      const _this = this
      _this.container = document.getElementById('container')
      _this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      _this.renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1)
      // _this.renderer.setSize( this.CONTAIN_WIDTH, this.CONTAIN_HEIGHT );
      _this.renderer.setSize(_this.CONTAIN_WIDTH, _this.CONTAIN_HEIGHT)
      _this.renderer.shadowMap.enabled = true
      _this.renderer.autoClear = false
      _this.renderer.setClearColor(0x000000, 0.0)
      _this.container.appendChild(_this.renderer.domElement)
      _this.camera = new THREE.PerspectiveCamera(45, _this.CONTAIN_WIDTH / _this.CONTAIN_HEIGHT, 1, 10000)
      // camera.position.set( 0, 200, 350 ); //正面
      _this.camera.position.set(170, 145, 255) //45°
      _this.camera.lookAt(0, 0, 0)
      window.camera = _this.camera
      _this.scene = new THREE.Scene()
      const geometry = new THREE.PlaneBufferGeometry(_this.WORK_SPACE_SIZE, _this.WORK_SPACE_SIZE)
      geometry.rotateX(-Math.PI / 2)
      _this.plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xe5e4df, visible: true }))
      _this.plane.name = 'plane'
      _this.plane.receiveShadow = true
      _this.plane.castShadow = true
      _this.scene.add(_this.plane)
      _this.objects.push(_this.plane)

      _this.raycaster = new THREE.Raycaster()
      _this.mouse = new THREE.Vector2()

      _this.grads()

      // lights
      var ambientLight = new THREE.AmbientLight(0x606060, 1) //0x606060
      _this.scene.add(ambientLight)
      var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.3)
      directionalLight.position.set(1, 0.75, 0.5).normalize()
      _this.scene.add(directionalLight)
      // lights end
      // _this.outline(); //objects outline
      _this.orbitCont()
      _this.transformCont()
      // _this.orientationCont()
      // _this.containerListenner();
      _this.animate()
      _this.onWindowResize()
    },
    grads() {
      // grid
      this.gridHelper = new THREE.GridHelper(this.WORK_SPACE_SIZE, 20, 0x999999, 0xc999999)
      // gridHelper = new THREE.GridHelper( 300, 6, 0x999999, 0xc999999 );
      this.gridHelper.name = 'GridHelper'
      this.scene.add(this.gridHelper)
      this.gradGroundMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(this.WORK_SPACE_SIZE, .8, this.WORK_SPACE_SIZE), new THREE.MeshLambertMaterial({ color: 0xffffff }))
      this.gradGroundMesh.position.y = -.8
      this.gradGroundMesh.name = 'GridHelper'
      this.gradGroundMesh.receiveShadow = true
      this.gradGroundMesh.castShadow = true
      this.scene.add(this.gradGroundMesh)
      this.gradGroundMesh1 = new THREE.Mesh(new THREE.BoxBufferGeometry(this.WORK_SPACE_SIZE, 3, this.WORK_SPACE_SIZE), new THREE.MeshLambertMaterial({ color: 0xffc869 }))
      this.gradGroundMesh1.position.y = -2.5
      this.gradGroundMesh1.name = 'GridHelper'
      this.gradGroundMesh1.receiveShadow = true
      this.gradGroundMesh1.castShadow = true
      this.scene.add(this.gradGroundMesh1)
      //grid end
    },
    outline() {
      // outline
      this.composer = new THREE.EffectComposer(this.renderer)
      var renderPass = new THREE.RenderPass(this.scene, this.camera)
      this.composer.addPass(renderPass)
      this.outlinePass = new THREE.OutlinePass(new THREE.Vector2(this.CONTAIN_WIDTH - 100, this.CONTAIN_HEIGHT), this.scene, this.camera)
      this.outlinePass.edgeStrength = 4//强度 默认3
      this.outlinePass.edgeThickness = 1
      this.outlinePass.visibleEdgeColor.set('#00ff00')// 边缘可见部分发光颜色
      this.outlinePass.hiddenEdgeColor.set('#00ff00')//边缘遮挡部分发光颜色
      this.outlinePass.edgeGlow = 1//发光颜色虚边
      // outlinePass.pulsePeriod= 3;//发光颜色闪烁频率

      this.composer.addPass(this.outlinePass)
      this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)
      this.effectFXAA.uniforms['resolution'].value.set(1 / this.CONTAIN_WIDTH, 1 / this.CONTAIN_HEIGHT)
      // outline end
    },
    orbitCont() {
      var _this = this
      // 旋转控制
      _this.controls = new OrbitControls(_this.camera, _this.renderer.domElement) // project controller
      _this.controls.minDistance = 10 //设置相机距离原点的最近距离 min distance of camera to coordinate origin
      _this.controls.maxDistance = 1300//设置相机距离原点的最远距离 max distance of camera to coordinate origin
      _this.controls.enableKeys = true
      _this.controls.rotateSpeed = .3
      _this.controls.keys = {
        LEFT: 65, //left arrow
        UP: 87, // up arrow
        RIGHT: 68, // right arrow
        BOTTOM: 83 // down arrow
      }
      _this.controls.enablePan = false//是否开启右键拖拽
      _this.controls.enableZoom = true//是否可以缩放
      // _this.controls.enabled = false;
      _this.controls.addEventListener('change', function() {
        _this.controlsMoved = true
        if (_this.objects.length > 1) {
          if (_this.camera.position.y < 0) { //当镜头在底板 底部后，隐藏
            _this.clearCache(_this.gridHelper)
            _this.scene.remove(_this.gridHelper)
            _this.clearCache(_this.gradGroundMesh)
            _this.scene.remove(_this.gradGroundMesh)
            _this.clearCache(_this.gradGroundMesh1)
            _this.scene.remove(_this.gradGroundMesh1)
          } else {
            _this.clearCache(_this.gridHelper)
            _this.scene.remove(_this.gridHelper)
            _this.clearCache(_this.gradGroundMesh)
            _this.scene.remove(_this.gradGroundMesh)
            _this.clearCache(_this.gradGroundMesh1)
            _this.scene.remove(_this.gradGroundMesh1)
            _this.scene.add(_this.gridHelper)
            _this.scene.add(_this.gradGroundMesh)
            _this.scene.add(_this.gradGroundMesh1)
          }
        } else {
          _this.clearCache(_this.gridHelper)
          _this.scene.remove(_this.gridHelper)
          _this.clearCache(_this.gradGroundMesh)
          _this.scene.remove(_this.gradGroundMesh)
          _this.clearCache(_this.gradGroundMesh1)
          _this.scene.remove(_this.gradGroundMesh1)
          _this.scene.add(_this.gridHelper)
          _this.scene.add(_this.gradGroundMesh)
          _this.scene.add(_this.gradGroundMesh1)
        }
      })
    },
    transformCont() {
      const _this = this
      //移动shape
      _this.transformControl = new TransformControls(this.camera, this.renderer.domElement)
      _this.transformControl.name = 'transformControl'
      _this.transformControl.size = 1.5
      _this.scene.add(_this.transformControl)
      _this.transformControl.addEventListener('dragging-changed', function(event) {
        if (_this.controls) {
          _this.controls.enabled = !event.value
          _this.transformDragFlag = !event.value
        }
      }, false)
      _this.transformControl.addEventListener('change', function() {
        if (_this.shootedFlag) {
          _this.shapesController(0)
        }
        _this.showCurrentColor()
        _this.onAnimationStep()
      }, false)
      _this.transformControl.addEventListener('mouseDown', function() {
        _this.transformControlMove = false
        _this.checkScalePosition(_this.transformControl.object)
      }, false)
      _this.transformControl.addEventListener('objectChange', function() {
        _this.transformControlMove = true
      }, false)
      _this.transformControl.addEventListener('mouseUp', function() {
        if (_this.transformControlMove) {
          _this.allOperationAdd()
        }
        _this.showCurrentColor()
        if (window.focusedTransformObj) {
          _this.transformControl.object = window.focusedTransformObj
        }
      }, false)
      //移动shape End
    },
    containerListenner() {
      this.showColorOption = false
      this.showZoomOption = false
      this.onDocumentMouseDown(event)
    },
    containerMouseDown() {
      var _this = this
      _this.controlsMoved = false
      _this.showColorOption = false
      _this.showZoomOption = false
      _this.controls.enabled = _this.transformDragFlag
      _this.twoPointTouchFlag = false
      _this.touchScale = ''
    },
    containerMouseMove() {
      // this.onDocumentMouseMove(event);
    },
    containerMouseUp() {
      if (this.transformControl.object) {
        window.focusedTransformObj = this.transformControl.object
      }
      if (!this.controlsMoved && !this.transformControlMove) {
        setTimeout(function() {
          this.onDocumentMouseDown(event)
        }, 100)
      }
      this.tcScaleYPosition = ''
      this.tcScaleYPositionFlag = ''
      this.tcScaleY = ''
      this.tcX = ''
      this.tcY = ''
      this.tcZ = ''
      this.transformControlMove = false
    },
    orientationCont() {
      const _this = this
      _this.orientationContr = new OrientationControls(50) //右上角三视图
      document.body.appendChild(_this.orientationContr.element)
      _this.orientationContr.element.addEventListener('click', function(e) {
        switch (e.target.id) {
          case 'front':
            _this.camera.position.set(0, 0, 300)
            break
          case 'back':
            _this.camera.position.set(0, 0, -300)
            break
          case 'top':
            _this.camera.position.set(0, 300, 0)
            break
          case 'bottom':
            _this.camera.position.set(0, -300, 0)
            break
          case 'left':
            _this.camera.position.set(-300, 0, 0)
            break
          case 'right':
            _this.camera.position.set(300, 0, 0)
            break
        }
        _this.camera.lookAt(_this.scene.position)
        _this.camera.updateProjectionMatrix()
      })

    },
    animate() {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
      // this.orientationContr.update(this.camera)
      // this.composer.render();
    },
    onWindowResize() {
      if (!this.showMore) {
        this.camera.aspect = (this.CONTAIN_WIDTH) / this.CONTAIN_HEIGHT
        this.renderer.setSize(this.CONTAIN_WIDTH, this.CONTAIN_HEIGHT)
        // this.composer.setSize( this.CONTAIN_WIDTH, this.CONTAIN_HEIGHT );
        // this.effectFXAA.uniforms['resolution'].value.set( 1 / this.CONTAIN_WIDTH, 1 / this.CONTAIN_HEIGHT );

      } else {
        this.camera.aspect = (this.CONTAIN_WIDTH - 100) / this.CONTAIN_HEIGHT
        this.renderer.setSize(this.CONTAIN_WIDTH - 100, this.CONTAIN_HEIGHT)
        // this.composer.setSize( this.CONTAIN_WIDTH - 100, this.CONTAIN_HEIGHT );
        // this.effectFXAA.uniforms['resolution'].value.set( 1 / ( this.CONTAIN_WIDTH - 100 ), 1 / this.CONTAIN_HEIGHT );
      }
      this.camera.updateProjectionMatrix()
    },
    clearCache(currentMesh) {
      currentMesh.geometry.dispose()
      currentMesh.material.dispose()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    listModule() {
      var url = '/mock/moduleList.json'
      this.$ajax.get(url)
        .then(this.listModuleSucc)
        .catch(function(res) {
          console.error( res)
        })
    },
    listModuleSucc(res) {
      if (res && res.data) {
        this.shapesList = res.data.data.shapes
        this.cartoonStlList = res.data.data.stl
        // this.dropOffListerner();
      }
    },
    showModule(type) {
      if (type == 0) {
        this.shapesListShow = true
        this.cartoonStlShow = false
      } else if (type == 1) {
        this.shapesListShow = false
        this.cartoonStlShow = true
      }
    },
    hideModule() {
      this.shapesListShow = false
      this.cartoonStlShow = false
    },
    showMoreFn() {
      if (this.showMore) {
        this.showMore = false
        $('.orientationControls').addClass('right_menu_hide')
      } else {
        this.showMore = true
        $('.orientationControls').removeClass('right_menu_hide')
      }
      this.onWindowResize()
    },
    dropOffListerner() {
      const _this = this
      _this.shapesMain.addEventListener('touchstart', function() {
        //隐藏子窗口
        _this.showColorOption = false
        _this.showColorOption = false
      })
      _this.shapesEventL.addEventListener('touchstart', function(e) {
        //隐藏子窗口
        _this.showColorOption = false
        _this.showColorOption = false
        _this.selectedDragObj = $(e.target)
        if (_this.selectedDragObj.hasClass('drag')) {
          $('.active_shape').removeClass('active_shape')
          if (_this.selectedDragObj.hasClass('name')) {
            _this.dragObj = $(_this.selectedDragObj).parents('.module').find('.sprint').clone()
            $(_this.selectedDragObj).parents('.module').addClass('active_shape')
            _this.selectedDragObjFlag = true
          } else if (_this.selectedDragObj.hasClass('sprint')) {
            _this.dragObj = _this.selectedDragObj.clone()
            $(_this.selectedDragObj).parents('.module').addClass('active_shape')
            _this.selectedDragObjFlag = true
          } else if (_this.selectedDragObj.hasClass('module')) {
            _this.dragObj = $(_this.selectedDragObj).find('.sprint').clone()
            $(_this.selectedDragObj).addClass('active_shape')
            _this.selectedDragObjFlag = false
          }
          _this.dragObj.addClass('startDrag')
          // _this.maxW = document.body.clientWidth - _this.selectedDragObj[0].offsetWidth;
          // _this.maxH = document.body.clientHeight - _this.selectedDragObj[0].offsetHeight;
          _this.maxW = $('.builder .main_wrapper').width() - _this.selectedDragObj[0].offsetWidth
          _this.maxH = $('.builder .main_wrapper').height() - _this.selectedDragObj[0].offsetHeight
        }
      }, false)
      _this.shapesEventL.addEventListener('touchmove', function(e) {
        _this.dragedFlag = true
        var ev = e || window.event
        var touch = ev.targetTouches[0]
        var windowWidth = window.innerWidth
        _this.movedDir = windowWidth - touch.clientX
        if (_this.dragObj && _this.movedDir > 100) {
          $('body').append(_this.dragObj)
          var oLeft = touch.clientX - 50
          var oTop = touch.clientY - 50
          if (oLeft < 0) {
            oLeft = 0
          } else if (oLeft >= _this.maxW) {
            oLeft = _this.maxW
          }
          if (oTop < 0) {
            oTop
          } else if (oTop >= _this.maxH) {
            oTop = _this.maxH
          }
          _this.dragObj[0].style.left = oLeft + 25 + 'px'
          _this.dragObj[0].style.top = oTop + 'px'
        }
      }, false)
      _this.shapesEventL.addEventListener('touchend', function(e) {
        if (_this.dragObj && _this.dragedFlag && _this.movedDir > 100) {
          // $( selectedDragObj ).parents( ".module" ).trigger( "click" );
          let code, type, url
          if (_this.selectedDragObjFlag) {
            code = Number($(_this.selectedDragObj).parents('.module').find('.this_code').val())
            type = Number($(_this.selectedDragObj).parents('.module').find('.this_module').val())
            url = Number($(_this.selectedDragObj).parents('.module').find('.this_url').val())
          } else if (_this.selectedDragObjFlag == false) {
            code = Number($(_this.selectedDragObj).find('.this_code').val())
            type = Number($(_this.selectedDragObj).find('.this_module').val())
            url = Number($(_this.selectedDragObj).find('.this_url').val())
          }
          if (type == 0) {
            _this.changeShapes(code)
          } else if (type == 1) {
            _this.loadSTL(code)
          } else if (type == 2) {
            _this.showInput(0)
          } else if (type == 3) {
            _this.loadLocalSTL(url)
          }
          $(_this.dragObj).remove()
          setTimeout(function() {
            _this.onDocumentMouseDown(e)
          }, 100)
        } else {
          $(_this.dragObj).remove()
        }
        _this.dragedFlag = false
        $('.active_shape').removeClass('active_shape')
      }, false)

      _this.shapesMain.addEventListener('mousedown', function() {
        //隐藏子窗口
        _this.showColorOption = false
        _this.showColorOption = false
      })
      _this.shapesEventL.addEventListener('mousedown', function(e) {
        //隐藏子窗口
        _this.showColorOption = false
        _this.showColorOption = false
        _this.selectedDragObj = $(e.target)
        if (_this.selectedDragObj.hasClass('drag')) {
          $('.active_shape').removeClass('active_shape')
          if (_this.selectedDragObj.hasClass('name')) {
            _this.dragObj = $(_this.selectedDragObj).parents('.module').find('.sprint').clone()
            $(_this.selectedDragObj).parents('.module').addClass('active_shape')
            _this.selectedDragObjFlag = true
          } else if (_this.selectedDragObj.hasClass('sprint')) {
            _this.dragObj = _this.selectedDragObj.clone()
            $(_this.selectedDragObj).parents('.module').addClass('active_shape')
            _this.selectedDragObjFlag = true
          } else if (_this.selectedDragObj.hasClass('module')) {
            _this.dragObj = $(_this.selectedDragObj).find('.sprint').clone()
            $(_this.selectedDragObj).addClass('active_shape')
            _this.selectedDragObjFlag = false
          }
          _this.dragObj.addClass('startDrag')
          // _this.maxW = document.body.clientWidth - _this.selectedDragObj[0].offsetWidth;
          // _this.maxH = document.body.clientHeight - _this.selectedDragObj[0].offsetHeight;
          _this.maxW = $('.builder .main_wrapper').width() - _this.selectedDragObj[0].offsetWidth
          _this.maxH = $('.builder .main_wrapper').height() - _this.selectedDragObj[0].offsetHeight
        }
      }, false)
      _this.shapesEventL.addEventListener('mousemove', function(e) {
        _this.dragedFlag = true
        var ev = e || window.event
        var touch = ev.targetTouches[0]
        var windowWidth = window.innerWidth
        _this.movedDir = windowWidth - touch.clientX
        if (_this.dragObj && _this.movedDir > 100) {
          $('body').append(_this.dragObj)
          var oLeft = touch.clientX - 50
          var oTop = touch.clientY - 50
          if (oLeft < 0) {
            oLeft = 0
          } else if (oLeft >= _this.maxW) {
            oLeft = _this.maxW
          }
          if (oTop < 0) {
            oTop
          } else if (oTop >= _this.maxH) {
            oTop = _this.maxH
          }
          _this.dragObj[0].style.left = oLeft + 25 + 'px'
          _this.dragObj[0].style.top = oTop + 'px'
        }
      }, false)
      _this.shapesEventL.addEventListener('mouseup', function(e) {
        if (_this.dragObj && _this.dragedFlag && _this.movedDir > 100) {
          // $( selectedDragObj ).parents( ".module" ).trigger( "click" );
          let code, type, url
          if (_this.selectedDragObjFlag) {
            code = Number($(_this.selectedDragObj).parents('.module').find('.this_code').val())
            type = Number($(_this.selectedDragObj).parents('.module').find('.this_module').val())
            url = Number($(_this.selectedDragObj).parents('.module').find('.this_url').val())
          } else if (_this.selectedDragObjFlag == false) {
            code = Number($(_this.selectedDragObj).find('.this_code').val())
            type = Number($(_this.selectedDragObj).find('.this_module').val())
            url = Number($(_this.selectedDragObj).find('.this_url').val())
          }
          if (type == 0) {
            _this.changeShapes(code)
          } else if (type == 1) {
            _this.loadSTL(code)
          } else if (type == 2) {
            _this.showInput(0)
          } else if (type == 3) {
            _this.loadLocalSTL(url)
          }
          $(_this.dragObj).remove()
          setTimeout(function() {
            _this.onDocumentMouseDown(e)
          }, 100)
        } else {
          $(_this.dragObj).remove()
        }
        _this.dragedFlag = false
        $('.active_shape').removeClass('active_shape')
      }, false)
    },
    dragImg(e) {
      const _this = this
      //隐藏子窗口
      _this.showColorOption = false
      _this.showColorOption = false
      _this.selectedDragObj = $(e.target)
      if (_this.selectedDragObj.hasClass('drag')) {
        $('.active_shape').removeClass('active_shape')
        if (_this.selectedDragObj.hasClass('name')) {
          _this.dragObj = $(_this.selectedDragObj).parents('.module').find('.sprint').clone()
          $(_this.selectedDragObj).parents('.module').addClass('active_shape')
          _this.selectedDragObjFlag = true
        } else if (_this.selectedDragObj.hasClass('sprint')) {
          _this.dragObj = _this.selectedDragObj.clone()
          $(_this.selectedDragObj).parents('.module').addClass('active_shape')
          _this.selectedDragObjFlag = true
        } else if (_this.selectedDragObj.hasClass('module')) {
          _this.dragObj = $(_this.selectedDragObj).find('.sprint').clone()
          $(_this.selectedDragObj).addClass('active_shape')
          _this.selectedDragObjFlag = false
        }
        _this.dragObj.addClass('startDrag')
        // _this.maxW = document.body.clientWidth - _this.selectedDragObj[0].offsetWidth;
        // _this.maxH = document.body.clientHeight - _this.selectedDragObj[0].offsetHeight;
        _this.maxW = $('.builder .main_wrapper').width() - _this.selectedDragObj[0].offsetWidth
        _this.maxH = $('.builder .main_wrapper').height() - _this.selectedDragObj[0].offsetHeight
      }
    },
    moveImg(e) {
      const _this = this
      _this.dragedFlag = true
      var ev = e || window.event
      var windowWidth = _this.CONTAIN_WIDTH
      _this.movedDir = windowWidth - (ev.clientX)
      if (_this.dragObj && _this.movedDir < 100) {
        $('body').append(_this.dragObj)
        var oLeft = ev.clientX - 50
        var oTop = ev.clientY - 50
        if (oLeft < 0) {
          oLeft = 0
        } else if (oLeft >= _this.maxW) {
          oLeft = _this.maxW
        }
        if (oTop < 0) {
          oTop
        } else if (oTop >= _this.maxH) {
          oTop = _this.maxH
        }
        _this.dragObj[0].style.left = oLeft + 25 + 'px'
        _this.dragObj[0].style.top = oTop + 'px'
      }
    },
    upImg(e) {
      const _this = this
      if (_this.dragObj && _this.dragedFlag && _this.movedDir > 100) {
        // $( selectedDragObj ).parents( ".module" ).trigger( "click" );
        let code, type, url
        if (_this.selectedDragObjFlag) {
          code = Number($(_this.selectedDragObj).parents('.module').find('.this_code').val())
          type = Number($(_this.selectedDragObj).parents('.module').find('.this_module').val())
          url = Number($(_this.selectedDragObj).parents('.module').find('.this_url').val())
        } else if (_this.selectedDragObjFlag == false) {
          code = Number($(_this.selectedDragObj).find('.this_code').val())
          type = Number($(_this.selectedDragObj).find('.this_module').val())
          url = Number($(_this.selectedDragObj).find('.this_url').val())
        }
        if (type == 0) {
          _this.changeShapes(code)
        } else if (type == 1) {
          _this.loadSTL(code)
        } else if (type == 2) {
          _this.showInput(0)
        } else if (type == 3) {
          _this.loadLocalSTL(url)
        }
        $(_this.dragObj).remove()
        setTimeout(function() {
          _this.onDocumentMouseDown(e)
        }, 100)
      } else {
        $(_this.dragObj).remove()
      }
      _this.dragedFlag = false
      $('.active_shape').removeClass('active_shape')
    },
    selectModule(type, code, index, module) {
      if (0 == type && 'text' == module) {
        type = 2
      } else if (0 == type && 'stl' == module) {
        type = 1
      }
      $('.active_shape').removeClass('active_shape')
      var obj
      if (0 == type) {
        obj = $('.normal_wrapper').find('.module:eq(' + index + ')')
        this.stlGeoFlag = 0
        this.changeShapes(code)
      } else if (1 == type) {
        obj = $('.cartoon_wrapper').find('.module:eq(' + index + ')')
        this.stlGeoFlag = 1
        this.loadSTL(code, obj)
      } else if (2 == type) {
        obj = $('.normal_wrapper').find('.module:eq(' + index + ')')
        this.stlGeoFlag = 1
        this.showInput(0)
      }
      obj.addClass('active_shape')

    },
    showChild(type) {
      if (type == 1) {
        this.showColorOption = true
      } else if (type == 0) {
        this.showZoomOption = true
      }
    },
    zoomView(zoomIndex) {
      if (this.cameraZoom) {
        this.cameraZoom = zoomIndex / 100
        this.camera.zoom = this.cameraZoom
        this.camera.lookAt(this.scene.position)
        this.camera.updateProjectionMatrix()
      }
    },
    changeShapes(geo) {
      this.stlGeoFlag = 0//0 geo; 1 stl
      // stopPropagationFn();
      this.showInput(1)
      this.currentModule = 0//编辑模式，各种基础模型
      // enabledLego( 1 );
      this.shootedFlag = false
      /*if(controls){
        controls.dispose();
      }*/
      switch (geo) {
        case 0:
          // 正方形
          this.currentObj = new THREE.BoxBufferGeometry(this.SHAPE_SIZE, this.SHAPE_SIZE, this.SHAPE_SIZE)
          break
        case 1:
          //圆柱
          this.currentObj = new THREE.CylinderBufferGeometry(this.SHAPE_SIZE / 2, this.SHAPE_SIZE / 2, this.SHAPE_SIZE, 32) //CylinderGeometry(radiusTop : 浮点类型, radiusBottom : 浮点类型, height : 浮点类型, radialSegments : 整数类型, heightSegments : 整数类型, openEnded : 布尔类型, thetaStart : 浮点类型, thetaLength : 浮点类型)
          break
        case 2:
          // 圆锥形
          this.currentObj = new THREE.ConeBufferGeometry(this.SHAPE_SIZE / 2, this.SHAPE_SIZE, 32) //ConeBufferGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
          break
        case 3:
          // 球形
          this.currentObj = new THREE.SphereBufferGeometry(this.SHAPE_SIZE / 2, 32, 32)//SphereBufferGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
          break
        case 4:
          // 环形
          this.currentObj = new THREE.TorusGeometry(10, 2.5, 16, 100)//TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
          break
        case 5:
          // 棱柱形prismatic
          this.currentObj = new THREE.CylinderBufferGeometry(this.SHAPE_SIZE / 2, this.SHAPE_SIZE / 2, this.SHAPE_SIZE, 5) //CylinderGeometry(radiusTop : 浮点类型, radiusBottom : 浮点类型, height : 浮点类型, radialSegments : 整数类型, heightSegments : 整数类型, openEnded : 布尔类型, thetaStart : 浮点类型, thetaLength : 浮点类型)
          break
        case 6:
          // 棱锥形Pyramid
          this.currentObj = new THREE.ConeBufferGeometry(this.SHAPE_SIZE / 2, this.SHAPE_SIZE, 4) //ConeBufferGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
          break
        case 7:
          // 空心圆柱Hollow cylinder
          var outerRadius = this.SHAPE_SIZE / 2
          var innerRadius = this.SHAPE_SIZE / 3
          var height = this.SHAPE_SIZE

          var arcShape = new THREE.Shape()
          arcShape.moveTo(outerRadius * 2, outerRadius)
          arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false)
          var holePath = new THREE.Path()
          holePath.moveTo(outerRadius + innerRadius, outerRadius)
          holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true)
          arcShape.holes.push(holePath)
          var geometry = new THREE.ExtrudeGeometry(arcShape, {
            amount: height,
            bevelEnabled: false,
            steps: 1,
            curveSegments: 60
          })
          geometry.center()
          geometry.rotateX(Math.PI * -.5)
          this.currentObj = geometry//TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
          break
        case 8:
          // 三棱柱
          this.currentObj = new THREE.CylinderBufferGeometry(this.SHAPE_SIZE / 2, this.SHAPE_SIZE / 2, this.SHAPE_SIZE, 3) //CylinderGeometry(radiusTop : 浮点类型, radiusBottom : 浮点类型, height : 浮点类型, radialSegments : 整数类型, heightSegments : 整数类型, openEnded : 布尔类型, thetaStart : 浮点类型, thetaLength : 浮点类型)
          break
        default:
          // 正方形
          this.currentObj = new THREE.BoxBufferGeometry(this.SHAPE_SIZE, this.SHAPE_SIZE, this.SHAPE_SIZE)
      }
      // changeMouseHelper( currentColorFlag );
      this.currentObjMesh = new THREE.Mesh(this.currentObj, this.currentObjMaterial)
    },
    showInput(type) {
      if (type === 0) {
        this.currentObj = null
        this.showTextWindow = true
      } else {
        this.showTextWindow = false
        this.inputCanConfirm = false
        this.textInput = ''
      }
    },
    textInputFn(e) {
      const obj = e.target
      this.textInput = $(obj).val()
      var textLength = $(obj).val().length
      if (textLength > 0) {
        this.inputCanConfirm = true
      } else {
        this.inputCanConfirm = false
      }
    },
    insertWord() {
      const _this = this
      _this.showLoading = true
      _this.showInput(1)
      this.fontLoader.load('/font/SimHei_Regular.json', function(font) {
          _this.wordFont = font
          _this.createText()
          _this.showLoading = false
        },
        // onProgress callback
        function(xhr) {
          // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
          _this.progressingBar = (xhr.loaded / xhr.total * 100)
        },
        // onError callback
        function(err) {
          console.error('An error happened :' + err)
        })
    },
    createText() {
      let word = this.textInput1
      const _this = this
      var xMid, text
      var message = word
      var fontSize
      switch (message.length) {
        case 3:
          fontSize = 50
          break
        case 4:
          fontSize = 45
          break
        case 5:
          fontSize = 40
          break
        case 6:
          fontSize = 35
          break
        case 7:
          fontSize = 30
          break
        default:
          fontSize = 20
      }
      var textGeo = new THREE.TextGeometry(message, {
        font: _this.wordFont,
        size: fontSize,
        height: 10, //文字厚度
        curveSegments: 22,
        bevelEnabled: false
      })
      textGeo.computeBoundingBox()
      textGeo.computeVertexNormals()
      var geometry = new THREE.BufferGeometry().fromGeometry(textGeo)
      geometry.computeBoundingBox()

      xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x) //位置，使其居中
      geometry.translate(xMid, -25, 0)
      geometry.rotateX(-(Math.PI / 2)) //文字为横卧在工作台上
      // make shape ( N.B. edge view not visible )
      var matLite = new THREE.MeshPhongMaterial({ color: _this.wordColor, flatShading: true })
      text = new THREE.Mesh(geometry, matLite)
      text.name = 'shapes'
      text.receiveShadow = true
      text.castShadow = true
      _this.scene.add(text)
      _this.objects.push(text)
      _this.shapesObj.push(text) //全删除使用
      this.undoActive = true
      _this.activeSave = true
      _this.transformControl.object = text
      _this.focusedTransformObj = _this.transformControl.object
      _this.cleanSelectedObject(text)
      _this.createObjForOperation(text, 'add')
      _this.eachObjSetps(text, 0)
      _this.shapesController()
      _this.transformControl.attach(_this.focusedTransformObj)
      _this.resetSomeThing()
    },
    async loadSTL(thisSTL, obj) {
      const _this = this
      _this.showInput(1)
      $('.active_shape').removeClass('active_shape')
      $(obj).addClass('active_shape')
      _this.currentModule = 0 //编辑模式，各种基础模型
      // enabledLego( 1 );
      _this.showLoading = true
      _this.shootedFlag = false
      var file
      switch (thisSTL) {
        case 0:
          file = '/models/stl/ascii/standing.stl'
          break
        case 1:
          file = '/models/stl/ascii/climbing.stl'
          break
        case 2:
          file = '/models/stl/ascii/lying.stl'
          break
        case 3:
          file = '/models/stl/ascii/sitting.stl'
          break
        case 4:
          file = '/models/stl/ascii/tyrannosaurusRex.stl'
          break
        case 5:
          file = '/models/stl/ascii/pokemon/bulbasaur_starter_1gen_flowalistik.stl'
          break
        case 6:
          file = '/models/stl/ascii/pokemon/charmander_starter_1gen_flowalistik.stl'
          break
        case 7:
          file = '/models/stl/ascii/pokemon/chikorita_starter_2gen_flowalistik.stl'
          break
        case 8:
          file = '/models/stl/ascii/pokemon/pikachu_1gen_flowalistik.stl'
          break
        case 9:
          file = '/models/stl/ascii/pokemon/squirtle_starter_1gen_flowalistik.stl'
          break
        case 10:
          file = '/models/stl/ascii/pokemon/totodile_starter_2gen_flowalistik.stl'
          break
        case 11:
          file = '/models/stl/ascii/five-point-star.stl'
          break
        default:
          file = '/models/stl/ascii/tyrannosaurusRex.stl'
      }
      var loader = new STLLoader()
      await loader.load(file, function(geometry) {
          _this.currentObj = geometry
          _this.showLoading = false
        },
        function(xhr) {
          _this.progressingBar = (xhr.loaded / xhr.total * 100)
          // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        })
    },
    onDocumentMouseDown() {
      if (!this.shootedFlag) {
        event.preventDefault()
        var controlBoardWidth = !this.showMore //left decal side width
        var touch = null
        if (controlBoardWidth) {
          if (event.type == 'touchend') {
            touch = event.changedTouches[0]
            this.mouse.set((touch.clientX / this.CONTAIN_WIDTH) * 2 - 1, -(touch.clientY / this.CONTAIN_HEIGHT) * 2 + 1)
          } else {
            this.mouse.set((event.clientX / this.CONTAIN_WIDTH) * 2 - 1, -(event.clientY / this.CONTAIN_HEIGHT) * 2 + 1)
          }
        } else {
          if (event.type == 'touchend') {
            touch = event.changedTouches[0]
            this.mouse.set((touch.clientX / (this.CONTAIN_WIDTH - 100)) * 2 - 1, -(touch.clientY / this.CONTAIN_HEIGHT) * 2 + 1)
          } else {
            this.mouse.set((event.clientX / (this.CONTAIN_WIDTH - 100)) * 2 - 1, -(event.clientY / this.CONTAIN_HEIGHT) * 2 + 1)
          }
        }

        this.raycaster.setFromCamera(this.mouse, this.camera)

        // var intersects = this.raycaster.intersectObjects( this.objects ,true );
        var intersects = this.raycaster.intersectObjects(this.objects)

        if (intersects.length > 0) {

          var intersect = intersects[0]

          // delete cube

          if (this.isShiftDown) {

            if (intersect.object !== this.plane) {

              this.scene.remove(intersect.object)

              this.objects.splice(this.objects.indexOf(intersect.object), 1)

            }

            // create cube

          } else {
            // if (this.objects.length < 11 && this.currentObj) {
            if (this.currentObj) {
              var voxelMaterial = this.currentObjMaterial.clone()
              var voxel = new THREE.Mesh(this.currentObj, voxelMaterial)
              voxel.position.copy(intersect.point).add(intersect.face.normal)
              // voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar(25 );
              if (this.stlGeoFlag == 0) {//0 geo; 1 stl 2, localStl
                voxel.position.divideScalar(this.SHAPE_SIZE).floor().multiplyScalar(this.SHAPE_SIZE).addScalar(this.SHAPE_SIZE / 2)
                voxel.name = 'shapes'
              } else if (this.stlGeoFlag == 1) {
                voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
                voxel.name = 'stl'
              } else if (this.stlGeoFlag == 2) {
                voxel.position.divideScalar(50).floor().multiplyScalar(50)
                voxel.name = 'stlLocal'
                voxel.rotation.set(-Math.PI / 2, 0, 0)
              }
              voxel.receiveShadow = true
              voxel.castShadow = true
              this.scene.add(voxel)
              this.objects.push(voxel)
              this.shapesObj.push(voxel) //全删除使用
              this.undoActive = true
              this.activeSave = true
              this.createObjForOperation(voxel, 'add')
              this.eachObjSetps(voxel, 0)
              this.shapesController()
              this.transformControl.object = voxel
              this.transformControl.attach(this.transformControl.object)
              this.cleanSelectedObject(voxel)
              this.showCurrentColor()
              this.resetSomeThing()
            }
          }
          this.shootedFlag = true
          this.render()

        }
      } else {
        this.checkIntersection(event)
      }
    },
    onDocumentMouseMove() {
      event.preventDefault()
      this.mouse.set((event.clientX / this.CONTAIN_WIDTH) * 2 - 1, -(event.clientY / this.CONTAIN_HEIGHT) * 2 + 1)
      this.raycaster.setFromCamera(this.mouse, this.camera)
      var intersects = this.raycaster.intersectObjects(this.objects)
      if (intersects.length > 0) {
        var intersect = intersects[0]
        this.mouseHelper.position.copy(intersect.point).add(intersect.face.normal)
        this.mouseHelper.position.divideScalar(this.SHAPE_SIZE).floor().multiplyScalar(this.SHAPE_SIZE).addScalar(this.SHAPE_SIZE / 2)
      }
      this.render()
    },
    createObjForOperation(meshObj, type) {
      window.deleteObjFlag = false
      this.saveFlag = false
      if (this.allOperation.length >= 5) {
        this.allOperation.shift()
      }
      var obj = {}
      obj['uuid'] = meshObj.uuid
      obj['position'] = meshObj.position.clone()
      obj['rotation'] = meshObj.rotation.clone()
      obj['quaternion'] = meshObj.quaternion.clone()
      obj['scale'] = meshObj.scale.clone()
      obj['color'] = meshObj.material.color.clone()
      obj['operation'] = type
      obj['mesh'] = meshObj
      this.allOperation.push(obj)
    },
    eachObjSetps(e, type) {//生成json 键的行为对象; e:mesh object  type 0: undo 1: redo
      var obj = {}
      var arr
      if (type === 0) {
        if (!this.eachObjectInfo[e.uuid]) {
          this.eachObjectInfo[e.uuid] = []
        }
        obj['uuid'] = e.uuid
        obj['position'] = e.position.clone()
        obj['rotation'] = e.rotation.clone()
        obj['quaternion'] = e.quaternion.clone()
        obj['scale'] = e.scale.clone()
        obj['color'] = e.material.color.clone()
        obj['mesh'] = e
        obj['time'] = Date.parse(new Date())
        if (this.eachObjectInfo[e.uuid].length) {
          obj['index'] = this.eachObjectInfo[e.uuid].length
        } else {
          obj['index'] = 0
        }
        arr = this.eachObjectInfo[e.uuid]
        arr.push(obj)
      } else if (type === 2) {
        if (!this.eachObjectInfo[e.uuid]) {
          this.eachObjectInfo[e.uuid] = []
        }
        obj['uuid'] = e.uuid
        obj['position'] = e.position.clone()
        obj['rotation'] = e.rotation.clone()
        obj['quaternion'] = e.quaternion.clone()
        obj['scale'] = e.scale.clone()
        obj['color'] = e.color.clone()
        obj['mesh'] = e.mesh
        obj['time'] = Date.parse(new Date())
        if (this.eachObjectInfo[e.uuid].length) {
          obj['index'] = this.eachObjectInfo[e.uuid].length
        } else {
          obj['index'] = 0
        }
        arr = this.eachObjectInfo[e.uuid]
        arr.push(obj)
      } else if (type === 1) {
        if (!this.eachRedoObjectInfo[e.uuid]) {
          this.eachRedoObjectInfo[e.uuid] = []
        }
        obj['uuid'] = e.uuid
        obj['position'] = e.position.clone()
        obj['rotation'] = e.rotation.clone()
        obj['quaternion'] = e.quaternion.clone()
        obj['scale'] = e.scale.clone()
        obj['color'] = e.color.clone()
        obj['mesh'] = e.mesh
        obj['time'] = Date.parse(new Date())
        arr = this.eachRedoObjectInfo[e.uuid]
        arr.push(obj)
      }
    },
    shapesController() {//type 0: normal
      if (this.showMore) {
        $('.obj_control').css({ width: this.CONTAIN_WIDTH - 100 })
      }
      this.controlBar = true
    },
    addSelectedObject(object) {
      this.selectedObjects = []
      this.selectedObjects.push(object)
    },
    cleanSelectedObject(obj) {
      if (obj) {
        this.addSelectedObject(obj)
        // this.outlinePass.selectedObjects = this.selectedObjects;
      }
    },
    showCurrentColor() {
      this.isWhite = false
      if (this.transformControl.object) {
        var thisColor = this.transformControl.object.material.color.toJSON()
        if (thisColor == '14540253') {
          this.isWhite = true
        } else {
          this.isWhite = false
        }
        this.cleanSelectedObject(this.transformControl.object)
        switch (this.transformControlModeType) {
          case 0:
            this.statusTxt = this.textSC
            break
          case 1:
            this.statusTxt = this.textTR
            break
          case 2:
            this.statusTxt = this.textRO
            break
        }
        this.controlType = true
      } else {
        this.controlType = false
      }
    },
    resetSomeThing() {
      $('.active_shape').removeClass('active_shape')
      this.currentObjMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd })
    },
    checkIntersection(event) {
      var x, y
      if (event.changedTouches) {
        x = event.changedTouches[0].pageX
        y = event.changedTouches[0].pageY
      } else {
        x = event.clientX
        y = event.clientY
      }
      this.mouse.x = (x / this.CONTAIN_WIDTH) * 2 - 1
      this.mouse.y = -(y / this.CONTAIN_HEIGHT) * 2 + 1

      var controlBoardWidth = this.showMore //left decal side width
      if (controlBoardWidth) {
        this.mouse.x = (x / (this.CONTAIN_WIDTH - 100)) * 2 - 1
        this.mouse.y = -(y / this.CONTAIN_HEIGHT) * 2 + 1
      }
      if (!this.plane) return
      this.raycaster.setFromCamera(this.mouse, this.camera)
      this.raycaster.intersectObject(this.plane, false, this.intersectsSelect)
      var sceneChilds
      if (this.intersectsSelect.length > 0) {
        var p = this.intersectsSelect[0].point
        // mouseHelper.position.set( 0, 0, 0 );
        // mouseHelper.position.copy( p );  //copy intersection position to mouseHelper
        this.intersection.point.copy(p)
        /*1.克隆旧的法线 2.旧法线乘以模型的世界矩阵得到归一化后的法线 3.和一个标量相乘，放大10倍。 4.加上点击点的坐标，进行平移。*/
        var n = this.intersectsSelect[0].face.normal.clone()
        n.transformDirection(this.plane.matrixWorld)
        n.multiplyScalar(10)
        n.add(this.intersectsSelect[0].point)

        this.intersection.normal.copy(this.intersectsSelect[0].face.normal)
        // mouseHelper.lookAt( n );

        sceneChilds = this.raycaster.intersectObjects(this.scene.children) //get all objects in the current position of your mouse;
        if (sceneChilds.length > 1) {
          if (sceneChilds && (sceneChilds[0].object.name == 'shapes' || sceneChilds[0].object.name == 'stl' || sceneChilds[0].object.name == 'stlLocal')) {
            this.transformControl.detach(this.transformControl.object)
            this.transformControl.attach(sceneChilds[0].object)
          } else if (sceneChilds[0].object.name == 'plane') {
            this.transformControl.detach()
            this.transformControl.attach(sceneChilds[0].object)
          }
          this.colorControl = true
        }
        this.intersection.intersects = true
        this.intersectsSelect.length = 0

      } else {
        this.intersection.intersects = false

        sceneChilds = this.raycaster.intersectObjects(this.scene.children) //get all objects in the current position of your mouse;
        if (sceneChilds.length > 0) {
          if (sceneChilds && (sceneChilds[0].object.name == 'shapes' || sceneChilds[0].object.name == 'stl' || sceneChilds[0].object.name == 'stlLocal')) {
            this.transformControl.detach(this.transformControl.object)
            this.transformControl.attach(sceneChilds[0].object)
          } else if (sceneChilds[0].object.name == 'plane') {
            this.transformControl.detach(this.transformControl.object)
            this.transformControl.attach(sceneChilds[0].object)
          }
        }
      }
      this.render()
    },
    hideSelf() {
      /*this.$parent.showThreeD();*/
      $('.orientationControls').remove()
      this.$router.push({ path: '/projects', query: { jump: 'MagicBox-AppforChildren' } })
    },
    allOperationAdd() {
      if (window.focusedTransformObj) {
        this.createObjForOperation(this.transformControl.object, 'transform')
        this.eachObjSetps(this.transformControl.object, 0)
      }
      if (this.allOperation.length > 0) {
        this.undoActive = true
      } else {
        this.undoActive = false
      }
    },
    checkScalePosition(obj) {
      // 检测是否有放大缩小，如果有，需要检测移动时的范围
      this.tcScale = obj.scale.clone()
      this.tcScaleYPosition = obj.position.clone().y
      this.tcScaleY = obj.scale.clone().y
      if (obj.name == 'shapes') {
        if (this.tcScaleYPosition == ((this.SHAPE_SIZE * obj.scale.y) / 2)) {
          this.tcScaleYPositionFlag = true
        } else {
          this.tcScaleYPositionFlag = false
        }
      } else if (obj.name == 'stl') {
        if (this.tcScaleYPosition == (obj.geometry.boundingSphere.radius)) {
          this.tcScaleYPositionFlag = true
        } else {
          this.tcScaleYPositionFlag = false
        }
      }
    },
    onAnimationStep() { //检测scale，使其永远在0.1- LIMIT_SIZE 之间
      if (this.transformControl.object) {
        var saveDefauleSHAPE_SIZE = this.SHAPE_SIZE
        var saveDefauleLIMIT_SIZE = this.LIMIT_SIZE
        var saveDefauleLIMIT_SIZEMin = 0.1
        var getMode = this.transformControl.getMode()
        var currentObj = this.transformControl.object
        /*if(currentObj.name == "shapes"){

        }else if(currentObj.name == "stl"){
          if(currentObj.geometry.boundingSphere) {
            SHAPE_SIZE = ( currentObj.geometry.boundingSphere.radius ) * 2
          }
        }*/
        switch (getMode) {
          case 'scale':
            if (currentObj.name == 'stl') {
              this.LIMIT_SIZE = 2.22
              // saveDefauleLIMIT_SIZEMin = 0.056
            }
            currentObj.scale.clampScalar(saveDefauleLIMIT_SIZEMin, this.LIMIT_SIZE)
            this.checkAxis('scale', currentObj)
            break
          case 'translate':
            // console.log( transformControl.axis, currentObj.position );
            if (this.transformControl.axis == 'X') {
              if (currentObj.position.x >= 0 && currentObj.position.x + ((this.SHAPE_SIZE * currentObj.scale.x) / 2) >= (this.WORK_SPACE_SIZE / 2)) {
                currentObj.position.x = (this.WORK_SPACE_SIZE / 2) - ((this.SHAPE_SIZE * currentObj.scale.x) / 2)
              } else if (currentObj.position.x < 0 && currentObj.position.x - ((this.SHAPE_SIZE * currentObj.scale.x) / 2) <= -(this.WORK_SPACE_SIZE / 2)) {
                currentObj.position.x = -(this.WORK_SPACE_SIZE / 2) + ((this.SHAPE_SIZE * currentObj.scale.x) / 2)
              }
            } else if (this.transformControl.axis == 'Z') {
              if (currentObj.position.z >= 0 && currentObj.position.z + ((this.SHAPE_SIZE * currentObj.scale.z) / 2) >= (this.WORK_SPACE_SIZE / 2)) {
                currentObj.position.z = (this.WORK_SPACE_SIZE / 2) - ((this.SHAPE_SIZE * currentObj.scale.z) / 2)
              } else if (currentObj.position.z < 0 && currentObj.position.z - ((this.SHAPE_SIZE * currentObj.scale.z) / 2) <= -(this.WORK_SPACE_SIZE / 2)) {
                currentObj.position.z = -(this.WORK_SPACE_SIZE / 2) + ((this.SHAPE_SIZE * currentObj.scale.z) / 2)
              }
            } else if (this.transformControl.axis == 'Y') {
              if (currentObj.position.y >= 0 && (currentObj.position.y + ((this.SHAPE_SIZE * currentObj.scale.y) / 2)) >= (this.WORK_SPACE_SIZE)) { //向上移
                currentObj.position.y = (this.WORK_SPACE_SIZE) - ((this.SHAPE_SIZE * currentObj.scale.y) / 2)
              } else if (currentObj.name == 'stl') {
                if (currentObj.position.y < (currentObj.geometry.boundingSphere.radius * currentObj.scale.y)) {
                  currentObj.position.y = (this.SHAPE_SIZE * currentObj.scale.y)
                }
              } else if (currentObj.name == 'stlLocal') {
                if (currentObj.position.y < 0) {
                  currentObj.position.y = 0
                }
              } else if (currentObj.position.y < (this.SHAPE_SIZE * currentObj.scale.y) / 2) {
                currentObj.position.y = (this.SHAPE_SIZE * currentObj.scale.y) / 2
              }
            }
            break
          case 'rotate':
            break
        }
        this.SHAPE_SIZE = saveDefauleSHAPE_SIZE
        this.LIMIT_SIZE = saveDefauleLIMIT_SIZE
      }
    },
    checkAxis(type, obj) { // 改变大小的时候，价差坐标，不能超出工作台
      if (type === 'scale') {
        if (obj.position.x >= 0 && obj.position.x + ((this.SHAPE_SIZE * obj.scale.x) / 2) >= (this.WORK_SPACE_SIZE / 2)) {
          obj.position.x = (this.WORK_SPACE_SIZE / 2) - ((this.SHAPE_SIZE * obj.scale.x) / 2)
        } else if (obj.position.x < 0 && obj.position.x - ((this.SHAPE_SIZE * obj.scale.x) / 2) <= -(this.WORK_SPACE_SIZE / 2)) {
          obj.position.x = -(this.WORK_SPACE_SIZE / 2) + ((this.SHAPE_SIZE * obj.scale.x) / 2)
        }
        if (obj.position.z >= 0 && obj.position.z + ((this.SHAPE_SIZE * obj.scale.z) / 2) >= (this.WORK_SPACE_SIZE / 2)) {
          obj.position.z = (this.WORK_SPACE_SIZE / 2) - ((this.SHAPE_SIZE * obj.scale.z) / 2)
        } else if (obj.position.z < 0 && obj.position.z - ((this.SHAPE_SIZE * obj.scale.z) / 2) <= -(this.WORK_SPACE_SIZE / 2)) {
          obj.position.z = -(this.WORK_SPACE_SIZE / 2) + ((this.SHAPE_SIZE * obj.scale.z) / 2)
        }
        if (obj.position.y >= 0 && obj.position.y <= ((this.SHAPE_SIZE * obj.scale.y) / 2)) {
          obj.position.y = (this.SHAPE_SIZE * obj.scale.y) / 2
        } else if (obj.position.y >= 0 && this.tcScaleYPositionFlag) {
          if (obj.name == 'stl') {
            // console.log("stl",tcScaleYPosition,((obj.geometry.boundingSphere.radius* obj.scale.y )/2));
            if (obj.geometry.boundingSphere) {
              if (this.tcScaleYPosition == ((obj.geometry.boundingSphere.radius * obj.scale.y) / 2)) {
                obj.position.y = obj.geometry.boundingSphere.radius * obj.scale.y
              } else {
                obj.position.y = (this.SHAPE_SIZE * obj.scale.y) / 2
              }
            }
          } else {
            obj.position.y = (this.SHAPE_SIZE * obj.scale.y) / 2
          }
        } else if (obj.position.y < 0) {
          obj.position.y = (this.SHAPE_SIZE * obj.scale.y) / 2
        }
      } else if (type === 'rotate') {
        console.log('check for retate')
      }
    },
    changeControls(type) {
      if (window.deleteObjFlag) {
        return
      }
      this.showColorOption = false
      this.showZoomOption = false//隐藏子窗口
      let obj = event.target
      if (!$(obj).hasClass('control_btn')) {
        obj = $(obj).closest('.control_btn')
      }
      if (this.transformControlModeType == 0 && type == 0) {
        obj.toggleClass('active_control')
      } else if (this.transformControlModeType == 1 && type == 1) {
        obj.toggleClass('active_control')
      } else if (this.transformControlModeType == 2 && type == 2) {
        obj.toggleClass('active_control')
      } else if (this.transformControlModeType == 3 && type == 3) {
        obj.toggleClass('active_control')
      } else {
        $('.active_control').removeClass('active_control')
        obj.addClass('active_control')
      }
      if (!obj.hasClass('active_control')) {
        this.transformControl.detach(this.transformControl.object) //隐藏控制控件
        // this.outlinePass.selectedObjects = [];
      } else {
        this.transformControl.attach(this.transformControl.object) //隐藏控制控件
      }
      switch (type) {
        case 0:
          this.transformControl.setMode('scale')
          this.statusTxt = this.textSC
          this.transformControlModeType = 0
          break
        case 1:
          this.transformControl.setMode('translate')
          this.statusTxt = this.textTR
          this.transformControlModeType = 1
          break
        case 2:
          this.transformControl.setMode('rotate')
          this.statusTxt = this.textRO
          this.transformControlModeType = 2
          break
        default:
          this.transformControl.setMode('translate')
          this.statusTxt = this.textTR
          this.transformControlModeType = 1
      }
      this.transformControl.object ? this.colorControl = true : this.colorControl = false

    },
    deletedSelected() {
      this.showColorOption = false
      this.showZoomOption = false//隐藏子窗口
      if (window.focusedTransformObj && this.transformControl.object) {
        this.createObjForOperation(this.transformControl.object, 'delete')
        this.eachObjSetps(this.transformControl.object, 0)
        this.scene.remove(this.transformControl.object)
        this.objects.splice(this.objects.indexOf(this.transformControl.object), 1)
        $('.active_control').removeClass('active_control')
        this.colorControl = false
        window.deleteObjFlag = true
      }
      this.transformControl.detach()
      // $(".active_control").removeClass("active_control");
      this.shapesController(0)
      this.render()
      if (this.objects.length > 1) {
        this.activeSave = true
      } else {
        this.activeSave = false
        this.controlBar = false
      }

    },
    changeCurrentColor(type) {
      this.isWhite = false
      if (this.transformControl.object) {
        if (type == 0) {
          this.transformControl.object.material.color.set('#dddddd')
          this.isWhite = true
        } else {
          this.transformControl.object.material.color.set('#f2f545')
          this.isWhite = false
        }
        this.createObjForOperation(this.transformControl.object, 'transform')
        this.eachObjSetps(this.transformControl.object, 0)
      }
    },
    redoUndo(type) { //type 0: undo 1: redo
      this.showColorOption = false
      this.showZoomOption = false//隐藏子窗口
      var transformFlag = false
      var deleteFlag = false
      var addFlag = false
      if (type === 0) {
        if (this.allOperation.length > 0) {
          var operationL = this.allOperation[this.allOperation.length - 1]//最后一个last
          this.redoOperation.push(operationL) //add the undo to redo
          if (operationL.operation === 'transform') {
            transformFlag = true
          } else if (operationL.operation === 'delete') {
            deleteFlag = true
          } else if (operationL.operation === 'add') {
            addFlag = true
          }
          if (addFlag) {
            if (operationL.mesh) {
              this.eachObjSetps(operationL, 1)
              this.scene.remove(operationL.mesh)
              this.objects.splice(this.objects.indexOf(operationL.mesh), 1)
            }
          } else if (deleteFlag) {
            if (operationL.mesh) {
              this.eachObjSetps(operationL, 1)
              this.scene.add(operationL.mesh)
              this.objects.push(operationL.mesh)
            }
          } else if (transformFlag) {
            var thisObj = this.eachObjectInfo[operationL.uuid] //寻找对应对象步骤
            if (thisObj) {
              if (thisObj.length > 1) {
                this.redoProcess(thisObj[thisObj.length - 2])
              } else {
                this.redoProcess(thisObj[thisObj.length - 1])
              }
              this.eachObjSetps(this.eachObjectInfo[operationL.uuid].pop(), 1)
            }
          }
          this.allOperation.pop()
        }

      } else if (type === 1) {
        if (this.redoOperation.length > 0) {
          var redoOperationL = this.redoOperation[this.redoOperation.length - 1]//最后一个last
          this.allOperation.push(redoOperationL) //add the undo to redo
          if (redoOperationL.operation === 'transform') {
            transformFlag = true
          } else if (redoOperationL.operation === 'delete') {
            deleteFlag = true
          } else if (redoOperationL.operation === 'add') {
            addFlag = true
          }
          if (addFlag) {
            if (redoOperationL.mesh) {
              this.eachObjSetps(redoOperationL, 2)
              this.scene.add(redoOperationL.mesh)
              this.objects.push(redoOperationL.mesh)
            }
          } else if (deleteFlag) {
            if (redoOperationL.mesh) {
              this.eachObjSetps(redoOperationL, 2)
              this.scene.remove(redoOperationL.mesh)
              this.objects.splice(this.objects.indexOf(redoOperationL.mesh), 1)

            }
          } else if (transformFlag) {
            var thisObj1 = this.eachRedoObjectInfo[redoOperationL.uuid] //寻找对应对象步骤
            if (thisObj1) {
              if (thisObj1.length > 1) {
                this.redoProcess(thisObj1[thisObj1.length - 2])
              } else {
                this.redoProcess(thisObj1[thisObj1.length - 1])
              }
              this.eachObjSetps(this.eachRedoObjectInfo[redoOperationL.uuid].pop(), 2)
            }
          }
          this.redoOperation.pop()
        }
      }
      this.transformControl.detach() //隐藏控制控件
      // this.outlinePass.selectedObjects = [];
      this.colorControl = false
      this.render()
      if (this.allOperation.length > 0) {
        this.undoActive = true
      } else {
        this.undoActive = false
      }
      if (this.redoOperation.length > 0) {
        this.redoActive = true
      } else {
        this.redoActive = false
      }
      if (this.objects.length > 1) {
        this.activeSave = true
      } else {
        this.activeSave = false
      }

    },
    redoProcess(operator) {
      operator.mesh.position.copy(operator.position)
      operator.mesh.rotation._x = operator.rotation._x
      operator.mesh.rotation._y = operator.rotation._y
      operator.mesh.rotation._z = operator.rotation._z
      operator.mesh.quaternion._x = operator.quaternion._x
      operator.mesh.quaternion._y = operator.quaternion._y
      operator.mesh.quaternion._z = operator.quaternion._z
      operator.mesh.scale.set(operator.scale.x, operator.scale.y, operator.scale.z)
      operator.mesh.material.color.set(operator.color)
    },
    saveModuleShow(type) {
      if (this.objects.length > 1) {
        if (type == 0) {
          this.saveNmaeWindow = true
        } else {
          this.saveNmaeWindow = false
        }
      } else {
        this.saveNmaeWindow = false
      }
    },
    getTimeStr() {
      var date = new Date()
      var Y = date.getFullYear()
      var M = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)
      var D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
      var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      var m = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      var s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      var dateStr = Y + M + D + h + m + s
      return dateStr
    },
    exportMoudle(type) { //type 0: ASCII 1: GLTF
      if (this.objects.length > 1) {
        this.scene.remove(this.transformControl)
        this.clearCache(this.gridHelper)
        this.scene.remove(this.gridHelper)
        this.clearCache(this.gradGroundMesh)
        this.scene.remove(this.gradGroundMesh)
        this.clearCache(this.gradGroundMesh1)
        this.scene.remove(this.gradGroundMesh1)
        this.clearCache(this.plane)
        this.scene.remove(this.plane)
        // this.outlinePass.selectedObjects = [];
        this.camera.position.set(170, 145, 255) //45°
        this.camera.lookAt(0, 0, 0)
        //threejs Y-up, 别的事Z-up,所以到处之前要旋转
        this.scene.rotation.set(Math.PI / 2, 0, 0)
        this.scene.updateMatrixWorld()
        //end
        var nameStr = $('#save_name').val()
        // var successFlag;
        if (nameStr) {
          this.saveFlag = true
          if (type === 0) {
            var exporter = new STLExporter() //导出工具  exporter tool
            var result = exporter.parse(this.scene)
            this.saveString(result, nameStr + '.stl')
          } else {
            var input = this.scene
            var gltfExporter = new THREE.GLTFExporter()
            var options = {
              trs: false,
              onlyVisible: true,
              truncateDrawRange: true,
              binary: false,
              forcePowerOfTwoTextures: false,
              maxTextureSize: 4096
            }
            gltfExporter.parse(input, function(result) {
              var output = JSON.stringify(result, null, 2)
              this.saveString(output, nameStr + '.gltf')
            }, options)
          }
        }
        /*
                            if (successFlag) {
                                this.saveAsImage(nameStr + '.png' );
                                // 保存成功，清空当前项目 end
                            } else {
                                $( ".save_name_verify" ).text( "保存失败，请重试" ).show();
                                setTimeout( function () {
                                    $( ".save_name_verify" ).text( "请输入模型名称" ).hide();
                                }, 1500 );
                            }*/
        this.scene.add(this.transformControl)
        this.scene.add(this.gridHelper)
        this.scene.add(this.gradGroundMesh)
        this.scene.add(this.gradGroundMesh1)
        this.scene.add(this.plane)
        //threejs Y-up, 别的事Z-up,所以到处之前要旋转
        this.scene.rotation.set(0, 0, 0)
        this.scene.updateMatrixWorld()
        //end
      }
    },
    saveString(text, filename) {
      this.save(new Blob([text], { type: 'text/plain' }), filename)
    },
    save(blob, filename) {
      var link = document.createElement('a')
      link.style.display = 'none'
      link.className = 'saveFile'
      document.body.appendChild(link)
      link.href = URL.createObjectURL(blob)
      link.download = filename
      link.click()
      $('.saveFile').remove()
      this.afterSTLImg()
    },
    afterSTLImg() {
      this.saveModuleShow(1)
      // 保存成功，清空当前项目
      for (const i in this.objects) {
        this.clearCache(this.objects[i])
        this.scene.remove(this.objects[i])
      }
      this.objects = []
      this.objects.push(this.plane)
      this.transformControl.detach()
      this.activeSave = false
      this.controlBar = false
      if (this.goHomeFlag) {
        this.goHomeFlag = false
        this.saveFlag = false
        this.hideSelf()
      } else {
        this.goHomeFlag = false
        this.saveFlag = false
      }
    },
    leaveBuilder() {
      if (this.objects.length > 1) {
        if (this.saveFlag) {
          this.hideSelf()
        } else {
          this.notSaveNote = true
        }
      } else {
        this.hideSelf()
      }
    },
    hideAskWindow() {
      this.notSaveNote = false
    },
    goHomeSaveModule(type) {//type 0:gohome 1; save
      this.notSaveNote = false
      if (type === 0) {
        this.hideSelf()
      } else {
        this.saveModuleShow(0)
        this.goHomeFlag = true
      }
    },
    windowReisze() {
      const _this = this
      _this.CONTAIN_WIDTH = document.getElementById('mainWrapper').offsetWidth
      _this.CONTAIN_HEIGHT = document.getElementById('mainWrapper').offsetHeight
      _this.onWindowResize()
    }
  },
  mounted() {
    this.showLoading = true
    this.mobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)
    this.container = document.getElementById('container')
    this.shapesEventL = document.getElementById('childWrapper')
    this.shapesMain = document.getElementById('shapes')
    this.currentObjMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd })
    this.fontLoader = new THREE.FontLoader()
    this.mouseHelperMaterial = this.currentObjMaterial
    this.CONTAIN_HEIGHT = document.getElementById('mainWrapper').offsetHeight
    this.CONTAIN_WIDTH = document.getElementById('mainWrapper').offsetWidth
    window.focusedTransformObj = this.focusedTransformObj
    window.deleteObjFlag = this.deleteObjFlag
    this.init()
    this.listModule()
    window.addEventListener('resize', this.windowReisze)
    this.progressingBar = 0
    let proInterval = setInterval(() => {
      this.progressingBar += 10
    }, 100)
    setTimeout(() => {
      clearInterval(proInterval)
      this.showLoading = false
    }, 1000)
  },
  computed:{
    textTR() {
      return  `${this.$t('CURRENT_STATUS')} ${this.$t('MOVE')}`
    },
    textSC() {
      return  `${this.$t('CURRENT_STATUS')} ${this.$t('CHANGE_SIZE')}`
    },
    textRO() {
      return  `${this.$t('CURRENT_STATUS')} ${this.$t('ROTATE')}`
    }
  },
  destroyed() {
    const _this = this
    window.removeEventListener('resize', this.windowReisze)
    _this.controls.removeEventListener('change')
    _this.transformControl.removeEventListener('dragging-changed')
    _this.transformControl.removeEventListener('change')
    _this.transformControl.removeEventListener('mouseDown')
    _this.transformControl.removeEventListener('objectChange')
    _this.transformControl.removeEventListener('mouseUp')
    $('.orientationControls').remove() // 删除orientation的旋转方块
  },
  //keep-alive 激活状态，无法销毁监听，需要使用deactivated来销毁
  deactivated() {
    const _this = this
    window.removeEventListener('resize', this.windowReisze)
    _this.controls.removeEventListener('change')
    _this.transformControl.removeEventListener('dragging-changed')
    _this.transformControl.removeEventListener('change')
    _this.transformControl.removeEventListener('mouseDown')
    _this.transformControl.removeEventListener('objectChange')
    _this.transformControl.removeEventListener('mouseUp')
    $('.orientationControls').remove() // 删除orientation的旋转方块
  },
  watch: {
    CONTAIN_WIDTH(newVal) {
      if (newVal) {
        this.CONTAIN_WIDTH = document.getElementById('mainWrapper').offsetWidth
        this.CONTAIN_HEIGHT = document.getElementById('mainWrapper').offsetHeight
      }
    },
    CONTAIN_HEIGHT(newVal) {
      if (newVal) {
        this.CONTAIN_WIDTH = document.getElementById('mainWrapper').offsetWidth
        this.CONTAIN_HEIGHT = document.getElementById('mainWrapper').offsetHeight
      }
    },
    focusedTransformObj(newVal) {
      if (newVal) {
        console.log('change the focusedTransformObj')
        window.focusedTransformObj = this.focusedTransformObj
      }
    },
    textInput(newVal, oldVal) {
      if (newVal) {
        console.log('changed textInput')
        console.log('oldVal:' + oldVal)
        console.log('newVal:' + newVal)
        this.textInput1 = newVal
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
RIGHT-WIDTH = 1rem;
RIGHT-WIDTH-EN = 1.3rem;

.builder
  position: relative;
  margin auto

  .main_wrapper
    width 100%
    height 100%
    min-height: 5rem;
    margin auto
    position: relative;
    /*@media screen and (max-width: 768px)*/

    #container
      width 100%
      height 100%
      min-height: 5rem;
      background: #79B1EA; /* Old browsers */
      background: -moz-linear-gradient(top, #79B1EA 0%, #4E92EF 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top, #79B1EA 0%, #4E92EF 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, #79B1EA 0%, #4E92EF 100%);

    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

    .show_more
      position: absolute;
      top: 50%;
      right RIGHT-WIDTH
      transform translate(0, -50%)
      cursor pointer
      z-index: 3;
      background: #F0F7FF;
      border-radius: .1rem 0 0 .1rem;
      width: .15rem;
      height: .6rem;

      img
        position: absolute;
        left: 4px;
        top: 25px;
        cursor: pointer;
        width: .05rem;
        height: .1rem;

    .show_more.show_more_close
      right: 0;

    .show_more_close img
      transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* IE 9 */
      -moz-transform: rotate(180deg); /* Firefox */
      -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
      -o-transform: rotate(180deg);

    /* Opera */

    #shapes
      position: absolute;
      right 0
      top 0
      bottom 0
      width RIGHT-WIDTH
      background: #F0F7FF;
      color: #000;
      text-align: center;
      font-size: .14rem;
      line-height: 0.3rem;
      z-index: 6;

      *
        color: #323232;

      .arrow
        color: #999999;

      .shapes_wrapper
        cursor pointer

    #childWrapper
      height: 100%;
      overflow: auto;
      background: #F0F7FF;
      position: absolute;
      right 0
      top 0
      bottom 0
      width RIGHT-WIDTH
      max-width: RIGHT-WIDTH;
      z-index: 5;

      .child_wrapper
        height: 100%;
        max-width: RIGHT-WIDTH;
        background: #F0F7FF;
        cursor pointer

        .child_title
          font-size: .14rem;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          z-index: 2;
          width: RIGHT-WIDTH;
          background: #F0F7FF;
          text-align: left;
          line-height: 0.3rem;

        .module.active_shape
          background: rgba(118, 174, 234, .3) !important;

        .module.cube, .module.standing
          margin-top: .32rem;

        .module
          position: relative;
          width: RIGHT-WIDTH;
          height: .75rem;
          float: left;

          img
            margin: .1rem auto 0;
            max-width: 50%;
            max-height: 50%;

          .name
            text-align: center;
            width: 100%;
            font-size: .12rem;
            line-height: .12rem;

          .sprint
            width: .5rem;
            height: .5rem;
            margin: .07rem auto 0;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: -50px 0;

          .sprintY, .sprint_fivepointstar
            background-position: 0 0;

  .module_btns
    position: absolute
    top .1rem
    left .1rem

    .module_btn_name
      font-size: .12rem;
      color: #FFFFFF;
      text-align: center;

    .btn_main.save_module
      margin-left: .1rem;

      .btn_child .iconfont
        font-size: .25rem;
        line-height: .41rem;

    .btn_main
      float: left
      cursor pointer

      .btn_child
        width: .44rem;
        height: .44rem;
        background-image: url("/image/3dBuilder/3dPrinting/btn_bg_blue.png");
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;

        .iconfont
          font-size: .28rem;
          line-height: .4rem;
          color: #fff;
          left: 0;
          display: block;
          text-align: center;

    .save_module
      left: .5rem

    .save_module.noActive_save
      opacity: .3

  .obj_control
    position: absolute
    bottom 0
    left 0
    right 0

    *
      color: #2B9CFF;

    .obj_control_wrapper
      width: fit-content;
      height: .54rem;
      position: relative;
      margin: 0 auto;
      background: #fff;
      border-radius: .2rem .2rem 0 0;
      text-align: center;
      top: 0;
      padding: .05rem .1rem;
      cursor pointer

      .control_btn.color_control
        padding-top: .1rem;

      .control_btn
        color: #79c2de;
        font-size: .2rem;
        float: left;
        min-width: .3rem;
        min-height: .3rem;
        padding: 0 .1rem;
        position: relative;

        .iconfont
          font-size: .2rem;
          line-height: .26rem;
          width: .28rem;
          height: .28rem;
          display: block;
          margin: auto;

        .btn_name
          font-size: .1rem;
          font-family: "webfont5", serif;
          line-height: .16rem;

        .color_wrapper
          width: 170%;
          position: absolute;
          top: -.55rem;
          left: -.15rem;
          right: 0;
          background: #FFF;
          border-radius: .05rem;
          box-shadow: 0px 0px 0.21rem 0px rgba(145, 96, 34, 0.2);

          .color_control
            display: inline-block;

            .color_circle
              margin: .1rem .05rem;

          .white_control
            .color_circle
              background: #fff;
              border: 1px solid #BABBBB

        .outside_color
          margin: .015rem auto;

        .white_color_circle
          background: #fff;
          border: 1px solid #BABBBB

        .zoom_options
          position: absolute;
          top: -.65rem;
          left: 0;
          right: 0;
          background: #FFF;
          border-radius: .05rem;
          box-shadow: 0px 0px 0.21rem 0px rgba(145, 96, 34, 0.2);

          .zoom_opt
            font-size: .15rem;
            line-height: .2rem;

      .active_control
        .icon_wrapper
          width: .28rem;
          height: .28rem;
          color: #FFF;
          margin: auto;
          background-image: url("/image/3dBuilder/active_bg.png");
          background-repeat: no-repeat;
          background-size: cover;

        .iconfont
          color: #FFF

        .btn_name
          color: #FFB93F

      .noActive_control
        .iconfont
          color: #eee;

      .color_circle
        width: .25rem;
        height: .25rem;
        background: #f2f545;
        margin: auto;
        border-radius: 50%;

      .active_color
        border: 1px solid #2067C8


  .save_name_module_bg, .save_ask_module_bg
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #000;
    opacity: .3;
    z-index: 3;

  .save_name_module, .save_ask
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 4;
    border-radius: .35rem;
    width: 3.15rem;
    height: 2rem;
    margin-top: -1rem;
    margin-left: -1.575rem;
    text-align: center;
    background: rgba(185, 239, 255, 1);
    box-shadow: 0px 0px 11px 0px rgba(34, 87, 145, 0.2), 0px 0px 125px 0px rgba(56, 154, 240, 1) inset;

    .save_name_title, .save_ask .save_name_title
      width: 1.47rem;
      height: .33rem;
      background: linear-gradient(0deg, rgba(85, 182, 227, 1) 0%, rgba(54, 129, 227, 1) 100%);
      border-radius: 0 0 .15rem .15rem;
      line-height: .33rem;
      margin: auto;
      font-size: .18rem;
      color: #323232;

    .save_name_tip
      margin: .15rem 0;

    #save_name
      width: 90%;
      margin-top: .1rem;
      padding: 0 .1rem;
      font-size: .12rem;
      height: .4rem;
      line-height: .4rem;
      border-radius: .1rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 3px 2px 2px 0px rgba(85, 182, 227, 0.64) inset;
      border: none;
      outline: none;
      color: #323232;

    .btn_wrapper
      .save_name_cancle
        position: absolute;
        top: -.14rem;
        right: -.1rem;
        width: .45rem;

      img.save_name_ok, img.go_home_ok
        width: .9rem;
        height: auto;
        margin: .12rem .2rem 0 .2rem;

    .save_name_verify
      display: none;
      color: red;
      position: absolute;
      bottom: .62rem;
      left: .23rem;
      background: #fff;

  .save_ask
    .save_name_title
      color: #fff

    .save_name_tip
      margin: .3rem .3rem .1rem;
      text-align: left;
      line-height: 0.25rem;
      color: #426A8D;

  .note
    display: none;
    width: 1.1rem;
    background: #7BB3FF;
    border-radius: 5px;
    position: fixed;
    top: .91rem;
    left: .1rem;
    font-size: 0.1rem;
    color: #426A8D;
    line-height: .13rem;
    padding: .04rem;

  .text_window
    position: fixed;
    top: .1rem;
    right: 2.5rem;
    width: 1.5rem;
    background: #fff;
    border-radius: 4px;
    font-size: .14rem;
    text-align: center;
    z-index: 2;

    .text_title
      border-radius: 4px 4px 0 0;
      background: #eee;
      line-height: .2rem;

    #textContent
      width: 90%;
      border: 1px solid #999;
      border-radius: 4px;
      margin-top: .1rem;
      padding: 0 .05rem;
      font-size: .12rem;

    .btn_wrapper
      .btns
        height: .25rem;
        width: .5rem;
        background: #79B1EA;
        border-radius: .1rem;
        line-height: .25rem;
        display: inline-block;
        margin: .05rem;
        color: #fff;
        cursor pointer

      .btn_disable
        background: #eee;
        pointer-events: none;

  .control_type
    background: #7BB3FF;
    border-radius: 5px;
    position: fixed;
    top: 1rem;
    left: .1rem;
    font-size: 0.15rem;
    color: #426A8D;
    line-height: .2rem;
    padding: .07rem;

  .main_wrapper.main_wrapper_en_us
    .show_more
      right RIGHT-WIDTH-EN

    #shapes, #childWrapper
      width RIGHT-WIDTH-EN
      max-width: RIGHT-WIDTH-EN

      .child_wrapper
        width RIGHT-WIDTH-EN
        max-width: RIGHT-WIDTH-EN

        .child_title, .module
          width RIGHT-WIDTH-EN

.builder.fixedBuilder
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index: 99;

.red {
  color: red;
}

.blue {
  color: blue;
}

.green {
  color: lawngreen;
}

.startDrag {
  max-width: .9rem;
  max-height: .9rem;
  z-index: 99999;
  position: absolute;
}

</style>
