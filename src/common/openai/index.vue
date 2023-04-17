<template>
  <div id='container'>
    <el-button
      @click='visible = true'
      type='primary'
      icon="el-icon-chat-dot-round"
      circle
      class='openai_icon'
    > </el-button>
    <el-drawer
      title="Welcome to ChatNX"
      :visible.sync="visible"
      :before-close="handleClose"
      class='openai_window'
      size='80%'
    >
      <div class='openai_content'>
        <div class='openai_com'>
          <el-row>
            <el-col
              v-for='(item, key) in conversitionArr'
              :key='key'
            >
              <el-row :class="`openai-each openai-each-${Number(key)%2 ===0 ? 'user':'ai'}`">
                <el-col :span='2' class='each_line'>
                  <div
                    :class="`openai-tag ${Number(key)%2 ===0 ? 'tag-q':'tag-a'}`"
                  >
                    {{ Number(key)%2 ===0 ? 'A' : 'Q' }}
                  </div>
                </el-col>
                <el-col else :span='22' class='each_line each-content'>
                  {{item}}
                </el-col>
              </el-row>

            </el-col>
          </el-row>
        </div>
        <div class='open-input-submit'>
          <el-input
            class='openai_input'

            type="input"
            :autosize="{ minRows: 2, maxRows: 3}"
            placeholder="Send a message"
            v-model="textareaData"
            resize='none'
            @keyup.enter.native='conversitionFn'
          >
            <el-button
              slot="suffix"
              class='openai_submit'
              :disabled='ableSubmit'
              @click='conversitionFn'
              icon='el-icon-s-promotion'
            ></el-button>
<!--            <i slot="suffix" class="el-icon-s-promotion" @click='conversitionFn'></i>-->
          </el-input>
<!--          <el-button-->
<!--            class='openai_submit'-->
<!--            :disabled='this.textareaData.length < 2'-->
<!--            @click='conversitionFn'-->
<!--            icon='el-icon-s-promotion'-->
<!--          ></el-button>-->
        </div>
      </div>
    </el-drawer>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      visible: false,
      ableSubmit: true,
      textareaData: '',
      conversitionArr:[],
      loading:null
    }
  },
  methods: {
    conversitionFn() {
      this.openLoading()
      const userInput = this.textareaData
      this.textareaData = ''
      this.conversitionArr.push(userInput)
      this.$ajax.post(
        `https://api.ning-xin.com/openai/chat/conversition`,
        // `http://localhost:3000/openai/chat/conversition`,
        {
          input:userInput
        }
      )
        .then(this.getChatResponse)
        .catch(function(res) {
          console.log('error:' + res)
          this.closeLoading()
        })
    },
    getChatResponse(res){
      if (res.data) {
        this.conversitionArr.push(res.data)
      }
      this.closeLoading()
    },
    handleClose(done) {
      this.$confirm('Are you sure to close？')
        // eslint-disable-next-line no-unused-vars
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    openLoading(){
      this.loading = this.$loading({
        lock: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass:'openai-loading'
      });
    },
    closeLoading() {
      this.loading.close();
    },
  },
  mounted() {
    // this.openLoading()
  },

  watch: {
    visible(newVal){
      if(newVal === true){
        document.getElementsByTagName('body')[0].className = 'overflow'
      } else {
        document.body.removeAttribute('class', 'overflow')
      }
    },

    textareaData(newVal){
      this.ableSubmit = newVal.length < 2;
    }

  }
}
</script>

<style scoped lang='stylus'>
#container
  .openai_icon
    position fixed
    bottom 20px;
    right 20px
    z-index 1
  .openai_window
    .openai_content
      .openai_com
        height calc(100vh - 200px)
        width 90%
        margin auto
        overflow auto
        .openai-each
          padding 15px
          &.openai-each-ai
            background #eee
          .each_line
            line-height 30px
            margin-bottom 5px
            &.each-content
              text-align left
            .openai-tag
              width 30px
              height 30px
              line-height: 30px;
              border-radius 50%
              color #fff
              &.tag-q
                background #ff0000
              &.tag-a
                background #0267fc

      .open-input-submit
        position: relative;
        .openai_input
          width 80%
          >>> .el-input__suffix
            width: 30px;
            height: 40px;
            right: -3px;
            .el-input__suffix-inner
              .openai_submit
                width: 100%;
                padding: 12px 0;
                border-top: 0;
                border-bottom: 0;
                border-right: 0;
                margin-top: 1px;
                margin-right: 1px;
        >>> textarea.el-textarea__inner
          padding-right 50px!important
         >>> .openai_submit
          position: absolute;
          right: 10%;

</style>
