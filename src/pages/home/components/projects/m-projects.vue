<template>
  <div :class='`project_wrapper project_wrapper-${$root.$userAgent}`'>
    <swiper
      class="swiper"
      ref="mySwiper"
      :options="swiperOption"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true"
    >
      <swiper-slide
        v-for='(item, index) in projects'
        :key='index'
        class='project-swiper'
      >
        <div class='top-info'>
          <p class='each_title'>{{ item.name }}</p>
          <ul class='each_responsibility'>
            <li
              class='responsibility_li'
              v-for='(childItem, key) in item.responsibility'
              :key='key'
            >{{ childItem }}
            </li>
          </ul>
        </div>
        <div class='each_content'>
          <ul :class='`each_content_list only-${item.infoCount}-item`'>
            <li
              v-for='(subProItem, subProIndex) in item.subProjects'
              :key='subProIndex'
              :class='`each-project item_${subProIndex+1}`'
            >
              <router-link
                v-if='subProItem.routePath'
                :to='subProItem.routePath'
              >
                <img :src='subProItem.img' alt='' class="swiper-lazy">
                <div
                  class='intro_wrapper swiper-lazy'>
                  <h4 class='tit'>{{ subProItem.title }}</h4>
                  <p
                    class='txt'
                    v-for='(subProCenItem, subProCenIndex) in subProItem.content'
                    :key='subProCenIndex'
                  >
                    <a :href='subProCenItem.link ? subProCenItem.link : ""' target='_blank'>{{ subProCenItem.txt }}</a>
                  </p>
                </div>
              </router-link>
              <div v-else>
                <img :src='subProItem.img' alt='' class="swiper-lazy">
                <div
                  class='intro_wrapper swiper-lazy'>
                  <h4 class='tit'>{{ subProItem.title }}</h4>
                  <p
                    class='txt'
                    v-for='(subProCenItem, subProCenIndex) in subProItem.content'
                    :key='subProCenIndex'
                  >
                    <a :href='subProCenItem.link ? subProCenItem.link : ""' target='_blank'>{{ subProCenItem.txt }}</a>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>

      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class='swiper-pagination' slot='pagination'></div>
    </swiper>

  </div>
</template>

<script>

export default {
  name: 'projects',
  data() {
    return {
      currentListIndex: 1,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          // clickable: true,
          type: "progressbar", // bullets fraction progressbar
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        observeParents: true,
        observer: true,
        loop: true,
        lazy: true,
        // autoplay: true,
        speed:1000,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        }
      }
    }
  },
  methods: {
    showCurrent(showIndex) {
      this.currentListIndex = showIndex
    },
    handleGalleryClick() {

    }
  },
  computed: {
    projects() {
      return [
        {
          infoCount: 1,
          name: this.$t('PROJECT1.title'),
          responsibility: [
            this.$t('PROJECT1.responsibility[0]'),
            this.$t('PROJECT1.responsibility[1]'),
            this.$t('PROJECT1.responsibility[2]')
          ],
          subProjects: [{
            title: this.$t('PROJECT1.childList[0].title'),
            img: '/image/home/greatWall.jpg',
            link: 'https://mall.gwm.co.th/',
            content: [
              {
                txt: this.$t('PROJECT1.childList[0].txt[0]'),
                link: 'https://mall.gwm.co.th'
              }, {
                txt: this.$t('PROJECT1.childList[0].txt[1]'),
                link: 'https://mall.gwm.co.th/orderVehicles'
              }
            ]
          }
          ]
        }, {
          infoCount: 3,
          name: this.$t('PROJECT2.title'),
          responsibility: [
            this.$t('PROJECT1.responsibility[0]'),
            this.$t('PROJECT1.responsibility[1]'),
            this.$t('PROJECT1.responsibility[2]')
          ],
          subProjects: [
            {
              title: this.$t('PROJECT2.childList[0].title'),
              img: '/image/home/last_work4.jpg',
              link: 'https://www.import-express.com/',
              content: [{
                txt: this.$t('PROJECT2.childList[0].txt[0]'),
                link: 'https://www.import-express.com/'
              }, {
                txt: this.$t('PROJECT2.childList[0].txt[1]'),
                link: 'https://www.kidscharming.com'
              }, {
                txt: this.$t('PROJECT2.childList[0].txt[2]'),
                link: 'https://www.petstoreinc.com/'
              }]
            }, {
              title: this.$t('PROJECT2.childList[1].title'),
              img: '/image/home/luggage_decal.jpg',
              routePath: {path:'/projects',query:{jump:'LuggageDecalSplatter'}},
              content: [{
                txt: this.$t('PROJECT2.childList[1].txt[0]'),
                link: null
              }, {
                txt: this.$t('PROJECT2.childList[1].txt[1]'),
                link: null
              }]
            }, {
              title: this.$t('PROJECT2.childList[2].title'),
              img: '/image/home/3dprinting1.jpg',
              link: 'https://www.import-express.com/',
              routePath: { path: '/projects', query: { jump: 'MagicBox-AppforChildren' } },
              content: [{
                txt: this.$t('PROJECT2.childList[2].txt[0]'),
                link: null
              }, {
                txt: this.$t('PROJECT2.childList[2].txt[1]'),
                link: null
              }]
            }]
        }, {
          infoCount: 2,
          name: this.$t('EDUCATION.title'),
          responsibility: [
            this.$t('EDUCATION.responsibility[0]'),
            this.$t('EDUCATION.responsibility[1]'),
            this.$t('EDUCATION.responsibility[2]'),
            this.$t('EDUCATION.responsibility[3]')
          ],
          subProjects: [
            {
              title: this.$t('EDUCATION.childList[0].title'),
              img: '/image/home/FULogo.jpg',
              link: 'https://www.fairfield.edu/',
              content: [{
                txt: this.$t('EDUCATION.childList[0].txt[0]'),
                link: null
              }, {
                txt: this.$t('EDUCATION.childList[0].txt[1]'),
                link: null
              }, {
                txt: this.$t('EDUCATION.childList[0].txt[2]'),
                link: null
              }]
            }, {
              title: this.$t('EDUCATION.childList[1].title'),
              img: '/image/home/hkc.jpg',
              link: 'http://gjjl.hkc.edu.cn/',
              content: [{
                txt: this.$t('EDUCATION.childList[1].txt[0]'),
                link: null
              }, {
                txt: this.$t(('EDUCATION.childList[1].txt[1]')),
                link: null
              }, {
                txt: this.$t(('EDUCATION.childList[1].txt[2]')),
                link: null
              }]
            }]
        }
      ]
    }
  }
}
</script>

<style scoped lang='stylus'>
.project_wrapper >>> .swiper-button-prev::after, .project_wrapper >>> .swiper-button-next::after
  font-size .2rem

projectHeight = 60vh
.project_wrapper
  width: 100%;
  height: projectHeight;
  background: #1b1f25;
  margin-bottom: 84px;
  overflow hidden
  .top-info
    color #fff
    line-height: .2rem;
    min-height (projectHeight / 3)
    .each_title
      font-size .25rm
      padding .1rem 0
    .each_responsibility
      font-size .15rem
      list-style: disc;
      text-align: left;
      list-style-position: inside;
      padding 0 .15rem
  .each_content
    position: relative;
    max-height (projectHeight - (projectHeight / 3))
    min-height (projectHeight - projectHeight / 2.7)
    .each_content_list
      display: flex;
      align-content: center;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      margin: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      .each-project
        position: relative;
        img
          //width 100%
          max-height (projectHeight - (projectHeight / 3))
          max-width: 100%;
        .intro_wrapper
          position: absolute;
          bottom .2rem
          left .2rem
          & *
            color #fff
            text-align left
            line-height .3rem
          h4
            font-size .2rem
          p
            font-size .15rem
            a
              text-decoration underline
    .each_content_list.only-1-item
      li.each-project
        //width 100%
        //height projectHeight
    .each_content_list.only-2-item
      flex-direction: row;
      flex-wrap: nowrap;
      li.each-project
        *
          font-size .12rem
          line-height: .15rem;
    .each_content_list.only-3-item
      //width 100%
      //height projectHeight
      align-content normal
      li.each-project
        width 50%
        height: 50%;
        & *
          font-size .15rem
          line-height .2rem

      li.each-project:nth-child(2)
        .intro_wrapper
          overflow: hidden;
          display: -webkit-box;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          -webkit-line-clamp: 4;
          line-clamp: 4;
          -webkit-box-orient:vertical;
          white-space:normal ;
      li.each-project:nth-child(2),li.each-project:last-child
        & *
          text-decoration none
        p *
          font-size .12rem
      li.each-project:last-child
        width 100%
        .intro_wrapper
          bottom .4rem

</style>
