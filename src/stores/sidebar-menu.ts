import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useUserStore } from '@/stores/auth'
import { ref, type Ref } from 'vue'

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
  iconActive?: string
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

const user = useUserStore()

const menuMain = {
  name: 'Dashboard',
  path: '/',
  icon: 'i-far-house-chimney',
  iconActive: 'i-fas-house-chimney'
}

const menuAttendance = {
  name: 'Attendances',
  path: '/attendances',
  icon: 'i-far-location-dot',
  iconActive: 'i-fas-location-dot'
}

const menuAccount = {
  name: user.role == 'user' ? 'Invitation' : 'Invite',
  path: user.role == 'user' ? '/invitation' : '/invite',
  icon: 'i-far-circle-user',
  iconActive: 'i-fas-circle-user',
  tempName: 'Account'
}
