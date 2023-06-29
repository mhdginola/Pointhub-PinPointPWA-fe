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
  // menu: Array<MenuInterface>
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
  activeShortcut: ShortcutInterface | null
  activeShortcutIndex: number
  activeMenuName: string
}

export const useSidebarMenuStore = defineStore('sidebar-menu', {
  state: (): StateInterface => ({
    shortcut: [menuMain, menuAttendance, menuAccount],
    activeShortcut: null,
    activeShortcutIndex: 1,
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
        // for (const menu of shortcut.menu) {
        //   if (route.path.includes(menu.path as string)) {
        //     this.$state.activeShortcut = shortcut
        //     this.$state.activeShortcutIndex = index
        //     this.$state.activeMenuName = menu.name
        //     return
        //   }
        //   if (menu.submenu) {
        //     for (const submenu of menu.submenu) {
        //       if (route.path.includes(submenu.path as string)) {
        //         this.$state.activeShortcut = shortcut
        //         this.$state.activeShortcutIndex = index
        //         this.$state.activeMenuName = menu.name
        //         return
        //       }
        //     }
        //   }
        // }
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
        // for (const menu of shortcut.menu) {
        //   if (menu.path === route.path && menu.submenu) return true
        // }
      }
    }
  }
})

const menuMain = {
  name: 'Home',
  path: '/dashboard',
  icon: 'i-fad-house-chimney'
}

const menuAttendance = {
  name: 'Attendance',
  path: '/attendances',
  icon: 'i-fad-location-dot'
}

const menuAccount = {
  name: 'Account',
  path: '/account',
  icon: 'i-fad-circle-user'
}
