import {
  constantRouterMap
} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.name) {
    return roles.some(role => route.name.indexOf(role) >= 0);
  } else {
    // if(route.children){
    //   // this.hasPermission(roles,route.children)
    // }
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户页面权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(constantRouterMap, roles) {
  /**
   * @param {Array} constantRouterMap 原来所有的路由表
   * @param {Array} roles  可以访问的规则
   *
   * */
  const constantRouters = constantRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return constantRouters;
}

const permission = {
  state: {
    routers:[]
    // routers: constantRouterMap,
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          roles
        } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          // 如果为管理员全部权限
          accessedRouters = constantRouterMap
        } else {
          // 如果不为管理员
          accessedRouters = filterAsyncRouter(constantRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
