<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">教务管理系统登录</h2>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="0"
        size="large"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" class="login-button" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import request from '@/lib/axios'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const loginFormRef = ref(null)
const loading = ref(false)
const userStore = useUserStore()

const loginForm = reactive({
  username: '',
  password: '',
})

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20个字符之间', trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    loading.value = true
    await loginFormRef.value.validate()
    const { data } = await request.post('/login', loginForm)

    // 保存用户信息到 store
    userStore.setUserInfo(data.userInfo)

    router.push('/')
    ElMessage.success('登录成功')
  } catch (error) {
    ElMessage.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 400px;
  padding: 20px;

  .login-title {
    text-align: center;
    margin-bottom: 30px;
    color: $primary-color;
  }

  .login-button {
    width: 100%;
  }
}
</style>
