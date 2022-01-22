<template>

  <div :class="`contactInfo contactInfo-${$root.$userAgent}`">
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
        <div class="contact_intro">{{$t('contact.getInTouch[0]')}}</div>
        <div class="contact_intro contact_intro2">{{$t('contact.getInTouch[1]')}}</div>
        <div class="each_method clearfix">
          <a href="tel:+86 18535424777">
          <div class="icon icon_phone"></div>
           <div class="each_content">+86 18535424777</div>
          </a>
        </div>
        <div class="each_method clearfix">
          <a href="mailto:ningxin1007@hotmail.com">
          <div class="icon icon_email"></div>
           <div class="each_content">ningxin1007@hotmail.com</div>
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
                <input type="text" v-model="name" :placeholder="$t('contact.message[0]')" id="name" ref="name" name="name">
                <div class="valid" v-if="nameValid" @click="clearFocus(1)">{{$t('contact.validation[0]')}}</div>
              </div>
              <div class="each_input">
                <input type="text" v-model="email" :placeholder="$t('contact.message[1]')" id="email" ref="email" name="email">
                <div class="valid" v-if="emailValid" @click="clearFocus(2)">{{$t('contact.validation[1]')}}</div>
                <div class="valid" v-if="emailRegexValid" @click="clearFocus(6)">{{$t('contact.validation[2]')}}</div>
              </div>
              <div class="each_input">
                <input type="number" v-model="phone" :placeholder="$t('contact.message[2]')" id="phone" ref="phone" name="phone">
                <div class="valid" v-if="phoneValid" @click="clearFocus(3)">{{$t('contact.validation[3]')}}</div>
              </div>
              <div class="each_input">
                <input type="text" v-model="subject" :placeholder="$t('contact.message[3]')" id="subject" ref="subject">
                <div class="valid" v-if="subjectValid" @click="clearFocus(4)">{{$t('contact.validation[4]')}}</div>
              </div>
              <div class="each_input">
                <textarea v-model="message" :placeholder="$t('contact.message[4]')" rows="5" id="message" ref="message"></textarea>
                <div class="valid" v-if="messageValid" @click="clearFocus(5)">{{$t('contact.validation[5]')}}</div>
              </div>
              <input type="hidden" id="formEmail" name="email">
              <input type="hidden" id="formMessage" name="message">
              <div class="submit">
                <div class="submit_btn" id="submitForm" @click="submit()">{{submitTxt}}</div>
                <div class="valid" v-if="submitFailed">{{$t('contact.validation[6]')}}</div>
                <div class="valid valid_succ" v-if="submitSucc">{{$t('contact.validation[7]')}}</div>

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
    import {Email} from './js/smtp.js'
    export default {
        name: "contactInfo",
        data() {
            return {
                submitTxt:"SUBMIT",
                name:'',
                nameValid:false,
                email:'',
                emailValid:false,
                emailRegexValid:false,
                phone:'',
                phoneValid:false,
                subject:'',
                subjectValid:false,
                message:'',
                messageValid:false,
                submitFailed:false,
                submitSucc:false,
                smtpServer:'smtp.elasticemail.com', //port 2525
                qqEmail:'jxnx888@gmail.com',
                qqPs:'7C004C30FE0FF7028912F92D95E2CDF9037E',
                emailTitle:'Xin Ning :: Personal Website--contect form',
                validTimeOut:null,
            }
        },
        created() {
        },
        methods: {
            submit(){
                clearTimeout(this.validTimeOut);
                if(!this.name){
                    this.nameValid = true;
                    this.validTimeOut = setTimeout(()=>{
                        this.clearFocus(1)
                    },3000)
                }
                else if(!this.email){
                    this.emailValid = true;
                    this.validTimeOut = setTimeout(()=>{
                        this.clearFocus(2)
                    },3000)
                }
                else{
                  const emailRegex = this.checkRegex(0);
                  if(emailRegex){
                      if(!this.phone){
                          this.phoneValid = true;
                          this.validTimeOut = setTimeout(()=>{
                              this.clearFocus(3)
                          },3000)
                      }
                      else{
                          if(!this.subject){
                              this.subjectValid = true;
                              this.validTimeOut = setTimeout(()=>{
                                  this.clearFocus(4)
                              },3000)
                          }
                          else if(!this.message){
                              this.messageValid = true;
                              this.validTimeOut = setTimeout(()=>{
                                  this.clearFocus(5)
                              },3000)
                          }
                          else{
                              this.submitTxt = "SUBMITTING...";
                              if('zh_cn' == this.$i18n.locale){this.submitTxt = "提交中..."}
                              $(".submit").addClass("submitting");
                              $(".submit .submit_btn").attr("disabled", "disabled");
                              this.sendEmail();
                          }
                      }
                  }
                  else{
                      return
                  }
                }
            },
            checkRegex(type){
                var returnVal = true;
                if(0==type) {
                    var re = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                    if (!re.test(this.email)) {  //输入为空、输入不符合邮箱格式此正则都能判断
                        this.emailRegexValid = true;
                        setTimeout(()=>{
                            this.clearFocus(6)
                        },3000)
                        returnVal = false;
                    }
                }

                return returnVal
            },
            clearFocus(e){
                clearTimeout(this.validTimeOut);
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
                  case 6:
                      this.emailRegexValid = false;
                      this.$refs.email.focus();
                      break;
                  default:
                      this.nameValid = false;
                      this.$refs.name.focus();
                      break;
                }
            },
            sendEmail(){
                const webContent =  "<h2>Name: </h2>" + this.name + '<br> ' +  // html 内容
                    '<h2>Email Address: </h2>' + this.email + '<br> ' +
                    '<h2>Telephone Number: </h2>' + this.phone + '<br> ' +
                    '<h2>Subject: </h2>' + this.subject + '<br> ' +
                    '<h2>Message: </h2>' + this.message + '<br> ';
                //https://www.smtpjs.com/
                Email.send({
                    Host : this.smtpServer,
                    Username : this.qqEmail,
                    Password : this.qqPs,
                    To : 'ningxin1007@hotmail.com',
                    From : this.qqEmail,
                    Subject : this.emailTitle,
                    Body : webContent

                }).then(
                    message => this.getEmailSucc(message)
                );
            },

            getEmailSucc(res){
                if('OK' == res){
                  this.submitSucc = true;
                  this.clearForm();
                }
                else{
                  this.submitFailed = true;
                }
                this.submitTxt = "SUBMIT";
                if('zh_cn' == this.$i18n.locale){this.submitTxt = "提交"}
                $(".submit").removeClass("submitting");
                $(".submit .submit_btn").removeAttr("disabled");
                setTimeout(()=>{this.submitSucc = false;this.submitFailed = false;},5000)
                console.log(res);
            },
            clearForm(){
                this.name = '';
                this.email = '';
                this.phone = '';
                this.subject = '';
                this.message = '';
            }
        },
        mounted() {
            if('zh_cn' == this.$i18n.locale){this.submitTxt = "提交"}
        }
    }
</script>

<style scoped lang="stylus">
.contactInfo
  background #eeeeee
  .contactInfo_wrapper
    max-width 12rem
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
          max-width 4rem
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
              max-width 4rem
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
              .valid
                text-align left
                color red
                width 3.8rem
                height .48rem
                line-height .48rem
                font-size .12rem
              .valid.valid_succ
                color #4aba92
            .submit:hover
              background #f89904
            .submit.submitting
              background #999
              pointer-events none


        .contact_intro
          max-width 4rem
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

.contactInfo-pad
  .contactInfo_wrapper
    .top_title
      font-size .3rem
    .contact_body
      .num
        font-size .4rem!important
        line-height .4rem!important
      .contactWay
        font-size .2rem!important
        line-height .2rem!important
      .submit
        width 100%!important
.contactInfo-phone
  .contactInfo_wrapper
    .top_title
      font-size .2rem!important
    .top_subtitle
      font-size .16rem!important
    .contact_body
      .left, .right
        float none
        width 100%
        .info_title
          text-align center
      .title_wrapper
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
      .num
        font-size .4rem!important
        line-height .4rem!important
        float none!important
      .contactWay
        font-size .2rem!important
        line-height .2rem!important
        float none!important
      .submit
        width 100%!important


/* 通用 */
::-webkit-input-placeholder {font-weight:bold; color:#999; }
::-moz-placeholder {font-weight:bold; color:#999;} /* firefox 19+ */
:-ms-input-placeholder {font-weight:bold; color:#999; } /* ie */
:：-moz-placeholder { font-weight:bold; color:#999;}
:-moz-placeholder { font-weight:bold; color:#999;}
</style>
