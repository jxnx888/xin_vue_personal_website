<template>
  <div id='wrapper'>
    <Welcome ref='welcome' />
    <HappyBirthday
      @closeWindow='closeWindow'
      :birthName='finalName'
      v-if='showBirthday'
    />
    <div id='randomNamePickUp' :class='`${userAgent === "pc" ? "" : "random-container-mobile"}  not-select`'>
      <div
        class='master_ceremony'
        v-if='!pickMasterOfCeremony && masterOfCeremony'
      >
        <!--        <img :src='require()' alt=''>-->
        <el-tag
          class='master-ceremony-tag'
          effect='dark'
        >
          {{ masterOfCeremony }}
        </el-tag>
      </div>

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
          class='each-tag input-new-tag'
          v-if='inputVisible && inputVisible'
          v-model='inputValue'
          ref='saveTagInput'
          @keyup.enter.native='handleInputConfirm'
          @blur='handleInputConfirm'
        >
        </el-input>
        <el-tag v-if='showBtnCount > names.length && !addTag' class='each-tag button-new-tag' @click='showInput'> +
        </el-tag>
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
        v-if='pickMasterOfCeremony'
        :class='`pickup-name`'
        type='primary'
        round
        @click='resetGame ? resetGameFn() : pickUpName()'
        :disabled=!this.startStop
        :loading=!this.startStop
      > Pick The Master Of Ceremony
      </el-button>

      <el-button
        v-else
        :class='`pickup-name`'
        type='primary'
        round
        @click='resetGame ? resetGameFn() : pickUpName()'
        :disabled=!this.startStop
        :loading=!this.startStop
      >{{ resetGame ? 'Reset' : 'Pick a Name' }}
      </el-button>

      <Aplayer
        preload
        float
        :mini=false
        shuffle
        :listFolded=true
        :repeat='"repeat-all"'
        :music='mp3[videoIndex]'
        :list='mp3'
        :volume=.1
        class='aplayer-box'
      />
    </div>
  </div>

</template>

<script>

import Aplayer from 'vue-aplayer'
import Welcome from './welcome'
import HappyBirthday from './happyBirthday'
import _ from 'lodash'
import moment from 'moment'
import calendarFormatter from '@/utils/convertLunarSolar'

export default {
  name: 'index',
  props: {
    userAgent: String
  },
  components: {
    Aplayer,
    Welcome,
    HappyBirthday
  },
  data() {
    return {
      names: ['Aga Arafat Hossain Chowdhury', 'Erfan Ensafi Moghaddam', 'German Mahecha', 'Jean-Nicolas Gauthier', 'Priyanka Ghadge', 'Xin Ning'],
      tagType: ['success', 'info', 'warning', 'danger'],
      startStop: true,
      loopInterval: null,
      finalIndex: null,
      finalName: 'Who is next',
      pickMasterOfCeremony: true,
      masterOfCeremony: '',
      resetGame: false,
      showBtnTimeOut: null,
      showBtnCount: 0,
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
      ],
      birthday: [{
        title: 'Happy Birthday',
        artist: 'Happy Birthday',
        src: 'mp3/happy-birthday.mp3'
      }],
      showBirthday: false,
      fireworkOption: {
        hue: { //色彩范围
          min: 0,
          max: 360
        },
        delay: { // 放烟花速度
          min: 0,
          max: 50
        },
        rocketsPoint: 50, // 炮台位置
        speed: 50,
        acceleration: 30, // 放烟花速度
        friction: .9, // 烟花大小
        gravity: 1.8, // 烟花下垂度
        particles: 90,
        trace: 5, // 烟花轨迹宽度
        explosion: 6, //烟花爆炸开后的下垂的尾长
        autoresize: true, //自动调整大小
        brightness: {// 烟花大小
          min: 70,
          max: 80,
          decay: { //衰变，烟花消失速度
            min: 0.015,
            max: 0.03
          }
        },
        boundaries: {
          visible: false
        }
      }
    }
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    pickUpName() {
      let _this = this
      // startStop === true 可以点击开始选择名字
      if (_this.startStop) {
        _this.startStop = false
        // 开始随机名字 用于 who is next 中轮播名字
        _this.loopInterval = setInterval(function() {
          // 获取随机数
          let randomN = _this.randomNum(0, _this.names.length - 1)
          // 设置随机数组的index 用于展示在who is next
          _this.finalIndex = randomN
          // 根据随机index提取名字 用于展示在who is next
          _this.finalName = _this.names[randomN]
        }, 100)
        let nameLengthSec = _this.names.length * 1000 - 1000
        setTimeout(() => {
          // 停止轮播名字
          clearInterval(_this.loopInterval)
          _this.loopInterval = null
          _this.startStop = true
          if (this.pickMasterOfCeremony) {
            this.$refs.welcome.fireworksFn()
            this.$refs.welcome.fireworksObj.start()
            this.pickMasterOfCeremony = false
            this.masterOfCeremony = this.finalName
            this.finalName = 'Who is next'
            setTimeout(() => {
              this.$refs.welcome.fireworksObj.stop()
              // remove the Canvas tag
              let fireworkDOM = document.getElementById('firework')
              while (fireworkDOM.hasChildNodes()) {
                fireworkDOM.removeChild(fireworkDOM.firstChild)
              }
            }, 3000)
          } else {
            _this.splicePickedName()
          }
          _this.ifNameMatch()
        }, _this.names.length > 1 ? nameLengthSec > 3000 ? 3000 : nameLengthSec : 500)
      }
    },
    ifNameMatch() {
      const now = moment().format('MM/DD')
      const xinBirthday = calendarFormatter.lunar2solar(moment().year(), 10, 4)
      const xinMonth = xinBirthday.cMonth < 10 ? `0${xinBirthday.cMonth}` : xinBirthday.cMonth
      const xinDay = xinBirthday.cDay < 10 ? `0${xinBirthday.cDay}` : xinBirthday.cDay
      const birthday = {
        '02/10': 'Erfan Ensafi Moghaddam',
        '07/06': 'Jean-Nicolas Gauthier',
        '09/26': 'Priyanka Ghadge',
        '11/09': 'German Mahecha',
        '11/14': 'Aga Arafat Hossain Chowdhury'
      }
      birthday[`${xinMonth}/${xinDay}`] = 'Xin Ning'

      if (birthday[now] && this.finalName === birthday[now]) {
        this.showBirthday = true
      } else {
        this.showBirthday = false
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
      this.names = _.shuffle(this.$options.data().names)
      this.finalName = this.$options.data().finalName
      this.resetGame = false

      // Reset master of ceremony
      this.pickMasterOfCeremony = true
      this.masterOfCeremony = null
    },
    handleClose(tag) {
      this.names.splice(this.names.indexOf(tag), 1)
    },
    showAddButton() {
      let _this = this
      clearTimeout(_this.showBtnTimeOut)
      _this.showBtnCount++
      if (_this.showBtnCount > _this.names.length) {
        return
      }
      _this.showBtnTimeOut = setTimeout(() => {
        _this.showBtnCount = 0
      }, 1000)
    },
    showInput() {
      this.inputVisible = true
      this.addTag = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.names.push(inputValue)
      }
      this.addTag = false
      this.inputVisible = false
      this.inputValue = ''
    },
    closeWindow() {
      this.showBirthday = false
    }
  },
  mounted() {
    this.videoIndex = this.randomNum(0, this.mp3.length - 1)
    // 将分享方法绑定在window上
    window['pickUpName'] = () => {
      this.pickUpName()
    }
  },
  created() {
    this.names = _.shuffle(this.names)
  }
}
</script>

<style scoped lang='stylus'>
#wrapper
  position: relative;

  #birthday_wrapper
    position: relative;

  #randomNamePickUp
    height calc(100vh - 260px)
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: space-around;
    justify-content: space-evenly;
    align-items: center;
    position relative

    .master_ceremony {
      .master-ceremony-tag {
        font-size: .25rem
        display block
        padding .15rem
        height initial
      }
    }

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
