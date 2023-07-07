<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/auth'
import BaseDropdown from '@/components/base-dropdown.vue'
import ComponentNotification from './component-notification.vue'
import ComponentToggleSidebar from './component-toggle-sidebar.vue'
import logo from '@/assets/images/logo.png'

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
        <div class="flex justify-center items-center">
          <!-- <component :is="ComponentToggleSidebar" class="pr-4 lg:hidden" /> -->

          <img :src="logo" class="h-10 lg:hidden block" />
        </div>

        <!-- Right: Header Buttons -->
        <div class="flex flex-row items-center space-x-2">
          <component :is="ComponentNotification" />

          <component :is="BaseDropdown" position="right">
            <template #trigger>
              <div class="relative flex space-x-2">
                <div class="avatar avatar-xs flex justify-center items-center">
                  <i class="i-far-user text-2xl"></i>
                </div>
                <div class="hidden lg:block">
                  <span class="block">John Doe</span>
                  <span class="block text-xs" v-text="user.role"></span>
                </div>
              </div>
            </template>
            <div class="p-1">
              <div
                class="p-2 flex items-center gap-2 hover:bg-slate-300/20"
                @click="user.switchRole()"
              >
                <i class="i-far-circle-user block"></i>
                <span>Switch Role</span>
              </div>
            </div>
            <div class="p-1">
              <div
                class="p-2 flex items-center gap-2 hover:bg-slate-300/20"
                @click="user.signOut()"
              >
                <i class="i-far-power-off block"></i>
                <span>Logout</span>
              </div>
            </div>
          </component>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav.header {
  @apply sticky top-0 flex w-full h-60px z-20 px-4 shadow lg:shadow-none lg:border-b-slate-200  bg-white dark:bg-slate-900;
}

.is-sidebar-open nav.header {
  @apply lg:w-[calc(100%-(var(--sidebar-panel-width)))] lg:ml-[calc(var(--sidebar-panel-width))] duration-200;
}
</style>
