<script setup lang="ts">
import { ref } from 'vue'

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
</script>

<template>
  <button
    class="rounded-full bg-slate-100 p-1 dark:bg-slate-700 focus:bg-slate-200 hover:bg-slate-200 dark:focus:bg-slate-600 dark:hover:bg-slate-600"
    @click="toggleDarkMode()"
  >
    <i
      v-if="isDarkMode"
      class="i-ph-sun-fill block h-20px w-20px flex items-center justify-center text-yellow-300"
    />
    <i v-else class="i-ph-moon-fill block h-20px w-20px flex items-center justify-center" />
  </button>
</template>
