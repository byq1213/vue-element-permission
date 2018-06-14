import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
    path: '/login',
    name: 'login',
    component: () =>
      import ('@/views/login/index'),
    hidden: false
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import ('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'index',
      component: () =>
        import ('@/views/dashboard/index')
    }]
  },
  {
    path: '/one',
    component: Layout,
    meta: {
      title: '权限管理'
    },
    children: [{
        path: 'index',
        name: 'permissionManage',
        component: () =>
          import ('@/views/permissionManage/index'),
        meta: {
          title: '权限管理'
        }
      },
      {
        path: 'edit',
        name: 'permissionEdit',
        component: () =>
          import ('@/views/permissionManage/edit'),
        meta: {
          title: '修改权限'
        }
      }
    ]
  },
  {
    path: '/two',
    component: Layout,
    meta: {
      title: '权限测试'
    },
    children: [{
        name: 'test2',
        path: 'test2',
        component: () =>
          import ('@/views/permission/test1'),
        meta: {
          title: '权限测试2'
        }
      },
      {
        name: 'test3',
        path: 'test3',
        component: () =>
          import ('@/views/permission/test1'),
        meta: {
          title: '权限测试3'
        }
      },
      {
        name: 'test4',
        path: 'test4',
        component: () =>
          import ('@/views/permission/test1'),
        meta: {
          title: '权限测试4'
        }
      },

    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
