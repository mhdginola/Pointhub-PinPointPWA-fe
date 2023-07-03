import { type RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/app/app-index.vue'),
    children: [
      {
        path: 'attendances',
        name: 'attendances',
        component: () => import('./views/attendances.vue')
      },
      {
        path: '/',
        name: 'dashboard',
        component: () => import('./views/dashboard.vue')
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('./views/account.vue')
      },
      // user
      {
        path: 'invitation',
        name: 'invitation',
        component: () => import('./views/account-user/index.vue')
      },
      {
        path: 'export',
        name: 'export',
        component: () => import('./views/account-user/index.vue')
      },
      // admin
      {
        path: 'invite',
        name: 'invite',
        component: () => import('./views/account-admin/index.vue')
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('./views/account-admin/index.vue')
      },
      {
        path: 'groups',
        name: 'groups',
        component: () => import('./views/account-admin/groups.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/auth/login.vue')
  }
]
