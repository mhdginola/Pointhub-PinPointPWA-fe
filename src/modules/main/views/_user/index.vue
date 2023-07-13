<script setup lang="ts">
import { useRoute } from 'vue-router'
import invitation from './invitation/index.vue'
import exportUser from './../export.vue'
import { computed } from 'vue'

const route = useRoute()
const activeRoute = (name: string) => {
  return route.name == name
}
const activeComponent = computed(() => {
  return route.name == 'invitation' ? invitation : exportUser
})
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <div class="flex flex-row gap-3 block lg:hidden">
      <RouterLink
        class="lg:text-3xl text-2xl mb-3 cursor-pointer py-2 px-5 rounded-100 hover:bg-slate-200 dark:hover:bg-slate-300/20"
        :class="activeRoute('invitation') ? 'font-bold' : 'text-secondary'"
        to="/invitation"
        >Invitation</RouterLink
      >
      <RouterLink
        class="lg:text-3xl text-2xl mb-3 cursor-pointer py-2 px-5 rounded-100 hover:bg-slate-200 dark:hover:bg-slate-300/20"
        :class="activeRoute('export') ? 'font-bold' : 'text-secondary'"
        to="/export"
        >Export</RouterLink
      >
    </div>
    <component :is="activeComponent" />
  </div>
</template>
