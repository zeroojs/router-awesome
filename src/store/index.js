/*
 * @Descripttion: your project
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-09 14:11:40
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 16:50:37
 */
import { defineStore } from 'pinia'
import axios from 'axios'
import { mergeRoutes, formatRoutesMenus } from '@/router/routes'
import router from '@/router'

export const useStore = defineStore('main', {
  state() {
    return {
      menusState: [], // 菜单路由
      routesState: [] // 路由
    }
  },
  getters: {
    menus: (state) => state.menusState
  },
  actions: {
    // 获取服务端菜单
    async getMenus() {
      const result = await axios.get('/static/routes.json')
      if (result.status === 200) {
        const routesState = mergeRoutes(result.data)
        this.routesState = routesState
        this.menusState = formatRoutesMenus(result.data)
        routesState.forEach(asyncRoute => {
          router.addRoute(asyncRoute)
        })
      }
    }
  }
})
