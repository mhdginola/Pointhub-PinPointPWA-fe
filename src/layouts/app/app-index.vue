<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppPreloader from '@/components/app-preloader.vue'
import AppHeader from './app-header.vue'
import AppSidebar from './app-sidebar.vue'
import AppFooter from './app-footer.vue'
import { useSidebarStore } from '@/stores/sidebar'

const sidebar = useSidebarStore()
</script>

<template>
  <!-- Preloader -->
  <app-preloader class="print:hidden"></app-preloader>

  <!-- Page Wrapper -->
  <div class="h-100vh flex flex-col grow bg-slate-50 dark:bg-slate-900">
    <!-- Sidebar -->
    <app-sidebar class="print:hidden"></app-sidebar>

    <div
      class="flex flex-col h-full"
      :class="{
        'xl:ml-[calc(var(--sidebar-shortcut-width)+var(--sidebar-panel-width))]':
          !sidebar.isSidebarOpen,
        'xl:ml-[calc(var(--sidebar-shortcut-width))]': sidebar.isSidebarOpen
      }"
    >
      <!-- Header -->
      <app-header class="print:hidden"></app-header>
      <!-- Main Content -->
      <div
        class="flex flex-col pb-20 pt-10 w-full flex-1 overflow-y-auto px-5"
        :class="{
          'xl:pr-[calc(var(--sidebar-panel-width)+var(--sidebar-shortcut-width)+var(--sidebar-shortcut-width))] xl:pl-[calc(var(--sidebar-panel-width)+var(--sidebar-shortcut-width))]':
            sidebar.isSidebarOpen,
          'xl:pr-[calc(var(--sidebar-panel-width)+var(--sidebar-shortcut-width)+var(--sidebar-shortcut-width))] xl:pl-[calc(var(--sidebar-shortcut-width))]':
            !sidebar.isSidebarOpen //open sidebar
        }"
      >
        <router-view class="flex-1" />
        <app-footer class="pt-4"></app-footer>
      </div>
    </div>
  </div>
</template>
