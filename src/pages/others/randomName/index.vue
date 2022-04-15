<template>
  <div id='randomNamePickUp' :class='`${userAgent === "pc" ? "" : "random-container-mobile"}  not-select`'>
    <div class='show-name tag-group'>
      <el-tag
        class='each-tag'
        v-for='(item, index) in names'
        :key=item
        :type='tagType[index%4]'
        closable
        @close='handleClose(item)'
      >
        {{ item }}
      </el-tag>
      <el-input
        class="each-tag input-new-tag"
        v-if="inputVisible && inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-tag v-if='showBtnCount > names.length && !addTag' class="each-tag button-new-tag"  @click="showInput"> + </el-tag>
    </div>

    <el-tag
      class='final-name'
      effect='dark'
      @click='showAddButton'
      :type='tagType[3]'
    >
      {{ finalName }}
    </el-tag>

    <el-button
      :class='`pickup-name`'
      type='primary'
      round
      @click='resetGame ? resetGameFn() : pickUpName()'
      :disabled=!this.startStop
      :loading=!this.startStop
    >{{ resetGame ? 'Reset' : 'Pick a Name' }}
    </el-button>

    <Aplayer
      autoplay
      preload
      float
      :mini=false
      shuffle
      :listFolded = true
      :repeat = '"repeat-all"'
      :music="mp3[videoIndex]"
      :list="mp3"
      :volume = .2
      class='aplayer-box'
    />
  </div>
</template>

<script>

import Aplayer from 'vue-aplayer'

export default {
  name: 'index',
  props: {
    userAgent: String
  },
  components: {
    Aplayer
  },
  data() {
    return {
      names: ['Aga Arafat Hossain Chowdhury', 'Erfan Ensafi Moghaddam', 'German Mahecha', 'Jean-Nicolas Gauthier', 'Xin Ning'],
      tagType: ['success', 'info', 'warning', 'danger'],
      startStop: true,
      loopInterval: null,
      finalIndex: null,
      finalName: 'Who is next',
      resetGame: false,
      showBtnTimeOut:null,
      showBtnCount:0,
      addTag: false,
      inputVisible: false,
      inputValue: '',
      videoIndex: 0,
      mp3: [
        {
          title: 'Cold Morning',
          artist: 'Cold Morning',
          src: 'mp3/cold morning.mp3',
          pic: ''
        },
        {
          title: 'Fresh Morning',
          artist: 'Fresh Morning',
          src: 'mp3/fresh morning.mp3',
          pic: ''
        },
        {
          title: 'Piano king - night piano',
          artist: '',
          src: 'mp3/Pianoking-night piano.mp3',
          pic: ''
        },
        {
          title: 'Starry Sky-Windy Hill',
          artist: '',
          src: 'mp3/Starry Sky-Windy Hill.mp3',
          pic: ''
        },
        {
          title: 'The Other Side',
          artist: '',
          src: 'mp3/the other side.mp3',
          pic: ''
        }
      ]
    }
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    pickUpName() {
      let _this = this
      if (_this.startStop) {
        _this.startStop = false

        _this.loopInterval = setInterval(function() {
          let randomN = _this.randomNum(0, _this.names.length - 1)
          _this.finalIndex = randomN
          _this.finalName = _this.names[randomN]
        }, 100)

        setTimeout(() => {
          clearInterval(_this.loopInterval)
          _this.loopInterval = null
          _this.startStop = true
          _this.splicePickedName()
        }, _this.names.length > 1 ? _this.names.length * 1000 - 1000 : 500)
      }
    },
    splicePickedName() {
      if (this.finalIndex > -1) {
        this.names.splice(this.finalIndex, 1)
        if (this.names.length === 0) {
          this.resetGame = true
        }
      }
    },
    resetGameFn() {
      this.names = this.$options.data().names
      this.finalName = this.$options.data().finalName
      this.resetGame = false
    },
    handleClose(tag) {
      this.names.splice(this.names.indexOf(tag), 1)
    },
    showAddButton(){
      let _this = this
      clearTimeout(_this.showBtnTimeOut)
      _this.showBtnCount++
      if(_this.showBtnCount > _this.names.length){
        return
      }
      _this.showBtnTimeOut = setTimeout(()=>{
        _this.showBtnCount = 0
      },1000)
    },
    showInput() {
      this.inputVisible = true;
      this.addTag = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.names.push(inputValue);
      }
      this.addTag = false;
      this.inputVisible = false;
      this.inputValue = '';
    }
  },
  mounted() {
    this.videoIndex = this.randomNum(0, this.mp3.length -1)
  }
}
</script>

<style scoped lang='stylus'>
#randomNamePickUp
  height calc(100vh - 260px)
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: space-around;
  justify-content: space-evenly;
  align-items: center;
  position relative
  .show-name
    .each-tag
      font-size .16rem
      margin-bottom .15rem

    .each-tag:not(:first-child)
      margin-left .1rem
    .input-new-tag
      max-width 100px
  .final-name
    font-size .2rem
    display block
    padding .15rem
    height initial

  .pickup-name
    padding .14rem
    color #fff
    font-weight bold
    font-size .16rem

  //.aplayer-box
  //  position: absolute;
  //  bottom 0
#randomNamePickUp.random-container-mobile
  height calc(100vh - 282px)

>>> .el-tag .el-icon-close::before
  padding-top: 2px;
</style>
