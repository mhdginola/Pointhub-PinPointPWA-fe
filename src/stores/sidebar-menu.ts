import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * Shortcut using dynamic icon on the fly, at the compile time
 * we can't possibility know all the combination of the utilities.
 * For that, you can configure your icon to the safelist option.
 *
 * https://unocss.dev/guide/extracting#safelist
 */

export interface ShortcutInterface {
  name: string
  icon: string
  menu: Array<MenuInterface>
  path?: string
  link?: string
}

export interface MenuInterface {
  name: string
  path?: string
  link?: string
  separator?: boolean
  submenu?: SubmenuInterface[]
}

export interface SubmenuInterface {
  name: string
  path?: string
  link?: string
  separator?: boolean
}

interface StateInterface {
  shortcut: ShortcutInterface[]
  activeShortcut: ShortcutInterface
  activeShortcutIndex: number
  activeMenuName: string
}

export const useSidebarMenuStore = defineStore('sidebar-menu', {
  state: (): StateInterface => ({
    shortcut: [menuMain, menuTemplate],
    activeShortcut: menuMain,
    activeShortcutIndex: 0,
    activeMenuName: ''
  }),
  actions: {
    findActiveShortcut(route: RouteLocationNormalizedLoaded) {
      for (const [index, shortcut] of this.$state.shortcut.entries()) {
        if (route.path === shortcut.path) {
          this.$state.activeShortcut = shortcut
          this.$state.activeShortcutIndex = index
          return
        }
        for (const menu of shortcut.menu) {
          if (route.path.includes(menu.path as string)) {
            this.$state.activeShortcut = shortcut
            this.$state.activeShortcutIndex = index
            this.$state.activeMenuName = menu.name
            return
          }
          if (menu.submenu) {
            for (const submenu of menu.submenu) {
              if (route.path.includes(submenu.path as string)) {
                this.$state.activeShortcut = shortcut
                this.$state.activeShortcutIndex = index
                this.$state.activeMenuName = menu.name
                return
              }
            }
          }
        }
        if (route.path.split('/')[1] === shortcut.path?.split('/')[1]) {
          this.$state.activeShortcut = shortcut
          this.$state.activeShortcutIndex = index
          return
        }
      }
    },
    toggleMenu(name: string) {
      if (this.$state.activeMenuName === name) {
        this.$state.activeMenuName = ''
      } else {
        this.$state.activeMenuName = name
      }
    },
    hasChildren(route: RouteLocationNormalizedLoaded) {
      for (const shortcut of this.$state.shortcut) {
        if (shortcut.path === route.path) return true
        for (const menu of shortcut.menu) {
          if (menu.path === route.path && menu.submenu) return true
        }
      }
    }
  }
})

const menuMain = {
  name: 'Main Menu',
  path: '/',
  icon: 'i-fad-house-chimney',
  menu: [
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Page 1',
      path: '/page-1'
    },
    {
      name: 'Page 2',
      path: '/page-2'
    },
    {
      name: 'Nested',
      submenu: [
        {
          name: 'Page Nested 1',
          path: '/nested/page-nested-1'
        },
        {
          name: 'Page Nested 2',
          path: '/nested/page-nested-2'
        }
      ]
    }
  ]
}

const menuTemplate = {
  name: 'Template',
  path: '/template',
  icon: 'i-fad-wand-magic-sparkles',
  menu: [
    {
      name: 'Component',
      submenu: [
        {
          name: 'Accordion',
          path: '/template/component/accordion'
        },
        {
          name: 'Alert',
          path: '/template/component/alert'
        },
        {
          name: 'Avatar',
          path: '/template/component/avatar'
        },
        {
          name: 'Badge',
          path: '/template/component/badge'
        },
        {
          name: 'Breadcrumb',
          path: '/template/component/breadcrumb'
        },
        {
          name: 'Button',
          path: '/template/component/button'
        },
        {
          name: 'Button Group',
          path: '/template/component/button-group'
        },
        {
          name: 'Card',
          path: '/template/component/card'
        },
        {
          name: 'Collapse',
          path: '/template/component/collapse'
        },
        {
          name: 'Divider',
          path: '/template/component/divider'
        },
        {
          name: 'Dropdown',
          path: '/template/component/dropdown'
        },
        {
          name: 'Mask',
          path: '/template/component/mask'
        },
        {
          name: 'Modal',
          path: '/template/component/modal'
        },
        {
          name: 'Notification',
          path: '/template/component/notification'
        },
        {
          name: 'Popover',
          path: '/template/component/popover'
        },
        {
          name: 'Progress',
          path: '/template/component/progress'
        },
        {
          name: 'Skeleton',
          path: '/template/component/skeleton'
        },
        {
          name: 'Spinner',
          path: '/template/component/spinner'
        },
        {
          name: 'Starter',
          path: '/template/component/starter'
        },
        {
          name: 'Steps',
          path: '/template/component/steps'
        },
        {
          name: 'Table',
          path: '/template/component/table'
        },
        {
          name: 'Table Advance',
          path: '/template/component/table-advance'
        },
        {
          name: 'Tabs',
          path: '/template/component/tabs'
        },
        {
          name: 'Timeline',
          path: '/template/component/timeline'
        },
        {
          name: 'Tooltip',
          path: '/template/component/tooltip'
        },
        {
          name: 'Treeview',
          path: '/template/component/treeview'
        },
        {
          name: 'Typography',
          path: '/template/component/typography'
        }
      ]
    },
    {
      name: 'Form',
      separator: true,
      submenu: [
        {
          name: 'Form Layout 1',
          path: '/template/form/form-layout-1'
        },
        {
          name: 'Form Layout 2',
          path: '/template/form/form-layout-2'
        },
        {
          name: 'Form Layout 3',
          path: '/template/form/form-layout-3'
        },
        {
          name: 'Form Layout 4',
          path: '/template/form/form-layout-4'
        },
        {
          name: 'Form Layout 5',
          path: '/template/form/form-layout-5',
          separator: true
        },
        {
          name: 'Autocomplete',
          path: '/template/form/autocomplete'
        },
        {
          name: 'Input Text',
          path: '/template/form/input-text'
        },
        {
          name: 'Input Group',
          path: '/template/form/input-group'
        },
        {
          name: 'Input Mask',
          path: '/template/form/input-mask'
        },
        {
          name: 'Checkbox',
          path: '/template/form/checkbox'
        },
        {
          name: 'Datepicker',
          path: '/template/form/datepicker'
        },
        {
          name: 'File Upload',
          path: '/template/form/file-upload'
        },
        {
          name: 'Radio',
          path: '/template/form/radio'
        },
        {
          name: 'Radio Group',
          path: '/template/form/radio-group'
        },
        {
          name: 'Switch',
          path: '/template/form/switch'
        },
        {
          name: 'Select',
          path: '/template/form/select'
        },
        {
          name: 'Range',
          path: '/template/form/range'
        },
        {
          name: 'Textarea',
          path: '/template/form/textarea'
        }
      ]
    },
    {
      name: 'unocss.dev',
      link: 'https://unocss.dev/'
    },
    {
      name: 'fontawesome.com',
      link: 'https://fontawesome.com/search'
    },
    {
      name: 'iconify.design',
      link: 'https://icon-sets.iconify.design'
    },
    {
      name: 'icones',
      link: 'https://icones.js.org/'
    },
    {
      name: 'undraw.co',
      link: 'https://undraw.co/illustrations'
    },
    {
      name: 'vuejs.org',
      link: 'https://vuejs.org/'
    },
    {
      name: 'vitejs.dev',
      link: 'https://vitejs.dev/'
    }
  ]
}
