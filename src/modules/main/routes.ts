import { type RouteRecordRaw } from 'vue-router'
// import { useUserStore } from '@/stores/auth'
// const auth = useUserStore()

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/app/app-index.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        meta: {
          displayName: 'Main Menu'
        },
        component: () => import('./views/dashboard/index.vue')
      },
      {
        path: 'attendances',
        name: 'attendances',
        meta: {
          displayName: 'Main Menu'
        },
        component: () => import('./views/attendances/index.vue')
      },
      {
        path: 'account',
        name: 'account',
        meta: {
          displayName: 'Main Menu'
        },
        component: () => import('./views/account/index.vue')
      },
      {
        path: 'report',
        name: 'report',
        meta: {
          displayName: 'Main Menu'
        },
        component: () => import('./views/report/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/auth/login.vue')
  }
]
