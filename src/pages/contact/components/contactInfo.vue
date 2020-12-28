<template>

  <div class="contactInfo">
  <div class="contactInfo_wrapper">
    <h1 class="top_title">{{$t('contact.topTitle[0]')}}</h1>
    <div class="top_subtitle">{{$t('contact.topTitle[1]')}}</div>
    <div class="contact_body clearfix">
      <div class="left">
        <div class="left_wrapper">
        <div class="info_title clearfix">
          <div class="title_wrapper clearfix">
            <div class="num">01</div>
            <div class="contactWay">GET IN <br> TOUCH</div>
          </div>

        </div>
        <div class="contact_intro">I'm very approachable and would love to speak to you.</div>
        <div class="contact_intro contact_intro2">Feel free to call, send us an email, facebook me or simply complete the enquiry form.</div>
        <div class="each_method clearfix">
          <a href="tel:+86 18535424777">
          <div class="icon icon_phone"></div>
           <div class="each_content">+86 18535424777</div>
          </a>
        </div>
        <div class="each_method clearfix">
          <a href="mailto:jxnx888@hotmail.com">
          <div class="icon icon_email"></div>
           <div class="each_content">jxnx888@hotmail.com</div>
          </a>
        </div>
        <div class="each_method clearfix">
          <a href="https://www.linkedin.com/in/xin-ning-28818b115/">
          <div class="icon icon_linkedin"></div>
           <div class="each_content">@Xin Ning</div>
          </a>
        </div>
        <div class="each_method clearfix">
          <a href="https://www.linkedin.com/in/xin-ning-28818b115/">
          <div class="icon icon_facebook"></div>
           <div class="each_content">@Xin Ning</div>
          </a>
        </div>
        </div>
      </div>
      <div class="right">
        <div class="right_wrapper">
        <div class="info_title clearfix">
          <div class="title_wrapper clearfix">
            <div class="num">02</div>
            <div class="contactWay">SEND ME <br> A MESSAGE</div>
          </div>
          <form id="sendEmail">
            <div class="info_content">
              <div class="each_input">
                <input type="text" v-model="name" placeholder="YOUR NAME" id="name" ref="name" name="name">
                <div class="valid" v-if="nameValid" @click="clearFocus(1)">* Please input your name</div>
              </div>
              <div class="each_input">
                <input type="text" v-model="email" placeholder="EMAIL ADDRESS" id="email" ref="email" name="email">
                <div class="valid" v-if="emailValid" @click="clearFocus(2)">* Please input your email address</div>
              </div>
              <div class="each_input">
                <input type="text" v-model="phone" placeholder="TELEPHONE NUMBER" id="phone" ref="phone" name="phone">
                <div class="valid" v-if="phoneValid" @click="clearFocus(3)">* Please input your telephone number</div>
              </div>
              <div class="each_input">
                <input type="text" v-model="subject" placeholder="SUBJECT" id="subject" ref="subject">
                <div class="valid" v-if="subjectValid" @click="clearFocus(4)">* Please input your subject</div>
              </div>
              <div class="each_input">
                <textarea v-model="message" placeholder="YOUR MESSAGE" rows="5" id="message" ref="message"></textarea>
                <div class="valid" v-if="messageValid" @click="clearFocus(5)">* Please input your message</div>
              </div>
              <input type="hidden" id="formEmail" name="email">
              <input type="hidden" id="formMessage" name="message">
              <div class="submit">
                <div class="submit_btn" id="submitForm" @click="submit()">{{submitTxt}}</div>
              </div>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

    export default {
        name: "contactInfo",
        data() {
            return {
                submitTxt:"SUBMIT",
                name:'',
                nameValid:false,
                email:'',
                emailValid:false,
                phone:'',
                phoneValid:false,
                subject:'',
                subjectValid:false,
                message:'',
                messageValid:false
            }
        },
        created() {
        },
        methods: {
            submit(){
                if(!this.name){
                    this.nameValid = true;
                    setTimeout(()=>{
                        this.clearFocus(1)
                    },3000)
                }
                else if(!this.email){
                    this.emailValid = true;
                    setTimeout(()=>{
                        this.clearFocus(2)
                    },3000)
                }
                else if(!this.phone){
                    this.phoneValid = true;
                    setTimeout(()=>{
                        this.clearFocus(3)
                    },3000)
                }
                else if(!this.subject){
                    this.subjectValid = true;
                    setTimeout(()=>{
                        this.clearFocus(4)
                    },3000)
                }
                else if(!this.message){
                    this.messageValid = true;
                    setTimeout(()=>{
                        this.clearFocus(5)
                    },3000)
                }
                else{
                    this.submitTxt = "SUBMITTING...";
                    $(".submit").addClass("submitting");
                    $(".submit .submit_btn").attr("disabled", "disabled");
                    this.sendEmail();
                    setTimeout(()=>{
                        this.submitTxt = "SUBMIT";
                        $(".submit").removeClass("submitting");
                        $(".submit .submit_btn").removeAttr("disabled");
                    },3000)
                }
            },
            clearFocus(e){
                let validIndex = e;
                switch (validIndex) {
                  case 1:
                      this.nameValid = false;
                      this.$refs.name.focus();
                      break;
                  case 2:
                      this.emailValid = false;
                      this.$refs.email.focus();
                      break;
                  case 3:
                      this.phoneValid = false;
                      this.$refs.phone.focus();
                      break;
                  case 4:
                      this.subjectValid = false;
                      this.$refs.subject.focus();
                      break;
                  case 5:
                      this.messageValid = false;
                      this.$refs.message.focus();
                      break;
                  default:
                      this.nameValid = false;
                      this.$refs.name.focus();
                      break;
                }
            },
            sendEmail(){
                //在Vue项目中，用户在高频率点击按钮时，会发送多个邮件 所以要用到节流，使用节流Throttle
                //后续增加
                // 。
                let html =  "<h2>Name: </h2>" + this.name + '<br> ' +  // html 内容
                '<h2>Email Address: </h2>' + this.email + '<br> ' +
                '<h2>Telephone Number: </h2>' + this.phone + '<br> ' +
                '<h2>Subject: </h2>' + this.subject + '<br> ' +
                '<h2>Message: </h2>' + this.message + '<br> ';
                $("#formEmail").val(this.email);
                $("#formMessage").val(html);
                var form = document.getElementById("sendEmail");
                var url = 'https://formspree.io/f/mjvpedkw';
                var data = new FormData(form);
                this.$ajax.post(url, data).then(this.getEmailSucc)
                    .catch(function (res) {
                        console.log("error:" + res)
                    })
                /*let finalObj = {};
                let messageObj = {};
                messageObj['Subject'] = "Xin's Website Message:: " + this.subject;
                let messageBodyObj = {};
                messageBodyObj["ContentType"] = "Text",
                messageBodyObj["Content"] = this.message;
                messageObj['Body'] =messageBodyObj;
                messageObj['ToRecipients'] =[{'EmailAddress': {"Address": "ningxin1007@hotmail.com"}}];
                finalObj['Message'] = messageObj;
                console.log(finalObj )
                console.log(JSON.stringify(finalObj) )*/
            },

            getEmailSucc(res){
                console.log(res);
            }
        },
    }
</script>

<style scoped lang="stylus">
.contactInfo
  background #eeeeee
  .contactInfo_wrapper
    width 12rem
    padding .2rem .15rem
    margin auto

    h1.top_title
      font-size .4rem
      color #333
      margin-top .2rem
    .top_subtitle
      font-size .2rem
      color #999
      line-height: .4rem;

    .contact_body
      margin .4rem auto
      .left, .right
        float left
        width 50%
        .left_wrapper,.right_wrapper
          width 4rem
          margin auto
        .info_title
          .title_wrapper
            margin auto auto .2rem auto
            .num, .contactWay
              float left

            .num
              font-size .6rem
              font-weight bold
              line-height .6rem
            .num:after
              content "/"
              position: relative;
              top -.07rem
            .contactWay
              font-size .3rem
              line-height .3rem
          .info_content
            .each_input
              position relative
              width 4rem
              margin auto auto .2rem auto
              border 1px solid #999
              input
                width 100%
                height .5rem
                padding 0 .15rem
              .valid
                /*display none*/
                text-align left
                color red
                width 3.8rem
                height .48rem
                line-height .48rem
                padding 0 .15rem
                background #FFF
                position: absolute
                top .01rem
                left .01rem
              textarea
                width 100%
                padding .15rem
            .submit
              width 4rem
              height .5rem
              line-height .5rem
              margin auto
              background #F5A72C
              cursor: pointer;
              color #FFF
              font-size .20rem
              font-weight bold
            .submit:hover
              background #f89904
            .submit.submitting
              background #999
              pointer-events none


        .contact_intro
          width 4rem
          margin 0 auto
          text-align left
          color #333
          font-size .14rem
          line-height: .2rem;
        .contact_intro2
          margin-bottom .2rem
        .each_method
          width: 4rem;
          margin: auto auto 0.2rem auto;
          text-align left
          *
            color #333
          .icon_phone
            background url('/image/contact/icon_phone.png')
            width .4rem!important
            height .4rem!important
            margin-left .03rem
          .icon_email
            background url('/image/contact/icon_email.png')
          .icon_linkedin
            background url('/image/footer/icon_linkedin.png')
          .icon_facebook
            background url('/image/footer/icon_facebook.png')
          .icon
            display: inline-block;
            background-size: contain!important;
            background-repeat: no-repeat!important;
            width: .45rem
            height: .45rem
            float left
          .each_content
            float left
            line-height .45rem
            padding 0 .1rem
            font-size .18rem
        .each_method:hover
          *
            color #f89904
          .icon_phone
            background url('/image/contact/icon_phone_hover.png')
          .icon_email
            background url('/image/contact/icon_email_hover.png')
          .icon_linkedin
            background url('/image/footer/icon_linkedin_hover.png')
          .icon_facebook
            background url('/image/footer/icon_facebook_hover.png')
/* 通用 */
::-webkit-input-placeholder {font-weight:bold; color:#999; }
::-moz-placeholder {font-weight:bold; color:#999;} /* firefox 19+ */
:-ms-input-placeholder {font-weight:bold; color:#999; } /* ie */
:：-moz-placeholder { font-weight:bold; color:#999;}
:-moz-placeholder { font-weight:bold; color:#999;}
</style>
