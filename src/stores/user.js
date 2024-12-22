import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用 ref 存储用户信息
    const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) || null)

    // 添加计算属性判断是否已认证
    const isAuthenticated = computed(() => {
      return !!userInfo.value // 根据 userInfo 是否存在判断登录状态
    })

    // 设置用户信息
    const setUserInfo = (info) => {
      userInfo.value = info
      // 持久化存储
      localStorage.setItem('userInfo', JSON.stringify(info))
    }

    // 清除用户信息
    const clearUserInfo = () => {
      userInfo.value = null
      localStorage.removeItem('userInfo')
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isAuthenticated, // 导出认证状态
    }
  },
  {
    persist: true, // 开启持久化
  },
)
