<!--
 * @Descripttion: your project
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-08 09:43:49
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 11:04:20
-->
<template>
  <div class="sidebar">
    <el-menu
      default-active="1"
    >
      <Submenu
        v-for="menu in menus"
        :key="menu.name"
        :menu="menu"
      />
    </el-menu>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
import Submenu from './Submenu.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    Submenu
  },
  setup() {
    const store = useStore()
    return {
      menus: computed(() => store.menus)
    }
  }
})
</script>

<style lang="less" scoped>
.sidebar {
  max-width: 225px;
  width: 100%;
  height: 100vh;
  .el-menu {
    height: 100%;
  }
  & :deep(.el-sub-menu__title) {
    position: relative;
    &::before {
      content: " ";
      width: 5px;
      height: 50%;
      background-color: var(--el-color-primary);
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
