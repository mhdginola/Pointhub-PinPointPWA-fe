<script setup lang="ts">
import AppSidebarShortcut from './app-sidebar-shortcut.vue'
// import AppSidebarPanel from './app-sidebar-panel.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useSidebarMenuStore } from '@/stores/sidebar-menu'
import { useRoute, useRouter } from 'vue-router'

const sidebarStore = useSidebarStore()
const sideBarMenu = useSidebarMenuStore()
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
    <app-sidebar-shortcut />

    <!-- Sidebar Outside -->
    <div class="h-full w-full" @click="sidebarStore.closeSidebar()"></div>

    <!-- mobile sidebar -->
    <div
      class="block lg:hidden fixed bottom-0 w-full p-2 z-20 bg-slate-800 shadow flex flex-row justify-around"
    >
      <div
        v-for="shortcut in sideBarMenu.$state.shortcut"
        class="flex justify-center p-4 rounded-lg"
        @click.prevent="router.push({ path: shortcut.path as string })"
        :class="{
          'bg-slate-300/20': isActiveRoutes(shortcut.name)
        }"
      >
        <i :class="`block text-2xl ${shortcut.icon}`"></i>
        <span class="lg:block hidden text-2xl" v-text="shortcut.name"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-sidebar-open .sidebar {
  @apply fixed w-full h-full z-30 bg-black/50  lg:bg-black/0 lg:w-0 lg:h-0;
}
</style>
