<template>
  <el-aside width="200px">
    <el-col class="side-area">
      <h5 class="side-title">教务管理系统</h5>
      <el-menu :default-active="router.currentRoute.value.path" class="el-menu-vertical">
        <el-menu-item
          v-for="item in menuList"
          :key="item.path"
          :index="item.path"
          @click="handleOpen(item.path)"
        >
          <el-icon><component :is="iconMap[item.icon]" /></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-aside>
</template>

<script setup>
import { ref } from 'vue'
import { HomeFilled, User } from '@element-plus/icons-vue'
import router from '@/router'

// 图标映射
const iconMap = {
  HomeFilled,
  User,
}

const menuList = ref([
  {
    name: '首页',
    icon: 'HomeFilled',
    path: '/',
  },
  {
    name: '教师管理',
    icon: 'User',
    path: '/teacher-manage',
  },
  {
    name: '学科管理',
    icon: 'HomeFilled',
    path: '/subject-manage',
  },
])
const handleOpen = (key, keyPath) => {
  router.push(key)
}
</script>

<style lang="scss" scoped>
.el-menu {
  background-color: $primary-color;
  color: $text-light;
}

.el-menu-vertical {
  border: none;
  height: calc(100vh - 60px);
}

.side-title {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 15px 0;
  color: #fff;
  background-color: $primary-color;
}

// 给选中的菜单项添加背景颜色
.el-menu-item.is-active {
  background-color: $secondary-color;
}

.el-menu-item:hover {
  background-color: $secondary-color;
}

.el-menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-light;
}
</style>
