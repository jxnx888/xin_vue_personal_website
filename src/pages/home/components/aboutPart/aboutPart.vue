<template>
  <div class="aboutPart">
    <div class="top_intro">
      <p>{{ $t('home.welcome[0]') }}</p>
      <p>{{ $t('home.welcome[1]') }}</p>
      <p>{{ $t('home.welcome[2]') }}
        <a href="mailto:jxnx888@hotmail.com">jxnx888@hotmail.com</a>,</p>
      <p>{{ $t('home.welcome[3]') }}</p>
    </div>
    <div class="bottom_list">
      <ul class="detail_list clearfix">
        <li>
          <router-link  to="/aboutme" class="each_link">
            <p>{{ $t('home.aboutme') }}</p>
            <img src="/image/home/aboutme1.jpg" alt="">
          </router-link>
        </li>
        <li>
          <router-link  to="/projects" class="each_link">
            <p>{{ $t('home.myprojects') }}</p>
            <img src="/image/home/myprojects.jpg" alt="">
          </router-link>
        </li>

        <li class="last">
          <router-link  to="/skills" class="each_link">
            <p>{{ $t('home.myskills') }}</p>
            <img src="/image/home/myskills.jpg" alt="">
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutPart",

}
</script>

<style scoped lang="stylus">
.aboutPart
  .top_intro
    width: 1200px;
    margin: auto;
    text-align: center;
    font-size: 24px;
    color: #5f6464;
    line-height: 54px;
    padding: 105px 0 74px;
  .bottom_list
    width: 1240px;
    margin: 0px auto 84px auto;
    height: 250px;
    .detail_list
      li
        display: inline-block;
        float: left;
        height: 250px;
        width: 400px;
        text-align: center;
        margin-right: 20px;
        position: relative;
        overflow: hidden;
        .each_link
          p
            display: block;
            float: left;
            font-size: 30px;
            font-weight bold
            height: 40px;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -20px;
            z-index: 3;
            color: #fff;
            border-bottom: 1px solid rgba(255,255,255,0);
            transform: translate(-50%,0);
            padding-bottom: 3px;
            transition: border-bottom 0.3s ease-out;
            padding-bottom: 5px;
            -webkit-transition: width 1s linear;
          p:after
            content: ' ';
            width: 0;
            height: 2px;
            background: #fff;
            bottom: 8px;
            left: 0;
            position: absolute;
            opacity: 0;
            -webkit-transition: all 0.2s linear;
          img
            display: block;
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0px;
            top: 0px;
            z-index: 1;
            transform: scale(1);
            transition: transform 0.3s ease-out;
        .each_link:after
          display: block;
          content: "";
          height: 100%;
          width: 100%;
          background: rgba(0,82,217,0.7);
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.3s ease-out;
        .each_link:hover:after
          opacity: 1;
        .each_link:hover img
          transform: scale(1.024);
        .each_link:hover p:after
          opacity: 1;
          left: 0;
          width: 100%;
      li.last
        margin-right 0
</style>
