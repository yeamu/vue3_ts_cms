import { LOGIN_TOKEN } from './../global/constansts'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { firstMenu } from '@/utils/mapTomenus'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/:pachMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    }
  ]
})

//路由守卫
router.beforeEach((to) => {
  if (to.path === '/main') {
    const token = localCache.getCache(LOGIN_TOKEN)
    if (to.path.startsWith('/main') && !token) return '/login'
  }

  if (to.path === '/main') return firstMenu?.url
})

export default router
