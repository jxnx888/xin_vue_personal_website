import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/home'),
    meta: {
      keepAlive: true
    }
  },
 /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  },*/
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/pages/projects/projects'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('@/pages/skills/skills'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/aboutme',
    name: 'Aboutme',
    component: () => import('@/pages/aboutme/aboutme'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/contact/contact'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/threejs',
    name: 'threejs',
    // component: () => import('@/common/threejs/luggageDecalSplatter/decals'),
    component: () => import('@/common/threejs/threeDBuilder/ThreeDimensionalBuilder'),
    meta: {
      keepAlive: true
    }
  }
]
//表示页面跳转的时候，新页面始终是在顶部
// eslint-disable-next-line no-unused-vars
const scrollBehavior = function (to, from, savedPosition) {
  if (to.hash) {
    return {
      // 通过 to.hash 的值來找到对应的元素
      selector: to.hash
    }
  }
  else{
    return {x:0, y:0}
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior,
  mode: 'history'   //去除url #
})

export default router
