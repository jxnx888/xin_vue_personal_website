<template>
  <div class="mainWrapper">
    <div class="mobile_bg" @click="hideSelf()"></div>
    <img src="/image/yuandian/iphonex.png" alt="" class="mobile_module">
    <div class="topNav img_wrapper">
      <img src="/image/yuandian/logo.png" alt="">
      <div class="close_content iconfont" @click="showMenu = true;showQuize = false;showResult = false;"  v-if="!showMenu">&#xe720;</div>
    </div>
    <div class="mobileWrapper">
      <div class="forFun_menu clearfix" v-if="showMenu">
          <div v-for="(item, index) in forFunJson.menu"
               :key="index"
               class="each_top_menu"
               @click="showTest(item.id,item.bigImgUrl,item.resultImgs)"
          >
            <div class="top_menu img_wrapper" v-if="item.id < 7">
              <img v-lazy="item.imgUrl" alt="">
              <p class="show_test_num"><span>{{item.testNum}}</span>人在测</p>
            </div>
            <div class="big_menu img_wrapper" v-else>
              <img v-lazy="item.imgUrl" alt="">
              <p class="show_test_num"><span>{{item.testNum}}</span>人在玩</p>
            </div>
          </div>
      </div>
      <div class="forFunContent" v-if="showQuize">
        <div class="img_wrapper">
          <img :src="this.currentImg" alt="">
        </div>
        <div class="inputs name">
          <input type="text" id="userInputName" placeholder="姓名：请输入姓名" v-model="userName" maxlength="4">
          <div class="name_valid" v-if="nameValid" @click="validClick(0)">* 请输入姓名</div>
        </div>
        <div class="inputs sex clearfix"  v-if="showSex">
          <div class="title">性别：</div>
          <div class="each_sex">
            <input type="radio" id="male" name="sex" value="male" checked="checked" v-model="sexFlag"/>
            <label class="sexLabel">男</label>
          </div>
          <div class="each_sex">
            <input type="radio" id="female" name="sex" value="female"  v-model="sexFlag"/>
            <label class="sexLabel">女</label>
          </div>
        </div>
        <div class="inputs constellation" v-if="showConstellation">
          <select
            class="xingzuo"
            id="xingzuo"
            v-model="constellation">
            <option name="xingzuo" value="1">白羊座 ( 03/21 - 04/19 )</option>
            <option name="xingzuo" value="2">金牛座 ( 04/20 - 05/20)</option>
            <option name="xingzuo" value="3">双子座 ( 05/21 - 06/21)</option>
            <option name="xingzuo" value="4">巨蟹座 ( 06/22 - 07/22)</option>
            <option name="xingzuo" value="5">狮子座 ( 07/23 - 08/22)</option>
            <option name="xingzuo" value="6">处女座 ( 08/23 - 09/22)</option>
            <option name="xingzuo" value="7">天秤座 ( 09/23 - 10/23)</option>
            <option name="xingzuo" value="8">天蝎座 ( 10/24 - 11/22)</option>
            <option name="xingzuo" value="9">射手座 ( 11/23 - 12/21)</option>
            <option name="xingzuo" value="10">魔羯座 ( 12/22 - 01/19)</option>
            <option name="xingzuo" value="11">水瓶座 ( 01/20 - 02/18)</option>
            <option name="xingzuo" value="12">双鱼座 ( 02/19 - 03/20）</option>
          </select>
        </div>
        <div class="inputs questions" v-if="showQuestions">
          <div class="each_q">

          </div>
        </div>
        <div class="text-center note">
          我们向您保证，用户输入的所有内容只会用于测试，不会将个人信息采集记录。
        </div>

        <div class="submit_btn" @click="generateResult()">{{submitTxt}}</div>
      </div>
      <div class="forFunResult" v-show="showResult">
        <div class="resultTitle">长按保存你的结果图片吧</div>
        <div class="img_wrapper">
          <img :src="this.currentResultImg[this.randomIndex]" id="resultImg" v-show="true">
          <div id="results"  style="text-align:center; width:100%"></div>
          <canvas id="canvas" v-show="false"></canvas>
          <img src="/image/footer/wechat_xin.jpg" id="wechatQR" alt="" v-show="false">
          <img src="/image/head_ico.png" id="headImg" alt="" v-show="false">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "forFun",
        data() {
            return {
                forFunJson: {},
                showMenu: true,
                showQuize: false,
                quizeIndex: 1,
                showResult: false,
                nameValid: false,
                showConstellation: false,
                showQuestions: false,
                showSex: false,
                constellation: 1,
                showTestIndex:0,
                sexFlag:'male',
                currentImg:null,
                currentResultImg:[],
                randomIndex:0,
                currentInput:1,
                submitTxt:'开始生成',
                userName:'',
                canvasImg:'',
            }
        },
        methods:{
            getForFun() {
                var url = '/mock/yuandian.json';
                this.$ajax.get(url)
                    .then(this.getForFunSucc)
                    .catch(function (res) {
                        console.log("error:" + res)
                    })
            },
            getForFunSucc(res) {
                console.log(res);
                if (res.data.code == 200) {
                    const data = res.data.data;
                    this.forFunJson = data
                }
            },
            hideSelf(){
                // this.$parent.showTest();
                this.$router.push({path:'/projects',query:{jump:'WeChat'}})
            },
            showTest(id,imgUrl,resultImgs){
                this.userName = '';
                if(imgUrl) {
                    this.currentImg = imgUrl;
                    this.currentResultImg = resultImgs;
                }
                else{
                    alert("need data, please reload")
                    return
                }
                this.quizeIndex =Number(id);
                this.randomIndex = Math.ceil(Math.random()*this.currentResultImg.length) - 1;//随机图片
                //隐藏所有子项，然后switch显示对应项目
                this.showConstellation = false;
                this.showQuestions = false;
                this.showSex = false;
                switch (this.quizeIndex) {
                  case 1:
                    break;
                  case 2:
                      this.showConstellation = true;
                      this.randomIndex = 0;
                      this.constellation = 1;
                    break;
                  case 3:
                      this.showSex = true;
                    break;
                  case 7:
                      this.showConstellation = true;
                      this.randomIndex = 0;
                      this.constellation = 1;
                    break;
                  case 8:
                      this.showConstellation = true;
                      this.randomIndex = 0;
                      this.constellation = 1;
                    break;
                  case 9:
                    break;
                  default:
                      console.log('default')

                }
                this.showMenu = false;
                this.showQuize = true;
            },
            generateResult(){
                if(this.userName){
                  this.showResult = true;
                }
                else{
                    this.userName = $("#userInputName").val();
                }
                if(!this.userName){
                    this.nameValid = true;
                    return
                }
                else{
                    this.showQuize = false;
                    this.showConstellation = true;
                    switch (this.quizeIndex) {
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            if('male' === this.sexFlag){
                                this.randomIndex = Math.ceil(Math.random() * 8) - 1+6;
                            }
                            else{
                                this.randomIndex = Math.ceil(Math.random() * 6) - 1;
                            }
                            break;
                        default:
                            console.log('this.quizeIndex:'+this.quizeIndex)

                    }
                    console.log(this.userName)
                    this.canvasRun();
                }
            },
            canvasRun(){
                //开始画布
                var img1 = document.getElementById('resultImg');
                var img2 = document.getElementById('headImg');
                var img3 = document.getElementById('wechatQR');
                var canvas = document.getElementById("canvas");
                var context = canvas.getContext("2d");
                var width = img1.width;
                var height = img1.height;
                canvas.width = width;
                canvas.height = height;
                //绘制 底图
                context.drawImage(img1, 0, 0);

                switch (this.quizeIndex) {
                  case 1:
                      //绘制 下方二维码 （图2，x，y，width， height）
                      context.drawImage(img3, 500, 755, 120, 120);
                      //绘制 昵称
                      context.font = "bold 40px Courier New";
                      context.fillStyle = "#fff";
                      context.textAlign="center";
                      context.fillText(this.userName,  320, 125  );
                      break;
                  case 2:
                      //绘制 下方二维码 （图2，x，y，width， height）
                      context.drawImage(img3, 510, 870, 150, 150);
                      //绘制 昵称
                      context.font = "bold 45px Courier New";
                      context.fillStyle = "#000";
                      // context.textAlign="center";
                      context.fillText(this.userName, 450, 155);
                      break;
                  case 3:
                      //绘制 下方二维码 （图2，x，y，width， height）
                      context.drawImage(img3, 370, 780, 100, 100);
                      //绘制 昵称
                      context.font = "45px Courier New";
                      context.fillStyle = "#000";
                      context.textAlign = "center";
                      context.fillText(this.userName, 315, 80);
                      break;
                  case 4:
                      //绘制 下方二维码 （图2，x，y，width， height）
                      context.drawImage(img3, 55, 830, 120, 120);
                      //绘制 昵称
                      if (this.userName.length <= 2) {
                          context.font = "bold 60px Courier New";
                          context.fillStyle = "#000";
                          context.textAlign = "center";
                          context.fillText(this.userName, 400, 160);
                      }
                      else {
                          context.font = "bold 45px Courier New";
                          context.fillStyle = "#000";
                          context.textAlign = "center";
                          context.fillText(this.userName, 400, 155);
                      }
                      break;
                  case 5:
                      //绘制 下方二维码 （图2，x，y，width， height）
                      context.drawImage(img3, 260, 756, 130, 130);
                      //绘制 昵称
                      context.font = "  50px Courier New";
                      context.fillStyle = "#000";
                      context.textAlign = "center";
                      context.fillText(this.userName, 320, 80);
                      break;
                  case 6:
                      //绘制 下方二维码 （图2，x，y，width， height）
                      context.drawImage(img3, 80, 800, 120, 120);
                      //绘制 昵称
                      context.font = "bold 50px Courier New";
                      context.fillStyle = "#000";
                      context.textAlign="center";
                      context.fillText(this.userName,  320, 162  );
                      break;
                  case 7:
                      //绘制 下方二维码 （图2，x，y，width， height）
                      context.drawImage(img3, 630, 910, 150, 150);
                      //绘制 昵称
                      context.font = "bold 45px Courier New";
                      context.fillStyle = "#000";
                      context.textAlign = "center";
                      context.fillText(this.userName, 400, 76);
                      break;
                  case 8:
                      //绘制 下方二维码 （图2，x，y，width， height）
                      context.drawImage(img3, 285, 987, 130, 130);
                      //绘制 头像（图2，x，y，width， height）
                      context.save(); // 保存当前ctx的状态
                      context.arc(350,735, 47, 0, 2*Math.PI); //画出圆
                      context.clip(); //裁剪上面的圆形
                      context.drawImage(img2, 300, 685, 100, 100); // 在刚刚裁剪的园上画图(img, 图片左上角位置，图片左上角其实位置，图片长，宽)
                      context.restore(); // 还原状态
                      //绘制 昵称
                      context.font = "bold 45px Courier New";
                      context.fillStyle = "#fff";
                      context.textAlign = "center";
                      context.fillText(this.userName, 345, 270);
                      break;
                  case 9:
                      //绘制 下方二维码 （图2，x，y，width， height）
                      context.drawImage(img3, 500, 920, 120, 120);
                      //绘制 昵称
                      context.font = "bold 50px Courier New";
                      context.fillStyle = "#000000";
                      context.textAlign="center";
                      context.fillText(this.userName,  310, 100  );
                      break;
                  default:
                      context.fillStyle = "#fff";
                }
                var myCanvas = document.getElementsByTagName("canvas")[0];
                this.canvasImg = this.convertCanvasToImage(myCanvas);
                $("#results").html(this.canvasImg);
            },
            // canvas-->image
            convertCanvasToImage(canvas) {
                //新Image对象,可以理解为DOM;
                var image = new Image();
                //canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
                //指定格式PNG
                image.src = canvas.toDataURL("image/png");
                return image;
            },
            validClick(type){
                this.nameValid = false;
                if('0'==type) {
                    $("#userInputName").focus();
                }
            }
        },
        mounted() {
            this.getForFun()
        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            constellation(newValue, oldValue) {
                if(newValue){
                    this.randomIndex = newValue-1;
                    console.log("this.randomIndex==="+this.randomIndex)
                }
            },
            // eslint-disable-next-line no-unused-vars
            sexFlag(newValue, oldValue) {
                if(newValue){
                    this.sexFlag = newValue;
                    if('male' === this.sexFlag){
                        this.randomIndex = Math.ceil(Math.random() * 8) - 1+6;
                    }
                    else{
                        this.randomIndex = Math.ceil(Math.random() * 6) - 1;
                    }
                    console.log("this.maleSelect==="+this.sexFlag)
                }
            },
        },
    }
</script>

<style scoped lang="stylus">
.mainWrapper
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background #fff
  z-index 99
  min-width 5rem

  .mobile_bg
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background #fff
  .mobile_module
    position absolute
    top 0
    left .02rem
    right 0
    width 4.7rem
    height 8rem
    margin auto
  .topNav
    height .5rem
    position absolute
    top 0.7rem
    right 0
    left: 50%;
    transform: translate(-50%, 0);
    width 3.2rem
    background #fff
    .close_content
      font-size .3rem
      position: absolute;
      top: .11rem;
      left: 0;
  .mobileWrapper::-webkit-scrollbar
    display:none
  .mobileWrapper,.forFunContent,.forFunResult
    width: 3.2rem;
    height: 6.25rem;
    overflow: auto;
    position: absolute;
    top: 1.2rem;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 0 0 .3rem 0.3rem;
    padding-bottom: .1rem;
    z-index 1
    .forFun_menu
      width: 100%
      .each_top_menu
        float left
        width 100%
        .top_menu
        .big_menu
          width 100%
          height 1.12rem
          background-color bisque
          border-radius .1rem
          margin-bottom .1rem
          img
            border-radius: .1rem
          p.show_test_num
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;
            position: absolute;
            right: 0;
            bottom: 0
            line-height: 26px;
            border-radius: 13px 0 0 13px;
            padding: 0 15px;
            span
              color #f6f94a
        .big_menu
          height 1.8rem
  .forFunContent,.forFunResult
    z-index 2
    top 0
    .img_wrapper
      width 100%
      height 1.89rem
    .inputs
      position: relative;
      input
        width: 100%;
        font-size: 20px;
        border: 3px solid cornflowerblue;
        line-height: 40px;
        text-align: center;
        margin-top .1rem
      .name_valid
        color: #f00;
        font-size: 20px;
        line-height: 36px;
        position: absolute;
        top: .13rem;
        left: .03rem;
        bottom: 0;
        background: #fff;
        width: 98%;
        height: .4rem;
    .constellation
      border: 1px solid;
      margin-top: .1rem;
      select#xingzuo
        width: 100%;
        height: 40px;
        padding: 0 35px;
        font-size: 20px;
        opacity: 0.7;

    .sex
      margin .1rem auto
      padding 0 .1rem
      .title
        float left
        line-height .46rem
      .each_sex
        float left
        width 30%
        height .46rem
        input,label
          width 50%
          float: left;
          line-height .46rem
          margin-bottom 0
        input
          height .2rem
          margin-top .15rem
    .note
      font-size: 12px;
      width: 90%;
      margin: 0 auto;
      opacity: 0.7;
      line-height: 15px;
      padding .1rem 0
    .submit_btn
      color: #fff;
      background-color: #428bca;
      line-height: 40px;
      border: 1px solid transparent;
      border-radius: 4px;
      margin-top .1rem
  .forFunResult
    border: double;
    .resultTitle
      text-align: center;
      font-size: 20px;
      line-height: 40px;
      font-weight bold
      border-bottom: double;
    .img_wrapper
      height 4.7rem
</style>
