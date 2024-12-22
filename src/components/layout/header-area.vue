<template>
  <el-header>
    <div class="header-container">
      <div class="right-section">
        <el-tag type="primary" class="user-role">{{ userRole }}</el-tag>
        <div v-if="userStore.userInfo" class="user-info flex items-center">
          <el-dropdown>
            <span class="user-dropdown">
              {{ userStore.userInfo.username }}
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { USER_ROLES } from '@/enums'

const userStore = useUserStore()
const router = useRouter()

const userRole = USER_ROLES[userStore.userInfo.role]

const handleLogout = () => {
  userStore.clearUserInfo()
  router.push('/login')
  ElMessage.success('已退出登录')
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff; // 改为白色背景
  display: flex;
  justify-content: end;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); // 添加微妙的阴影
  position: relative; // 为阴影效果添加定位

  :deep(.el-dropdown-menu__item) {
    padding: 8px 20px; // 下拉菜单项的内边距

    &:hover {
      background-color: #f5f7fa; // 悬停背景色
    }
  }
}

.right-section {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #606266; // 改为深灰色文字
  font-size: 14px;
  outline: none;

  &:focus {
    outline: none;
  }

  .el-icon--right {
    margin-left: 4px;
    color: #909399; // 图标使用浅灰色
  }
}

.user-role {
  margin-right: 5px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  margin-left: 5px;

  outline: none;

  &:focus {
    outline: none;
  }
}
</style>
