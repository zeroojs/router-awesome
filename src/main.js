/*
 * @Descripttion: your project
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-08 09:29:14
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 15:54:35
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { useStore } from './store'
import App from './App.vue'
import router from './router'
import ViewBanner from './components/ViewBanner'
import ElementUI from 'element-plus'
import 'element-plus/theme-chalk/index.css'

createApp(App)
  .use(ElementUI)
  .use(ViewBanner)
  .use(createPinia())
  .use(router)
  .mount('#app')

// const store = useStore()
// store.getMenus()
