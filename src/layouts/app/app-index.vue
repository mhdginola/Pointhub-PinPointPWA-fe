<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppPreloader from '@/components/app-preloader.vue'
import AppHeader from './app-header.vue'
import AppSidebar from './app-sidebar.vue'
import AppFooter from './app-footer.vue'
</script>

<template>
  <!-- Preloader -->
  <app-preloader class="print:hidden"></app-preloader>

  <!-- Page Wrapper -->
  <div class="flex flex-col grow bg-white dark:bg-slate-900 lg:px-[15%] w-full min-h-screen">
    <!-- Header -->
    <app-header class="print:hidden"></app-header>
    <!-- Sidebar -->
    <app-sidebar class="print:hidden"></app-sidebar>
    <!-- Main Content -->
    <div class="main-container">
      <main class="main-content pt-2 pb-20">
        <router-view />
      </main>
      <app-footer class="pt-4"></app-footer>
    </div>
  </div>
</template>

<style>
.main-container {
  @apply flex flex-col py-4 w-full flex-1;
}

.is-sidebar-open .main-container {
  @apply lg:w-[calc(100%-(var(--sidebar-panel-width)))] lg:ml-[calc(var(--sidebar-panel-width))];
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
