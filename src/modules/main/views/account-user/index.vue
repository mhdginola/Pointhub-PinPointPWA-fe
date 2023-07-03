<script setup lang="ts">
import { useRoute } from 'vue-router'
import invitation from './invitation.vue'
import exportUser from './export.vue'
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
    <div class="flex flex-row gap-3">
      <RouterLink
        class="font-bold lg:text-3xl text-2xl mb-3 cursor-pointer p-2 rounded-lg"
        :class="activeRoute('invitation') ? 'bg-slate-300/20' : 'text-secondary bg-slate-700/20'"
        to="/invitation"
        >Invitation</RouterLink
      >
      <RouterLink
        class="font-bold lg:text-3xl text-2xl mb-3 cursor-pointer p-2 rounded-lg"
        :class="activeRoute('export') ? 'bg-slate-300/20' : 'text-secondary bg-slate-700/20'"
        to="/export"
        >Export</RouterLink
      >
    </div>
    <component :is="activeComponent" />
  </div>
</template>
