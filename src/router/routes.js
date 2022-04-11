/*
 * @Descripttion: 异步路由
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-09 13:04:38
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 16:53:12
 */
import { arrToTree, treeToArr } from '@/utils'
// import Order from '@/views/order/index'

// 异步路由
export const asyncRoutes = [
  {
    path: '/product',
    name: 'ProductManage',
    component: () => import('@/views/product/index'),
    meta: {
      title: '产品管理'
    },
    children: [
      {
        path: 'create',
        name: 'CreateProduct',
        component: () => import('@/views/product/create'),
        meta: {
          title: '创建产品'
        }
      },
      {
        path: '/product/:id',
        name: 'ProductDetails',
        component: () => import('@/views/product/details'),
        meta: {
          title: '产品详情'
        }
      },
      {
        path: 'cat',
        name: 'ProductCatManage',
        component: () => import('@/views/product/cat/index'),
        meta: {
          title: '产品分类管理'
        },
        children: [
          {
            path: 'create',
            name: 'CreateProductCat',
            component: () => import('@/views/product/cat/create'),
            meta: {
              title: '创建分类'
            }
          },
          {
            path: ':id',
            name: 'ProductCatDetails',
            component: () => import('@/views/product/cat/details'),
            meta: {
              title: '分类详情'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/order',
    name: 'OrderManage',
    component: () => import(/* webpackChunkName: "order-router-view" */'@/views/order/order'),
    // component: () => import('@/views/order/order'),
    meta: {
      title: '订单管理'
    },
    children: [
      {
        path: 'create',
        name: 'CreateOrder',
        component: () => import(/* webpackChunkName: "create-order" */ '@/views/order/create'),
        // component: () => import('@/views/order/details'),
        meta: {
          title: '创建订单'
        }
      },
      {
        path: ':id',
        name: 'OrderDetails',
        component: () => import('@/views/order/details'),
        meta: {
          title: '订单详情'
        }
      }
    ]
  }
]

// 错误页面捕获路由
export const catchRoutes = [
  {
    path: '*',
    name: '404Page',
    meta: {
      title: '页面丢失'
    }
  }
]

// 路由合并
export const mergeRoutes = (serverRoutes = []) => {
  const asyncRoutesArr = treeToArr(asyncRoutes)
  const menus = []
  for (const i in serverRoutes) {
    const sr = serverRoutes[i]
    // 以客户端路由表为基准
    const cr = asyncRoutesArr.find(cr => (cr.name === sr.name) && !sr.href)
    if (cr) {
      menus.push({ ...cr, id: sr.id, parentId: sr.parentId })
    }
  }
  return arrToTree(menus)
}

// 格式化路由菜单
export const formatRoutesMenus = (serverRoutes = []) => {
  const asyncRoutesArr = treeToArr(asyncRoutes)
  const menus = []
  for (const i in serverRoutes) {
    const sr = serverRoutes[i]
    // 以客户端路由表为基准
    const cr = asyncRoutesArr.find(cr => cr.name === sr.name && !sr.hide)
    if (cr) {
      menus.push({ ...cr, id: sr.id, parentId: sr.parentId })
    }
    // 菜单外部跳转
    if (sr.href) {
      menus.push({
        ...sr,
        meta: {
          title: sr.title
        }
      })
    }
  }
  return arrToTree(menus)
}
