import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useUserStore } from './auth'

/**
 * Shortcut using dynamic icon on the fly, at the compile time
 * we can't possibility know all the combination of the utilities.
 * For that, you can configure your icon to the safelist option.
 *
 * https://unocss.dev/guide/extracting#safelist
 */

export interface ShortcutInterface {
  name: string
  displayName?: string
  icon: string
  iconActive?: string
  menu: Array<MenuInterface>
  path?: string
  link?: string
  tempName?: string
}

export interface MenuInterface {
  name: string
  tempName?: string
  path?: string
  tempPath?: string
  link?: string
  separator?: boolean
  submenu?: SubmenuInterface[]
  icon?: string
  iconActive?: string
}

export interface SubmenuInterface {
  name: string
  path?: string
  link?: string
  separator?: boolean
  parent?: string
}

interface StateInterface {
  shortcut: ShortcutInterface[]
  activeShortcut: ShortcutInterface
  activeShortcutIndex: number
  activeMenuName: string
}

export const useSidebarMenuStore = defineStore('sidebar-menu', {
  state: (): StateInterface => ({
    shortcut: [...menu],
    activeShortcut: menu[0],
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

const user = useUserStore()

const menu: StateInterface['shortcut'] = [
  {
    name: 'Main Menu',
    displayName: 'Main Menu',
    path: '/',
    icon: 'i-far-house-chimney',
    menu: [
      {
        name: 'Dashboard',
        path: '/',
        icon: 'i-far-house-chimney',
        iconActive: 'i-fas-house-chimney'
      },
      {
        name: 'Attendances',
        path: '/attendances',
        icon: 'i-far-location-dot',
        iconActive: 'i-fas-location-dot'
      },
      {
        name: 'Account',
        icon: 'i-far-circle-user',
        iconActive: 'i-fas-circle-user',
        tempPath: '/invite',
        tempName: 'Invite',
        submenu: [
          {
            name: 'Invite User',
            path: '/invite',
            parent: 'Account'
          },
          {
            name: 'Report',
            path: '/report',
            parent: 'Account'
          }
        ]
      }
    ]
  },
  {
    name: 'Account Menu',
    displayName: 'Account Menu',
    path: '#',
    icon: 'i-far-circle-user',
    menu: []
  },
  {
    name: 'Mail Menu',
    displayName: 'Mail Menu',
    path: '#',
    icon: 'i-far-envelope',
    menu: []
  }
]
