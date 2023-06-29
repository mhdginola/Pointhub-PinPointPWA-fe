<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/auth'
import BaseDropdown from '@/components/base-dropdown.vue'
import ComponentNotification from './component-notification.vue'
import ComponentToggleSidebar from './component-toggle-sidebar.vue'

const htmlTag = document.getElementsByTagName('html')[0]
const isDarkMode = ref(htmlTag.classList.contains('dark'))

function toggleDarkMode() {
  if (htmlTag.classList.contains('dark')) {
    htmlTag.classList.remove('dark')
    localStorage.setItem('dark-mode', 'light')
  } else {
    htmlTag.classList.add('dark')
    localStorage.setItem('dark-mode', 'dark')
  }

  isDarkMode.value = htmlTag.classList.contains('dark')
}

const isOpen = ref(false)

const user = useUserStore()
</script>

<template>
  <!-- Header Wrapper-->
  <nav class="header">
    <!-- Header  -->
    <div class="relative w-full flex">
      <div class="w-full flex items-center justify-between">
        <!-- Left: Sidebar Toggle Button -->
        <div class="flex">
          <!-- <component :is="ComponentToggleSidebar" class="pr-4 lg:hidden" /> -->
          <h1 class="text-base font-extrabold lg:text-lg">
            PAPP <span class="font-normal">STARTER</span>
          </h1>
        </div>

        <!-- Right: Header Buttons -->
        <div class="flex flex-row items-center space-x-2">
          <span v-text="user.role" class="uppercase"></span>
          <span>|</span>
          <button class="p-2 rounded-lg uppercase bg-slate-300/20" @click="user.switchRole()">
            switch role
          </button>
          <!-- <component :is="ComponentNotification" /> -->

          <!-- <component :is="BaseDropdown">
            <template #trigger>
              <div
                class="relative flex space-x-2 lg:min-w-50 max-w-75 items-center w-full cursor-pointer rounded-lg py-2 pl-3 text-left focus-visible:border-indigo-500 sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-orange-300"
              >
                <div class="avatar avatar-xs">
                  <img class="mask mask-squircle" src="https://via.placeholder.com/150" />
                </div>
                <div class="hidden lg:block">
                  <span class="block">John Doe</span>
                  <span class="block text-xs">Admin Purchasing</span>
                </div>
              </div>
            </template>
            <div class="p-1">
              <div class="p-2 flex items-center gap-2">
                <i class="i-far-circle-user block"></i>
                <span>Profile</span>
              </div>
              <div class="p-2 flex items-center gap-2">
                <i class="i-far-gear block"></i>
                <span>Setting</span>
              </div>
            </div>
            <div class="p-1">
              <button
                @click="toggleDarkMode()"
                class="space-x-2 flex w-full items-center rounded-md px-2 py-2 text-sm"
              >
                <i v-if="isDarkMode" class="i-ph-sun block"></i>
                <i v-else class="i-ph-moon-fill block"></i>
                <span>Dark Mode</span>
              </button>
            </div>
            <div class="p-1">
              <div class="p-2 flex items-center gap-2">
                <i class="i-far-power-off block"></i>
                <span>Logout</span>
              </div>
            </div>
          </component> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav.header {
  @apply sticky top-0 flex w-full h-60px z-20 px-4 bg-white dark:bg-slate-900 shadow;
}

.is-sidebar-open nav.header {
  @apply lg:w-[calc(100%-(var(--sidebar-panel-width)))] lg:ml-[calc(var(--sidebar-panel-width))] duration-200;
}
</style>
