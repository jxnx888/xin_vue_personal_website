import Vue from 'vue'
import App from './App.vue'
import router from './router'


//reset styles
import './assets/style/reset.css'
import './assets/style/border.css'

//引用axios传输数据
import axios from 'axios'
axios.defaults.withCredentials =true; //允许请求携带cookie
// 使用axios
Vue.prototype.$ajax = axios;
// Vue.prototype.$http = axios;
axios.defaults.baseURL = '';//配置你的接口请求地址
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;//配置token,看情况使用
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';//配置请求头信息。

// 如果想要发送带json格式参数的请求，则需要使用qs模块来处理参数
import qs from 'qs'
Vue.prototype.$qs = qs;

//项目中实现图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,  //如需测试，改为0.5 屏幕比例
  error: 'dist/error.png',
  loading: '/images/loading.gif', //预加载loading图片  图片在static文件夹，就可以直接写路径了
  // loading: require('/images/loading.gif'), //预加载loading图片 图片在assets文件夹，就需要使用require（）进行引入。
  attempt: 1
});

// 引入轮播图插件库和css
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import  'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */);



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
