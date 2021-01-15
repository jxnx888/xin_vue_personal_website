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
    component: () => import('@/common/threejs/luggageDecalSplatter/decals'),
    meta: {
      keepAlive: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'   //去除url #
})

export default router
