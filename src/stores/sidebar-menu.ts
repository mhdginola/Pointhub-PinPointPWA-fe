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
    shortcut: [menuMain, menuAttendance, menuAccount],
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

const user = useUserStore()

const menuMain: ShortcutInterface = {
  displayName: 'Main Menu',
  name: 'Dashboard',
  path: '/',
  icon: 'i-far-house-chimney',
  iconActive: 'i-fas-house-chimney',
  menu: [
    {
      name: 'Dashboard',
      path: '/'
    }
  ]
}

const menuAttendance: ShortcutInterface = {
  displayName: 'Attendances Menu',
  name: 'Attendances',
  path: '/attendances',
  icon: 'i-far-location-dot',
  iconActive: 'i-fas-location-dot',
  menu: [
    {
      name: 'Attendances',
      path: '/attendances'
    }
  ]
}

const menuAccount: ShortcutInterface = {
  displayName: 'Account Menu',
  name: user.role == 'user' ? 'Invitation' : 'Invite',
  path: user.role == 'user' ? '/invitation' : '/invite',
  icon: 'i-far-circle-user',
  iconActive: 'i-fas-circle-user',
  tempName: 'Account',
  menu:
    user.role == 'admin'
      ? [
          {
            name: 'Invite User',
            path: '/invite'
          },
          {
            name: 'Report',
            path: '/report'
          }
        ]
      : [
          {
            name: 'Invitation',
            path: '/invitation'
          },
          {
            name: 'Export',
            path: '/export'
          }
        ]
}
