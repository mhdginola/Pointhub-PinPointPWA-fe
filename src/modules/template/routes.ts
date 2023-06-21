export const routes = {
  path: '/template',
  component: () => import('@/layouts/app/app-index.vue'),
  children: [
    {
      path: '',
      children: [
        {
          path: '',
          component: () => import('./views/page-index.vue')
        }
      ]
    },
    {
      path: 'component',
      children: [
        {
          path: '',
          component: () => import('./views/component/page-index.vue')
        },
        {
          path: 'accordion',
          component: () => import('./views/component/accordion/page-accordion.vue')
        },
        {
          path: 'alert',
          component: () => import('./views/component/alert/page-alert.vue')
        },
        {
          path: 'avatar',
          component: () => import('./views/component/avatar/page-avatar.vue')
        },
        {
          path: 'badge',
          component: () => import('./views/component/badge/page-badge.vue')
        },
        {
          path: 'breadcrumb',
          component: () => import('./views/component/breadcrumb/page-breadcrumb.vue')
        },
        {
          path: 'button',
          component: () => import('./views/component/button/page-button.vue')
        },
        {
          path: 'button-group',
          component: () => import('./views/component/button-group/page-button-group.vue')
        },
        {
          path: 'card',
          component: () => import('./views/component/card/page-card.vue')
        },
        {
          path: 'collapse',
          component: () => import('./views/component/collapse/page-collapse.vue')
        },
        {
          path: 'divider',
          component: () => import('./views/component/divider/page-divider.vue')
        },
        {
          path: 'dropdown',
          component: () => import('./views/component/dropdown/page-dropdown.vue')
        },
        {
          path: 'mask',
          component: () => import('./views/component/mask/page-mask.vue')
        },
        {
          path: 'modal',
          component: () => import('./views/component/modal/page-modal.vue')
        },
        {
          path: 'notification',
          component: () => import('./views/component/notification/page-notification.vue')
        },
        {
          path: 'popover',
          component: () => import('./views/component/popover/page-popover.vue')
        },
        {
          path: 'progress',
          component: () => import('./views/component/progress/page-progress.vue')
        },
        {
          path: 'skeleton',
          component: () => import('./views/component/skeleton/page-skeleton.vue')
        },
        {
          path: 'spinner',
          component: () => import('./views/component/spinner/page-spinner.vue')
        },
        {
          path: 'starter',
          component: () => import('./views/component/starter/page-starter.vue')
        },
        {
          path: 'steps',
          component: () => import('./views/component/steps/page-steps.vue')
        },
        {
          path: 'table',
          component: () => import('./views/component/table/page-table.vue')
        },
        {
          path: 'table-advance',
          component: () => import('./views/component/table-advance/page-table-advance.vue')
        },
        {
          path: 'tabs',
          component: () => import('./views/component/tabs/page-tabs.vue')
        },
        {
          path: 'timeline',
          component: () => import('./views/component/timeline/page-timeline.vue')
        },
        {
          path: 'tooltip',
          component: () => import('./views/component/tooltip/page-tooltip.vue')
        },
        {
          path: 'treeview',
          component: () => import('./views/component/treeview/page-treeview.vue')
        },
        {
          path: 'typography',
          component: () => import('./views/component/typography/page-typography.vue')
        }
      ]
    },
    {
      path: 'form',
      children: [
        {
          path: '',
          component: () => import('./views/form/page-index.vue')
        },
        {
          path: 'form-layout-1',
          component: () => import('./views/form/page-form-layout-1.vue')
        },
        {
          path: 'form-layout-2',
          component: () => import('./views/form/page-form-layout-2.vue')
        },
        {
          path: 'form-layout-3',
          component: () => import('./views/form/page-form-layout-3.vue')
        },
        {
          path: 'form-layout-4',
          component: () => import('./views/form/page-form-layout-4.vue')
        },
        {
          path: 'form-layout-5',
          component: () => import('./views/form/page-form-layout-5.vue')
        },
        {
          path: 'autocomplete',
          component: () => import('./views/form/autocomplete/page-autocomplete.vue')
        },
        {
          path: 'checkbox',
          component: () => import('./views/form/checkbox/page-checkbox.vue')
        },
        {
          path: 'datepicker',
          component: () => import('./views/form/datepicker/page-datepicker.vue')
        },
        {
          path: 'input-group',
          component: () => import('./views/form/input-group/page-input-group.vue')
        },
        {
          path: 'input-mask',
          component: () => import('./views/form/input-mask/page-input-mask.vue')
        },
        {
          path: 'input-text',
          component: () => import('./views/form/input-text/page-input-text.vue')
        },
        {
          path: 'radio',
          component: () => import('./views/form/radio/page-radio.vue')
        },
        {
          path: 'radio-group',
          component: () => import('./views/form/radio-group/page-radio-group.vue')
        },
        {
          path: 'range',
          component: () => import('./views/form/range/page-range.vue')
        },
        {
          path: 'select',
          component: () => import('./views/form/select/page-select.vue')
        },
        {
          path: 'switch',
          component: () => import('./views/form/switch/page-switch.vue')
        },
        {
          path: 'textarea',
          component: () => import('./views/form/textarea/page-textarea.vue')
        },
        {
          path: 'file-upload',
          component: () => import('./views/form/file-upload/page-file-upload.vue')
        }
      ]
    }
  ]
}

// export const pageRoutes = {
//   path: '/page',
//   component: () => import('@/layouts/full-layout.vue'),
//   children: [
//     {
//       path: '',
//       component: () => import('./module-index.vue'),
//       children: [
//         {
//           path: 'signin',
//           component: () => import('./views/page/signin.vue'),
//         },
//       ],
//     },
//   ],
// }
