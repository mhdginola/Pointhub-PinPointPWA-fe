<script setup lang="ts">
import Filter from '@/components/filter-component.vue'
import Attendances from '@/components/attendances-component.vue'
import { onMounted, reactive } from 'vue'
import { useAttendanceStore, type attendanceState } from '@/stores/attendance'
import { useUserStore } from '@/stores/auth'

const user = useUserStore()
const attendance = useAttendanceStore()

const filter = reactive({
  dateFrom: '',
  dateTo: '',
  users: [...user.users]
})

const setAttendances = () => {
  // let filterByUser: attendanceState[] =
  //   filter.users.length > 0
  //     ? attendance.attendances.filter((acc) => filter.users.includes(acc.email))
  //     : attendance.attendances
  // if (filter.dateFrom) {
  //   filterByUser = filterByUser.filter((dt) => {
  //     return (
  //       moment(dt.timestamp).toDate().getTime() >=
  //       moment(filter.dateFrom, 'DD-MM-YYYY').toDate().getTime()
  //     )
  //   })
  // }
  // if (filter.dateTo) {
  //   filterByUser = filterByUser.filter(
  //     (dt) =>
  //       moment(dt.timestamp).toDate().getTime() <=
  //       moment(filter.dateTo, 'DD-MM-YYYY').add(1, 'day').toDate().getTime()
  //   )
  // }
  // filterByUser = filterByUser.sort((a: attendanceState, b: attendanceState) => {
  //   if (a.timestamp.valueOf() < b.timestamp.valueOf()) {
  //     return 1
  //   }
  //   if (a.timestamp.valueOf() > b.timestamp.valueOf()) {
  //     return -1
  //   }
  //   return 0
  // })
  // attendance.setAttendance(filterByUser)
}

onMounted(async () => {
  await attendance.fetchAttendaces()
})
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between">
      <span class="font-bold lg:text-5xl text-3xl mb-3 w-[fit-content]">
        Dashboard
        <hr />
      </span>
      <div class="w-auto">
        <Filter
          @apply-filter="setAttendances"
          v-model:filter-date-from="filter.dateFrom"
          v-model:filter-date-to="filter.dateTo"
          v-model:filter-user="filter.users"
        />
      </div>
    </div>
    <Attendances :attendances="attendance.attendances" />
  </div>
</template>
