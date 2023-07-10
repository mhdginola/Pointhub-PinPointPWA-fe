<script setup lang="ts">
import { useRoute } from 'vue-router'
import invite from './invite.vue'
import report from './../export.vue'
import { computed } from 'vue'

const route = useRoute()
const activeRoute = (name: string) => {
  return route.name == name
}
const activeComponent = computed(() => {
  return route.name == 'report' ? report : invite
})
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <div class="flex flex-row gap-3">
      <RouterLink
        class="font-bold lg:text-3xl text-2xl mb-3 cursor-pointer p-2 rounded-lg"
        :class="activeRoute('invite') ? 'font-bold' : 'text-secondary'"
        to="/invite"
        >Invite User</RouterLink
      >
      <RouterLink
        class="font-bold lg:text-3xl text-2xl mb-3 cursor-pointer p-2 rounded-lg"
        :class="activeRoute('report') ? 'font-bold' : 'text-secondary'"
        to="/report"
        >Report</RouterLink
      >
    </div>
    <component :is="activeComponent" />
  </div>
</template>
