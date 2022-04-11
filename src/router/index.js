/*
 * @Descripttion: your project
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-08 09:29:14
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 16:51:05
 */
import { useStore } from '@/store'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: '首页'
    }
  }
  // ...asyncRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

let isRegisted = false
router.beforeEach(async (to, from, next) => {
  const store = useStore()
  if (isRegisted) { // 已注册
    next()
  } else {
    await store.getMenus()
    next({ ...to, replace: true })
    isRegisted = true
  }
})

export default router
