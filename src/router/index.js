import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login-page.vue'),
    },
    {
      path: '/teacher-manage',
      name: 'TeacherManage',
      component: () => import('@/views/teacher-manage/teacher-manage.vue'),
    },
    {
      path: '/subject-manage',
      name: 'SubjectManage',
      component: () => import('@/views/subject-manage/subject-manage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
