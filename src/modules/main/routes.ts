import { type RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/app/app-index.vue'),
    children: [
      {
        path: 'attendances',
        name: 'attendances',
        meta: {
          displayName: 'Attendances Menu'
        },
        component: () => import('./views/attendances.vue')
      },
      {
        path: '/',
        name: 'dashboard',
        meta: {
          displayName: 'Main Menu'
        },
        component: () => import('./views/dashboard.vue')
      },
      // user
      {
        path: 'invitation',
        name: 'invitation',
        meta: {
          displayName: 'Account Menu'
        },
        component: () => import('./views/_user/index.vue')
      },
      {
        path: 'export',
        name: 'export',
        meta: {
          displayName: 'Account Menu'
        },
        component: () => import('./views/_user/index.vue')
      },
      // admin
      {
        path: 'invite',
        name: 'invite',
        meta: {
          displayName: 'Account Menu'
        },
        component: () => import('./views/_admin/index.vue')
      },
      {
        path: 'report',
        name: 'report',
        meta: {
          displayName: 'Account Menu'
        },
        component: () => import('./views/_admin/index.vue')
      }
      // {
      //   path: 'groups',
      //   name: 'groups',
      //   component: () => import('./views/_admin/groups.vue')
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/auth/login.vue')
  }
]
