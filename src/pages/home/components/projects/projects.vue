<template>
  <div class="project_wrapper">
    <div class="project_hook">
      <div class="left_tab">
        <ul class="tab_list">
          <li class="each_list"
              @mouseenter="showCurrent(1)"
              :class="{acive_tab:currentListIndex===1}">
            <p class="each_title">Latest work</p>
            <ul class="each_responsibility">
              <li class="responsibility_li">Maintain & modify E-commerce webist</li>
              <li class="responsibility_li">Manage front-end develope team</li>
            </ul>
          </li>
          <li class="each_list"
              @mouseenter="showCurrent(2)"
              :class="{acive_tab:currentListIndex===2}">
            <p class="each_title">Android</p>
            <ul class="each_responsibility">
              <li class="responsibility_li">Maintain & modify E-commerce webist</li>
              <li class="responsibility_li">Manage front-end develope team</li>
            </ul>
          </li>
          <li class="each_list"
              @mouseenter="showCurrent(3)"
              :class="{acive_tab:currentListIndex===3}">
            <p class="each_title">Android</p>
            <ul class="each_responsibility">
              <li class="responsibility_li">Maintain & modify E-commerce webist</li>
              <li class="responsibility_li">Manage front-end develope team</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="right_content">
        <div class="each_content" v-if="currentListIndex===1">

        </div>
        <div class="each_content" v-if="currentListIndex===2">456</div>
        <div class="each_content" v-if="currentListIndex===3">789</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "projects",
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

<style scoped lang="stylus">
.project_wrapper
  width: 100%;
  height: 780px;
  background: #1b1f25;
  margin-bottom: 84px;
  .project_hook
    width: 1200px;
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
        li.each_list.acive_tab .each_title:after
          opacity: 1;
          transform: translate(0px,0px);
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
            margin-left: -50%;
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
            transform: translate(-20px,0px);
            transition: opacity 0.3s ease-out,transform 0.3s ease-out;
          .each_responsibility
            display: block;
            font-size: 16px;
            color: #fff;
            position: absolute;
            left: 50%;
            margin-left: -50%;
            top: 50%;
            margin-top: 0%;
            transition: margin-left 0.3s ease-out;
            right: 30px;
            line-height: 25px;
            list-style: inside;
    .right_content
      width: 64%;
      height: 780px;
      margin-left: 36%;
      overflow: hidden;
</style>