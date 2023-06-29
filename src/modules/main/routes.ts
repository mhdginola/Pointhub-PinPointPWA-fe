import { type RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/attendances',
    component: () => import('@/layouts/app/app-index.vue'),
    children: [
      {
        path: 'attendances',
        name: 'attendances',
        component: () => import('./views/attendances.vue')
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('./views/dashboard.vue')
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('./views/account.vue'),
        children: [
          // user
          {
            path: 'invitation',
            name: 'invitation',
            component: () => import('./views/account-user/invitation.vue')
          },
          {
            path: 'export',
            name: 'export',
            component: () => import('./views/account-user/report.vue')
          },
          // admin
          {
            path: 'invite',
            name: 'invite',
            component: () => import('./views/account-admin/invite.vue')
          },
          {
            path: 'groups',
            name: 'groups',
            component: () => import('./views/account-admin/groups.vue')
          },
          {
            path: 'export',
            name: 'export',
            component: () => import('./views/account-admin/report.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/auth/login.vue')
  }
]
