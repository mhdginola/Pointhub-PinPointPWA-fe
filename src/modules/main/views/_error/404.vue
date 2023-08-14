<template>
  <div class="w-screen h-screen min-h-screen flex flex-col justify-center items-center gap-3">
    <h1 class="capitalize">page not found</h1>
    <BaseButton class-name="bg-blue" @click.prevent="router.push({ path: '/' })"
      >back home</BaseButton
    >
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/base-button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
