<script setup lang="ts">
import Filter from '@/components/filter-component.vue'
import Attendances from '@/components/attendances-component.vue'
import { reactive } from 'vue'

const filter = reactive({
  dateFrom: '',
  dateTo: '',
  users: []
})
</script>

<template>
  <div class="flex flex-col w-full gap-2 overflow-y-auto">
    <div class="flex justify-end">
      <div class="w-auto">
        <Filter
          v-model:filter-date-from="filter.dateFrom"
          v-model:filter-date-to="filter.dateTo"
          v-model:filter-user="filter.users"
        />
      </div>
    </div>
    <Attendances />
  </div>
</template>
