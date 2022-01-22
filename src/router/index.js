import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/home'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/pages/projects/projects'),
    meta: {
      keepAlive: true
    },
    // 子路由 需要在负组件中增加     <router-view /> <!--用于子路由渲染-->
    children: [
      {
        path: 'magicBox',
        name: 'MagicBox',
        component: () => import('@/common/threejs/threeDBuilder/ThreeDimensionalBuilder'),
        meta: {
          keepAlive: false
        }
      },
      {
        path: 'luggageDecalSplatter',
        name: 'LuggageDecalSplatter',
        component: () => import('@/common/threejs/luggageDecalSplatter/decals'),
        meta: {
          keepAlive: false
        }
      },
      {
        path: 'forFun',
        name: 'ForFun',
        component: () => import('@/common/forFun/forFun'),
        meta: {
          keepAlive: false
        }
      }
    ]
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
    path: '/blog',
    name: 'Blog',
    component: () => import('@/pages/blog/blog'),
    redirect: '/blog/list',
    meta: {
      keepAlive: true
    },
    // 子路由 需要在负组件中增加     <router-view /> <!--用于子路由渲染-->
    children: [
      {
        path: 'list',
        name: 'BlogList',
        component: () => import('@/pages/blog/components/blogList'),
        meta: {
          keepAlive: false
        }
      }, {
        path: ':id',
        name: 'BlogDetail',
        component: () => import('@/pages/blog/components/blogTem'),
        meta: {
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/threejs',
    name: 'threejs',
    // component: () => import('@/common/threejs/luggageDecalSplatter/decals'),
    component: () => import('@/common/threejs/threeDBuilder/ThreeDimensionalBuilder'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/common/notFound/index'),
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]
//表示页面跳转的时候，新页面始终是在顶部

// eslint-disable-next-line no-unused-vars
const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }
  else if (to.hash) {
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
