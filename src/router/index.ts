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
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // 子路由应该根据返回用户信息中的userMenus的内容动态决定，
    // 具体代码在store/login/login.ts中mutations的changeUserMenus方法实现
    // children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
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
