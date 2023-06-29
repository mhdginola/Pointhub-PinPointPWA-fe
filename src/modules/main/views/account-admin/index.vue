<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const activeRoute = (name: string) => {
  return route.name == name
}
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <div class="flex flex-row gap-3">
      <RouterLink
        class="font-bold lg:text-3xl text-2xl mb-3 cursor-pointer p-2 rounded-lg"
        :class="activeRoute('invite') ? 'bg-slate-300/20' : 'text-secondary bg-slate-700/20'"
        to="/account/invite"
        >Invite User</RouterLink
      >
      <RouterLink
        class="font-bold lg:text-3xl text-2xl mb-3 cursor-pointer p-2 rounded-lg"
        :class="activeRoute('groups') ? 'bg-slate-300/20' : 'text-secondary bg-slate-700/20'"
        to="/account/groups"
        >Groups</RouterLink
      >
      <RouterLink
        class="font-bold lg:text-3xl text-2xl mb-3 cursor-pointer p-2 rounded-lg"
        :class="activeRoute('export') ? 'bg-slate-300/20' : 'text-secondary bg-slate-700/20'"
        to="/account/export"
        >Report</RouterLink
      >
    </div>
    <RouterView />
  </div>
</template>
