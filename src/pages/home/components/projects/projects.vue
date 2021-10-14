<template>
  <div class='project_wrapper'>
    <div class='project_hook'>
      <div class='left_tab'>
        <ul class='tab_list'>
          <li class='each_list'
              @mouseenter='showCurrent(1)'
              :class='{acive_tab:currentListIndex===1}'>
            <p class='each_title'>{{ $t('PROJECT1.title') }}</p>
            <ul class='each_responsibility'>
              <li class='responsibility_li'>{{ $t('PROJECT1.responsibility[0]') }}</li>
              <li class='responsibility_li'>{{ $t('PROJECT1.responsibility[1]') }}</li>
              <li class='responsibility_li'>{{ $t('PROJECT1.responsibility[2]') }}</li>
            </ul>
          </li>
          <li class='each_list'
              @mouseenter='showCurrent(2)'
              :class='{acive_tab:currentListIndex===2}'>
            <p class='each_title'>{{ $t('PROJECT2.title') }}</p>
            <ul class='each_responsibility'>
              <li class='responsibility_li'>{{ $t('PROJECT2.responsibility[0]') }}</li>
              <li class='responsibility_li'>{{ $t('PROJECT2.responsibility[1]') }}</li>
              <li class='responsibility_li'>{{ $t('PROJECT2.responsibility[2]') }}</li>
            </ul>
          </li>
          <li class='each_list'
              @mouseenter='showCurrent(3)'
              :class='{acive_tab:currentListIndex===3}'>
            <p class='each_title'>{{ $t('EDUCATION.title') }}</p>
            <ul class='each_responsibility'>
              <li class='responsibility_li'>{{ $t('EDUCATION.responsibility[0]') }}</li>
              <li class='responsibility_li no_style'>{{ $t('EDUCATION.responsibility[1]') }}</li>
              <li class='responsibility_li no_style'>{{ $t('EDUCATION.responsibility[2]') }}</li>
              <li class='responsibility_li no_style'>{{ $t('EDUCATION.responsibility[3]') }}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class='right_content'>
        <div class='each_content' v-show='currentListIndex===1'>
          <ul class='each_content_list only_one_item'>
            <li class='item_1'>
              <a href='https://mall.gwm.co.th/' target='_blank'>
                <div class='each_content' v-show='currentListIndex===1'>
                  <img v-lazy="'/image/home/greatWall.jpg'" alt=''>
                  <div class='intro_wrapper'>
                    <h4 class='tit'>{{ $t('PROJECT1.childList[0].title') }}</h4>
                    <p class='txt'><a href='https://mall.gwm.co.th'>{{ $t('PROJECT1.childList[0].txt[0]')
                      }}</a>
                    </p> <p class='txt'><a href='https://mall.gwm.co.th/orderVehicles'>{{ $t('PROJECT1.childList[0].txt[1]')
                      }}</a>
                    </p>
                    <i class='iconfont icon_arrow'>&#xe61f;</i>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class='each_content' v-show='currentListIndex===2'>
          <ul class='each_content_list'>
            <li class='item_1'>
              <a href='https://www.import-express.com/' target='_blank'>
                <img v-lazy="'/image/home/last_work4.jpg'" alt=''>
                <div class='intro_wrapper'>
                  <h4 class='tit'>{{ $t('PROJECT2.childList[0].title') }}</h4>
                  <p class='txt'><a href='https://www.import-express.com/'>{{ $t('PROJECT2.childList[0].txt[0]') }}</a>
                  </p>
                  <p class='txt'><a href='https://www.kidscharming.com/'>{{ $t('PROJECT2.childList[0].txt[1]') }}</a>
                  </p>
                  <p class='txt'><a href='https://www.petstoreinc.com/'>{{ $t('PROJECT2.childList[0].txt[2]') }}</a></p>
                  <i class='iconfont icon_arrow'>&#xe61f;</i>
                </div>
              </a>
            </li>
            <li class='item_1'>
              <router-link :to="{path:'/projects',query:{jump:'LuggageDecalSplatter'}}">
                <img v-lazy="'/image/home/luggage_decal.jpg'" alt=''>
                <div class='intro_wrapper'>
                  <h4 class='tit'>{{ $t('PROJECT2.childList[1].title') }}</h4>
                  <p class='txt'>{{ $t('PROJECT2.childList[1].txt[0]') }}</p>
                  <p class='txt'>{{ $t('PROJECT2.childList[1].txt[1]') }}</p>
                  <i class='iconfont icon_arrow'>&#xe61f;</i>
                </div>
              </router-link>
            </li>
            <li class='item_3'>
              <router-link :to="{path:'/projects',query:{jump:'MagicBox-AppforChildren'}}">
                <img v-lazy="'/image/home/3dprinting1.jpg'" alt=''>
                <div class='intro_wrapper intro_wrapper4'>
                  <h4 class='tit'>{{ $t('PROJECT2.childList[2].title') }}</h4>
                  <p class='txt'>{{ $t('PROJECT2.childList[2].txt[0]') }}</p>
                  <p class='txt'>{{ $t('PROJECT2.childList[2].txt[1]') }}</p>
                  <i class='iconfont icon_arrow'>&#xe61f;</i>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class='each_content' v-show='currentListIndex===3'>
          <ul class='each_content_list only_two_item'>
            <li class='item_1'>
              <a href='https://www.fairfield.edu' target='_blank'>
                <img v-lazy="'/image/home/FULogo.jpg'" alt=''>
                <div class='intro_wrapper intro_wrapper3'>
                  <h4 class='tit'>{{ $t('EDUCATION.childList[0].title') }}</h4>
                  <p class='txt'>{{ $t('EDUCATION.childList[0].txt[0]') }}</p>
                  <p class='txt'>{{ $t('EDUCATION.childList[0].txt[1]') }}</p>
                  <p class='txt'>{{ $t('EDUCATION.childList[0].txt[2]') }}</p>
                  <i class='iconfont icon_arrow'>&#xe61f;</i>
                </div>
              </a>
            </li>
            <li class='item_2'>
              <a href='http://gjjl.hkc.edu.cn/' target='_blank'>
                <img v-lazy="'/image/home/hkc.jpg'" alt=''>
                <div class='intro_wrapper intro_wrapper3'>
                  <h4 class='tit'>{{ $t('EDUCATION.childList[1].title') }}</h4>
                  <p class='txt'>{{ $t('EDUCATION.childList[1].txt[0]') }}</p>
                  <p class='txt'>{{ $t('EDUCATION.childList[1].txt[1]') }}</p>
                  <p class='txt'>{{ $t('EDUCATION.childList[1].txt[2]') }}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projects',
  data() {
    return {
      currentListIndex: 1
    }
  },
  methods: {
    showCurrent(showIndex) {
      this.currentListIndex = showIndex
    }
  }
}
</script>

<style scoped lang='stylus'>
.project_wrapper
  width: 100%;
  height: 780px;
  background: #1b1f25;
  margin-bottom: 84px;

  .project_hook
    width: 1440px;
    height: 780px;
    margin: 0px auto;
    cursor pointer

    .left_tab
      width: 36%;
      height: 100%;
      float: left;

      .tab_list
        height: 100%;

        li.each_list.acive_tab
          opacity: 1;

          .each_title:after
            opacity: 1;
            transform: translate(0px, 0px);

          .each_title
            margin-left -28%

          .each_responsibility
            margin-left -28%

        li.each_list
          height: 33.3%;
          opacity: 0.4;
          position: relative;
          text-align left

          .each_title
            font-size: 30px;
            color: #fff;
            position: absolute;
            left: 50%;
            margin-left: -32%;
            top: 50%;
            margin-top: -15%;
            transition: margin-left 0.3s ease-out;
            right: 32px;

          .each_title:after
            display: block;
            content: "";
            height: 40px;
            width: 6px;
            background: #1e52d8;
            position: absolute;
            left: 50%;
            margin-left: -62%;
            top: -15%;
            opacity: 0;
            transform: translate(-20px, 0px);
            transition: opacity 0.3s ease-out, transform 0.3s ease-out;

          .each_responsibility
            display: block;
            font-size: 16px;
            color: #fff;
            position: absolute;
            left: 50%;
            margin-left: -32%;
            top: 50%;
            margin-top: 0%;
            transition: margin-left 0.3s ease-out;
            right: 30px;
            line-height: 25px;
            list-style: initial;
            max-width: 374px;

            .no_style
              list-style-type none

    .right_content *
      text-align left

    .right_content
      width: 64%;
      height: 780px;
      margin-left: 36%;
      overflow: hidden;

      .each_content
        width: 100%;
        height: 100%;

        .each_content_list
          width: 100%;
          height: 100%;

          li:hover
            .intro_wrapper
              .tit
                margin-top: 75px;

              .txt
                opacity: 1;
                transform: translate(0px, 0);
                transition: margin-left 0.3s ease-out;

              .icon_arrow
                opacity: 1;
                animation: a_arrow_r 0.2s linear forwards;

            .intro_wrapper2
              .tit
                margin-top: 68px;

              .icon_arrow
                top 66px

            .intro_wrapper3
              .tit
                margin-top: 80px;

              .icon_arrow
                top 80px

            .intro_wrapper4
              .tit
                margin-top: 80px;

              .icon_arrow
                opacity: 1;
                animation: a_arrow_r2 0.2s linear forwards;

          li.item_3
            width: 100%;
            float: left;
            height: 50%;

          li
            width: 50%;
            float: left;
            height: 50%;
            overflow hidden
            position relative

            img
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              max-width: 100%;
              max-height: 100%;

            .intro_wrapper
              width: 100%;
              height: 50%;
              position: absolute;
              left: 0px;
              bottom: 0px;
              background: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));

              .tit
                margin-left: 43px;
                margin-top: 119px;
                font-size: 24px;
                font-weight bold
                color: #fff;
                transition: margin-top 0.3s ease-out;

              .txt
                margin-left: 43px;
                margin-top: 9px;
                line-height: 1;
                font-size: 16px;
                color: #fff;
                opacity: 0;
                transform: translate(0px, 15px);
                transition: opacity 0.3s ease-out;
                font-family: 'TencentSansw3';
                margin-right: 43px;

                a
                  color: #fff;

              .icon_arrow
                position: absolute;
                right: 40px;
                top: 75px;
                font-size: 40px;
                color: #fff;
                opacity: 0;
                transition: all 0.3s ease-out;
                background-size: 100% 100%;

              .txt:hover
                a
                  text-decoration underline

            .intro_wrapper3
              .tit
                margin-top: 145px;

              .icon_arrow
                top 137px

        .each_content_list.only_one_item
          li
            width 100%
            height 100%
            .intro_wrapper
              height: 25%;
        .each_content_list.only_two_item
          height: 50%;
          margin auto
          position relative
          top 50%
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);

          li
            height 100%

@keyframes a_arrow_r {
  0% {
    opacity: 0;
    right: 60px;
  }
  100% {
    opacity: 1;
    right: 20px;
  }
}

@keyframes a_arrow_r2 {
  0% {
    opacity: 0;
    left: 240px;
  }
  100% {
    opacity: 1;
    left: 300px;
  }
}
</style>
