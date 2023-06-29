<script setup lang="ts">
import AppSidebarShortcut from './app-sidebar-shortcut.vue'
import AppSidebarPanel from './app-sidebar-panel.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useSidebarMenuStore } from '@/stores/sidebar-menu'
import { useRoute } from 'vue-router'

const sidebarStore = useSidebarStore()
const sideBarMenu = useSidebarMenuStore()
const route = useRoute()
const isActiveRoutes = (name: string) => {
  return route.name == name
}
</script>

<template>
  <!-- Main Sidebar -->
  <div class="sidebar">
    <!-- Sidebar Shortcut -->
    <app-sidebar-shortcut />

    <!-- Sidebar Outside -->
    <div class="h-full w-full" @click="sidebarStore.closeSidebar()"></div>

    <!--  -->
    <div
      class="block lg:hidden fixed bottom-0 w-full p-5 z-20 bg-slate-800 shadow flex flex-row justify-around"
    >
      <router-link
        v-for="(shortcut, index) in sideBarMenu.$state.shortcut"
        :key="shortcut.icon"
        :to="shortcut.path as string"
        class="p-2"
        :class="{
          'text-slate-300': isActiveRoutes(shortcut.name)
        }"
      >
        <i :class="`block text-2xl ${shortcut.icon}`"></i>
        <span class="lg:block hidden text-2xl" v-text="shortcut.name"></span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.is-sidebar-open .sidebar {
  @apply fixed w-full h-full z-30 bg-black/50  lg:bg-black/0 lg:w-0 lg:h-0;
}
</style>
