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
        component: () => import('./views/dashboard.vue')
      },
      {
        path: 'attendances',
        name: 'attendances',
        meta: {
          displayName: 'Main Menu'
        },
        component: () => import('./views/attendances.vue')
      },
      // user
      {
        path: 'invitation',
        name: 'invitation',
        meta: {
          displayName: 'Main Menu'
        },
        component: () => import('./views/_user/index.vue')
      },
      {
        path: 'export',
        name: 'export',
        meta: {
          displayName: 'Main Menu',
          parentName: 'Account'
        },
        component: () => import('./views/_user/index.vue')
      },
      // admin
      {
        path: 'invite',
        name: 'invite',
        meta: {
          displayName: 'Main Menu',
          parentName: 'Account'
        },
        component: () => import('./views/_admin/index.vue')
      },
      {
        path: 'report',
        name: 'report',
        meta: {
          displayName: 'Main Menu',
          parentName: 'Account'
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
