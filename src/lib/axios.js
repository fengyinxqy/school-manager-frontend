import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // 或者你的 API 基础URL
  timeout: 10000,
  withCredentials: true, // 允许跨域携带 cookie
})

// 是否正在刷新 token
let isRefreshing = false
// 等待刷新 token 的请求队列
let requests = []

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 这里不需要手动设置 token，因为使用了 cookie 方式
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const originalRequest = error.config

    // 如果响应状态码是 401（未授权）
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 如果正在刷新 token，将请求加入队列
        return new Promise((resolve) => {
          requests.push(() => {
            resolve(request(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // 尝试刷新 token
        const res = await request.post('/api/auth/refresh-token')

        // token 刷新成功，执行队列中的请求
        requests.forEach((cb) => cb())
        requests = []

        return request(originalRequest)
      } catch (refreshError) {
        // token 刷新失败，需要重新登录
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)

// 封装请求方法
export const http = {
  get(url, params) {
    return request({
      method: 'get',
      url,
      params,
    })
  },

  post(url, data) {
    return request({
      method: 'post',
      url,
      data,
    })
  },

  put(url, data) {
    return request({
      method: 'put',
      url,
      data,
    })
  },

  delete(url, params) {
    return request({
      method: 'delete',
      url,
      params,
    })
  },
}

export default request
