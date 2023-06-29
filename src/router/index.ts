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
  if (!user.$state.accessToken && to.name !== 'login') {
    return {
      name: 'login'
    }
  } else {
    if (to.name == 'account') {
      if (user.role == 'user') {
        return {
          path: '/account/invitation'
        }
      } else {
        return {
          path: '/account/invite'
        }
      }
    }
  }
})
export default router
