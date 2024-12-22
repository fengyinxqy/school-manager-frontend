<script setup>
import { RouterView } from 'vue-router'
import SideArea from './components/layout/side-area.vue'
import HeaderArea from './components/layout/header-area.vue'
</script>

<template>
  <el-container class="app-container">
    <side-area></side-area>
    <el-container direction="vertical">
      <header-area></header-area>
      <el-main class="main-container">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
}

.main-container {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
</style>
