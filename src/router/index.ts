import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 使用全局导航守卫做拦截，除开登录页都需要判断是否有token信息
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    // 如果token没有值，就跳转到登录页
    if (!token) {
      return '/login'
    }
  }
})

export default router
