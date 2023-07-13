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
        'lg:ml-[calc(var(--sidebar-shortcut-width)+var(--sidebar-panel-width))]':
          !sidebar.isSidebarOpen,
        'lg:ml-[calc(var(--sidebar-shortcut-width))]': sidebar.isSidebarOpen
      }"
    >
      <!-- Header -->
      <app-header class="print:hidden"></app-header>
      <!-- Main Content -->
      <div class="main-container">
        <main class="main-content">
          <router-view />
        </main>
        <app-footer class="pt-4"></app-footer>
      </div>
    </div>
  </div>
</template>

<style>
.main-container {
  @apply flex flex-col py-4 w-full flex-1;
}

.main-content {
  @apply px-4 flex-1 overflow-y-auto;
}

.main-content-container {
  @apply my-2 space-y-5;
}

.main-content-header {
  @apply flex space-x-4 py-2 overflow-x-hidden;
}

.main-content-body {
  @apply flex flex-col space-y-5;
}
</style>
