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
      // user
      {
        path: 'invitation',
        name: 'invitation',
        component: () => import('./views/_user/index.vue')
      },
      {
        path: 'export',
        name: 'export',
        component: () => import('./views/_user/index.vue')
      },
      // admin
      {
        path: 'invite',
        name: 'invite',
        component: () => import('./views/_admin/index.vue')
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('./views/_admin/index.vue')
      },
      {
        path: 'groups',
        name: 'groups',
        component: () => import('./views/_admin/groups.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/auth/login.vue')
  }
]
