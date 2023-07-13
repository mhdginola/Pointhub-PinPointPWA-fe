<script setup lang="ts">
import AppSidebarShortcut from './app-sidebar-shortcut.vue'
import AppSidebarPanel from './app-sidebar-panel.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useSidebarMenuStore } from '@/stores/sidebar-menu'
import { useRoute, useRouter } from 'vue-router'

const sidebarStore = useSidebarStore()
const sidebarMenuStore = useSidebarMenuStore()
const route = useRoute()
const router = useRouter()
const isActiveRoutes = (name: string) => {
  return route.name?.toString().toLowerCase() == name.toLowerCase()
}
</script>

<template>
  <!-- Main Sidebar -->
  <div class="sidebar">
    <!-- Sidebar Shortcut -->
    <app-sidebar-shortcut class="lg:block hidden" />

    <!-- Sidebar Panel -->
    <app-sidebar-panel class="lg:block hidden" />

    <!-- mobile sidebar -->
    <div
      class="block lg:hidden fixed bottom-0 w-full p-2 z-20 dark:bg-slate-900 bg-white border-t-1 dark:border-slate-800 flex flex-row justify-around"
    >
      <div
        v-for="shortcut in sidebarMenuStore.$state.shortcut[0].menu"
        class="flex justify-center p-4 rounded-lg"
        @click.prevent="
          router.push({ path: (shortcut.tempPath as string) ?? (shortcut.path as string) })
        "
      >
        <i
          :class="`block text-2xl ${
            isActiveRoutes(shortcut.name) ? shortcut.iconActive : shortcut.icon
          }`"
        ></i>
      </div>
    </div>
    <!-- Sidebar Outside -->
    <div class="h-full w-full lg:block hidden" @click="sidebarStore.closeSidebar()"></div>
  </div>
</template>

<style scoped>
.is-sidebar-open .sidebar {
  @apply lg:fixed lg:w-full lg:h-full lg:bg-black/50 lg:z-30 lg:lg:bg-black/0 lg:w-0 lg:h-0;
}
</style>
