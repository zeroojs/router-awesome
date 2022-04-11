<!--
 * @Descripttion: your project
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-08 13:40:55
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 16:50:46
-->
<template>
  <component
    :is="menu.children ? 'el-sub-menu' : 'el-menu-item'"
    :index="menu.name"
    @click="() => handleMenuSelect(menu)"
  >
    <template #title>
      <span>{{ menu.meta.title }}</span>
    </template>
    <template v-if="menu.children">
      <Submenu
        v-for="child in menu.children"
        :key="child.id"
        :menu="child"
      />
    </template>
  </component>
</template>

<script>
import { defineComponent } from 'vue'
import Submenu from './index.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    Submenu
  },
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const router = useRouter() // eslint-disable-line
    const handleMenuSelect = (route) => {
      if (route.href) { // 外部跳转
        window.open(route.href)
        return
      }
      if (route.children && route.children.length) return
      router.push({ name: route.name })
    }

    return {
      handleMenuSelect
    }
  }
})
</script>

<style lang="less" scoped>
</style>
