export const constantRoutes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'layout',
      icon: 'HomeFilled',
      hidden: false
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false
        }
      }
    ]
  },

  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      icon: 'HomeFilled',
      hidden: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      icon: 'HomeFilled',
      hidden: true
    }
  },
  // 数据大屏
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      icon: 'HomeFilled',
      hidden: false
    }
  },
  // 权限管理
  {
    path: '/acl',
    // redirect: '404'
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'HomeFilled',
      hidden: false
    },
    children: [
      {
        path: '/acl/user',
        name: 'Acl',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'HomeFilled',
          hidden: false
        }
      },
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'HomeFilled',
          hidden: false
        }
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'HomeFilled',
          hidden: false
        }
      }
    ]
  },
  // 商品管理
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'HomeFilled',
      hidden: false
    },
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'HomeFilled',
          hidden: false
        }
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'HomeFilled',
          hidden: false
        }
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'HomeFilled',
          hidden: false
        }
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'HomeFilled',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
    name: 'Any',
    meta: {
      title: '任意路由',
      icon: 'HomeFilled',
      hidden: true
    }
  }
]
