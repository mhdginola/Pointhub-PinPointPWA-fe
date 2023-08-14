<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/auth'
import BaseDropdown from '@/components/base-dropdown.vue'
import ComponentNotification from './component-notification.vue'
import ComponentToggleSidebar from './component-toggle-sidebar.vue'
import logo from '@/assets/images/logo.png'
import logo_dark from '@/assets/images/logo-dark.png'
import { useGlobalStore } from '@/stores/global'

const user = useUserStore()
const global = useGlobalStore()
</script>

<template>
  <!-- Header Wrapper-->
  <nav class="header">
    <!-- Header  -->
    <div class="relative w-full flex">
      <div class="w-full flex items-center justify-between">
        <!-- Left: Sidebar Toggle Button -->
        <div class="flex justify-center items-center">
          <component :is="ComponentToggleSidebar" class="px-5 xl:block hidden" />

          <img :src="global.isDarkMode ? logo_dark : logo" class="h-7 lg:hidden block" />
        </div>

        <!-- Right: Header Buttons -->
        <div class="flex flex-row items-center space-x-2">
          <component :is="ComponentNotification" />
          <div
            class="avatar avatar-xs flex justify-center items-center"
            @click="global.toggleDarkMode()"
          >
            <i class="i-far-moon text-2xl"></i>
          </div>

          <component :is="BaseDropdown" position="right">
            <template #trigger>
              <div class="relative flex space-x-2">
                <div class="avatar avatar-xs flex justify-center items-center">
                  <i class="i-far-user text-2xl"></i>
                </div>
                <div class="hidden lg:block">
                  <span class="block">{{ user.username }}</span>
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
                <span>({{ user.role }}) Switch Role</span>
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
  @apply sticky top-0 flex w-full z-20 p-4 shadow  lg:border-b-slate-200  bg-white dark:bg-slate-900;
}
</style>
