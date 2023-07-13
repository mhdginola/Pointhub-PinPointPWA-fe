<script setup lang="ts">
import { useSidebar } from '@/composable/sidebar'
import { useSidebarStore } from '@/stores/sidebar'
import { useSidebarMenuStore } from '@/stores/sidebar-menu'
import { useMobileBreakpoint } from '@/composable/mobile-breakpoint'

const sidebarMenuStore = useSidebarMenuStore()
const sidebarStore = useSidebarStore()
const { isMobileBreakpoint } = useMobileBreakpoint()
useSidebar()
</script>

<template>
  <div class="sidebar-panel">
    <div class="sidebar-panel-container">
      <!-- Sidebar Panel Header -->
      <div class="sidebar-panel-header">
        <p class="text-base font-extrabold tracking-wider text-slate-100">
          {{ sidebarMenuStore.shortcut[sidebarMenuStore.activeShortcutIndex]?.displayName }}
        </p>
        <button @click="sidebarStore.closeSidebar()" v-if="isMobileBreakpoint()" class="mr-2">
          <div v-if="sidebarStore.isSidebarOpen">
            <i class="i-fas-angle-left block text-white"></i>
          </div>
        </button>
      </div>
      <!-- Sidebar Panel Body -->
      <div class="sidebar-panel-body">
        <ul class="flex flex-1 flex-col px-4">
          <li
            v-for="menu in sidebarMenuStore.shortcut[sidebarMenuStore.activeShortcutIndex].menu"
            :key="menu.name"
          >
            <div>
              <!-- Internal Menu -->
              <router-link
                v-if="menu.path"
                :to="menu.path as string"
                class="menu-link-button hover:bg-slate-300/20 text-xl"
              >
                {{ menu.name }}
              </router-link>
              <!-- External Menu -->
              <a
                v-if="menu.link"
                :href="menu.link as string"
                target="_blank"
                class="menu-link-button !text-slate-200/80"
              >
                {{ menu.name }}
                <i class="i-fas-up-right-from-square block"></i>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-panel {
  @apply fixed top-0 left-[var(--sidebar-shortcut-width)] h-full w-[var(--sidebar-panel-width)] z-30 transform-gpu transition-transform duration-200 opacity-100;
}

.is-sidebar-open .sidebar-panel {
  @apply -translate-x-[15rem] ease-out;
}

.sidebar-panel-container {
  @apply flex h-full grow flex-col bg-slate-800;
}

.sidebar-panel-header {
  @apply flex h-16 w-full items-center justify-between pl-4 pr-1;
}

.sidebar-panel-body {
  @apply h-[calc(100%-4.5rem)] overflow-x-hidden pb-6 mt-5;
}

.sidebar-panel-body .menu-separator {
  @apply my-3 h-px bg-slate-700;
}

.sidebar-panel-body .submenu-separator {
  @apply my-1 h-px bg-slate-600;
}

.sidebar-panel-body .bullet-list {
  @apply h-1.5 w-1.5 rounded-full border border-current opacity-40;
}

.sidebar-panel-body .menu-link-button {
  @apply flex w-full items-center justify-between p-2 outline-none text-slate-200 hover:text-slate-50 cursor-pointer rounded-lg;
}

.sidebar-panel-body .submenu-link {
  @apply flex items-center justify-between p-2 text-sm  outline-none duration-300 ease-in-out hover:pl-4 text-slate-200 hover:text-slate-50;
}

.menu-link-button.router-link-active {
  @apply font-extrabold;
}

.menu-link-button.router-link-active > i {
  @apply rotate-90 transition transform-gpu;
}
</style>
