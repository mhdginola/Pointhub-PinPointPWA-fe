import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { routes as mainRoutes } from '@/modules/main/routes'
import { routes as templateRoutes } from '@/modules/template/routes'
import { useUserStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [...mainRoutes, templateRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from) => {
  const user = useUserStore()
  if (!user.accessToken && to.name !== 'login') {
    return {
      name: 'login'
    }
  }
})
export default router
