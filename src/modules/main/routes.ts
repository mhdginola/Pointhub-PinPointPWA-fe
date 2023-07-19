import { type RouteRecordRaw } from 'vue-router'
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
        path: 'invite',
        name: 'invite',
        meta: {
          displayName: 'Main Menu',
          parentName: 'Account'
        },
        component: () => import('./views/account/index.vue')
      },
      {
        path: 'report',
        name: 'report',
        meta: {
          displayName: 'Main Menu',
          parentName: 'Account'
        },
        component: () => import('./views/account/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/auth/login.vue')
  }
]
