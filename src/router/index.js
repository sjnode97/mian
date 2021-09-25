import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import EmptyLayout from '@/layout/EmptyLayout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  }, {
    path: '/login',
    component: EmptyLayout,
    // component: () => import('@/views/login/index'),
    children: [
      {
        path: '',
        component: () => import('@/views/login/index'),
        name: 'login',
        meta: { title: 'login', icon: 'login', affix: true }
      }
    ],
    hidden: true
  }, {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  }, {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }, {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }, {
    path: '/',
    // component: EmptyLayout,
    redirect: '/operationalAnalysis/performance'
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: () => import('@/views/dashboard/index'),
    //     name: 'Dashboard',
    //     meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    //   }
    // ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  // 404 page must be placed at the end !!!
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { title: '首页', icon: 'dashboard' },
    alwaysShow: false, // 是否显示子元素，没有子元素设置为false
    children: []
  }, {
    path: '/cockpit',
    name: 'cockpit',
    component: () => import('@/views/home/cockpit/index'),
    meta: { title: '驾驶舱', icon: 'international' },
    alwaysShow: false,
    children: []
  }, {
    path: '/index',
    name: 'index',
    component: () => import('@/views/home/index/index'),
    meta: { title: '电站首页', icon: 'international' },
    alwaysShow: false,
    children: []
  }, {
    path: '/documentation',
    name: 'Documentation',
    component: () => import('@/views/documentation/index'),
    meta: { title: 'Documentation', icon: 'documentation' },
    alwaysShow: false,
    children: []
  }, {
    path: '/monitor',
    name: 'monitor',
    component: EmptyLayout,
    meta: { title: '运行监测', icon: 'documentation' },
    alwaysShow: true,
    children: [
      {
        path: 'stationOperation',
        component: () => import('@/views/documentation/index'),
        name: 'stationOperation',
        meta: { title: '电站运行监测', icon: 'documentation' }
      }
    ]
  }, {
    path: '/queryPivot',
    name: 'queryPivot',
    component: EmptyLayout,
    meta: { title: '数据查询', icon: 'documentation' },
    alwaysShow: true,
    redirect: '/queryPivot/main-transformer',
    children: [
      {
        path: 'main-transformer',
        component: () => import('@/views/query-pivot/main-transformer/index'),
        name: 'main-transformer',
        meta: { title: '主变压器', icon: 'documentation' }
      },
      {
        path: 'electrical-circuit',
        component: () => import('@/views/query-pivot/main-transformer/index'),
        name: 'electrical-circuit',
        meta: { title: '集电线路', icon: 'documentation' }
      },
      {
        path: 'inverter',
        component: () => import('@/views/query-pivot/main-transformer/index'),
        name: 'inverter',
        meta: { title: '逆变器', icon: 'documentation' }
      },
      {
        path: 'combiner',
        component: () => import('@/views/query-pivot/main-transformer/index'),
        name: 'combiner',
        meta: { title: '汇流箱', icon: 'documentation' }
      },
      {
        path: 'box-change',
        component: () => import('@/views/query-pivot/main-transformer/index'),
        name: 'box-change',
        meta: { title: '箱变', icon: 'documentation' }
      },
      {
        path: 'environment',
        component: () => import('@/views/query-pivot/environmental/index'),
        name: 'environment',
        meta: { title: '环境', icon: 'documentation' }
      }
    ]
  }, {
    path: '/operationalAnalysis',
    name: 'operationalAnalysis',
    component: EmptyLayout,
    meta: { title: '运营分析', icon: 'documentation' },
    alwaysShow: true,
    children: [
      {
        path: 'performance',
        component: () => import('@/views/analysis/powerStation/index'),
        name: 'performance',
        meta: { title: '电站性能分析', icon: 'documentation' }
      },
      {
        path: 'electricity',
        component: () => import('@/views/analysis/electric/index'),
        name: 'electricity',
        meta: { title: '电量分析', icon: 'documentation' }
      },
      {
        path: 'energy',
        component: () => import('@/views/analysis/energy/index'),
        name: 'energy',
        meta: { title: '能耗分析', icon: 'documentation' }
      },
      {
        path: 'solarEnergy',
        component: () => import('@/views/analysis/sun/index'),
        name: 'solarEnergy',
        meta: { title: '太阳能资源分析', icon: 'documentation' }
      }
    ]
  }, { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  base: './', // 开发以及部署时的URL
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
