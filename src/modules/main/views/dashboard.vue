<script setup lang="ts">
import Filter from '@/components/filter-component.vue'
import Attendances from '@/components/attendances-component.vue'
import { computed, onMounted, reactive, ref, type Ref } from 'vue'
import { useAttendanceStore, type attendanceState } from '@/stores/attendance'
import { useUserStore } from '@/stores/auth'
import moment from 'moment'

const user = useUserStore()
const attendance = useAttendanceStore()

const filter = reactive({
  dateFrom: '',
  dateTo: '',
  users: [...user.users]
})

const attendances: Ref<attendanceState[]> = ref([])

const setAttendances = () => {
  let filterByUser: attendanceState[] =
    filter.users.length > 0
      ? attendance.attendances.filter((acc) => filter.users.includes(acc.name))
      : attendance.attendances

  if (filter.dateFrom) {
    filterByUser = filterByUser.filter(
      (dt) =>
        new Date(dt.timestamp).getTime() >=
        new Date(moment(filter.dateFrom).format('DD-MM-YYYY HH:mm:ss')).getTime()
    )
  }
  if (filter.dateTo) {
    filterByUser = filterByUser.filter(
      (dt) =>
        new Date(dt.timestamp).getTime() <=
        new Date(moment(filter.dateTo).format('DD-MM-YYYY HH:mm:ss')).getTime()
    )
  }

  filterByUser = filterByUser.sort((a: attendanceState, b: attendanceState) => {
    if (a.timestamp.valueOf() < b.timestamp.valueOf()) {
      return 1
    }
    if (a.timestamp.valueOf() > b.timestamp.valueOf()) {
      return -1
    }
    return 0
  })

  attendances.value = filterByUser
}

onMounted(() => {
  setAttendances()
})
</script>

<template>
  <div class="flex flex-col w-full overflow-y-auto">
    <div class="flex justify-end">
      <div class="w-auto">
        <Filter
          @apply-filter="setAttendances"
          v-model:filter-date-from="filter.dateFrom"
          v-model:filter-date-to="filter.dateTo"
          v-model:filter-user="filter.users"
        />
      </div>
    </div>
    <Attendances :attendances="attendances" />
  </div>
</template>
