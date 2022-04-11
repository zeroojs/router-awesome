<!--
 * @Descripttion: your project
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-08 09:29:14
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 11:35:07
-->
<script setup>
import Sidebar from './components/Sidebar/index.vue'
</script>
<template>
  <div class="app-container">
    <sidebar />
    <router-view />
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-container {
  display: flex;
}
</style>
