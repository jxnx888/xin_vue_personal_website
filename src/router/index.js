import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/home')
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
    component: () => import('@/pages/projects/projects')
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('@/pages/skills/skills')
  },
  {
    path: '/aboutme',
    name: 'Aboutme',
    component: () => import('@/pages/aboutme/aboutme')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/contact/contact')
  },
  {
    path: '/threejs',
    name: 'threejs',
    component: () => import('@/common/threejs/luggageDecalSplatter/decals')
  }
]

const router = new VueRouter({
  routes
})

export default router
