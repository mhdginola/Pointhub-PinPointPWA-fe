<script setup lang="ts">
const props = defineProps<{
  cols: string[]
}>()
</script>
<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <table class="w-full text-sm text-left text-slate-500 dark:text-slate-400">
      <thead
        class="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3" v-for="col in props.cols" :key="col">
            <div class="flex flex-row items-center gap-1">
              <!-- <i class="i-far-sort-up block"></i> -->
              {{ col }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>
  </div>
</template>
