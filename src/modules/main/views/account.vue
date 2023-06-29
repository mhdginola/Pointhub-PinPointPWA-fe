<script setup lang="ts">
import accountUser from './account-user/index.vue'
import accountAdmin from './account-admin/index.vue'
import { useUserStore } from '@/stores/auth'

const user = useUserStore()
</script>
<template>
  <component :is="user.role == 'user' ? accountUser : accountAdmin"></component>
</template>
