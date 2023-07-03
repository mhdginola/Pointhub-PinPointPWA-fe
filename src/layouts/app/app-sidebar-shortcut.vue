<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useSidebarMenuStore } from '@/stores/sidebar-menu'
import { useRoute } from 'vue-router'

const sidebarMenuStore = useSidebarMenuStore()
const sidebarStore = useSidebarStore()
const route = useRoute()
const isActiveRoutes = (name: string) => {
  return route.name?.toString().toLowerCase() == name.toLowerCase()
}
</script>

<template>
  <div class="sidebar-shortcut" :class="{ 'delay-100 duration-200': !sidebarStore.isSidebarOpen }">
    <div class="sidebar-shortcut-container">
      <div class="flex pt-4">
        <router-link to="/">
          <img
            class="sidebar-logo"
            src="https://assets.pointhub.net/assets/images/logo/primary/icon-circle.png"
            alt="logo"
          />
        </router-link>
      </div>
      <div class="sidebar-shortcut-body">
        <router-link
          v-for="(shortcut, index) in sidebarMenuStore.$state.shortcut"
          :key="shortcut.icon"
          :to="shortcut.path as string"
          class="sidebar-shortcut-link"
          :class="{
            'bg-slate-300/20': isActiveRoutes(shortcut.name)
          }"
        >
          <i :class="`block text-2xl ${shortcut.icon}`"></i>
          <span class="lg:block hidden text-2xl" v-text="shortcut.name"></span>
        </router-link>
      </div>
      <div class="my-2">
        <button class="sidebar-shortcut-link">
          <i class="i-fas-power-off block text-2xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-logo {
  @apply h-10 w-10 transition-transform duration-500 hover:rotate-[360deg];
}

.sidebar-shortcut {
  @apply fixed lg:w-[var(--sidebar-shortcut-width-lg)] w-[var(--sidebar-shortcut-width)] h-full z-40 -translate-x-full opacity-100 bg-slate-700 lg:bg-transparent;
}

.sidebar-shortcut-container {
  @apply flex h-full w-full flex-col items-center lg:items-start lg:px-5 border-r bg-slate-800 border-slate-700  lg:bg-transparent;
}

.sidebar-shortcut-body {
  @apply flex grow flex-col space-y-4 overflow-y-auto pt-6 text-slate-200;
}

.is-sidebar-open .sidebar-shortcut {
  @apply translate-x-0 ease-out;
}

.sidebar-shortcut-link {
  @apply flex h-11 w-11 lg:w-full lg:justify-start lg:gap-2 lg:px-2 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25;
}
</style>
