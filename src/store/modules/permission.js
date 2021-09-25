// import { asyncRoutes, constantRoutes } from '@/router'
import { constantRoutes } from '@/router'
import { getMenu } from '@/api/user'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

function convertRouter(asyncRoutes) {
  return asyncRoutes.map((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = (resolve) => require(['@/layout'], resolve)
      } else if (route.component === 'EmptyLayout') {
        // console.log(route, 1)
        route.component = (resolve) =>
          require(['@/layout/EmptyLayout'], resolve)
      } else {
        // console.log(route, 2)
        const index = route.component.indexOf('views')
        const path =
          index > 0 ? route.component.slice(index) : `views/${route.component}`

        route.component = (resolve) => require([`@/${path}`], resolve)
        // route.component = (resolve) => require(['@/views/analysis/sun/index'], resolve)
      }
    }
    if (route.children && route.children.length) { route.children = convertRouter(route.children) }
    if (!route.children) delete route.children
    if (route.children && route.children.length === 0) delete route.children
    return route
  })
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      getMenu().then((res) => {
        var meunData = res.data
        var accessedRoutes = convertRouter(meunData)
        accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
