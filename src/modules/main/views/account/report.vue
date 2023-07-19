<script setup lang="ts">
import baseButton from '@/components/base-button.vue'
import { useAccountStore, type report } from '@/stores/account'
import { onMounted, reactive, ref, type Ref } from 'vue'
import moment from 'moment'
import Filter from '@/components/filter-component.vue'
import Table from '@/components/table-component.vue'
import Row from '@/components/table-row-component.vue'
import Col from '@/components/table-col-component.vue'
import { useUserStore } from '@/stores/auth'
import { openModalNotification } from '@/plugins/modal-notification'

const account = useAccountStore()
const user = useUserStore()
const filterModel = reactive({
  dateFrom: '',
  dateTo: '',
  users: [...user.users]
})

const reports: Ref<report[]> = ref([])
const setReports = () => {
  let data =
    filterModel.users.length > 0
      ? account.reports.filter((acc) => filterModel.users.includes(acc.user))
      : account.reports
  if (filterModel.dateFrom) {
    data = data.filter((dt) => {
      return (
        moment(dt.timestamp).toDate().getTime() >=
        moment(filterModel.dateFrom, 'DD-MM-YYYY').toDate().getTime()
      )
    })
  }
  if (filterModel.dateTo) {
    data = data.filter(
      (dt) =>
        moment(dt.timestamp).toDate().getTime() <=
        moment(filterModel.dateTo, 'DD-MM-YYYY').add(1, 'day').toDate().getTime()
    )
  }
  if (user.role == 'user') {
    data = data.filter((x) => x.user.toLowerCase() == user.username.toLowerCase())
  }

  reports.value = data
}
const exportReport = () => {
  openModalNotification({
    show: true,
    title: 'Exporting',
    content: `Downloading... please wait`,
    size: 'md',
    className: 'modal-export-attendance-progress'
  })
}
onMounted(() => {
  setReports()
})
</script>

<template>
  <div class="flex flex-col">
    <div class="bg-slate-300/20 lg:px-5 px-0 py-5 rounded-5">
      <div class="flex lg:justify-end justify-center items-center gap-2 lg:px-0 px-5">
        <div class="w-auto">
          <Filter
            @apply-filter="setReports"
            v-model:filter-date-from="filterModel.dateFrom"
            v-model:filter-date-to="filterModel.dateTo"
            v-model:filter-user="filterModel.users"
          />
        </div>
        <baseButton
          class="bg-white dark:bg-slate-800 !text-slate-5 !dark:text-slate border-1 border-slate flex items-center export-attendance gap-3 whitespace-nowrap"
          @click="exportReport"
        >
          <span class="hidden lg:block">Export</span>
          <i class="i-far-download block"></i>
        </baseButton>
        <baseButton
          class="bg-white dark:bg-slate-800 !text-slate-5 !dark:text-slate border-1 border-slate flex items-center whitespace-nowrap gap-3"
          @click=";[account.mockReport(), setReports()]"
        >
          <span class="hidden lg:block">Mock Data</span>
          <i class="i-far-flask block"></i>
        </baseButton>
      </div>
      <Table :cols="['#', 'Date', 'Time', 'User', 'Location']">
        <template #body>
          <Row v-for="(item, index) in reports" v-if="reports.length > 0">
            <template #col>
              <Col> {{ index + 1 }}</Col>
              <Col> {{ moment(item.timestamp).format('DD-MM-YYYY') }}</Col>
              <Col> {{ moment(item.timestamp).format('HH:mm') }}</Col>
              <Col> {{ item.user }}</Col>
              <Col> {{ item.location }}</Col>
            </template>
          </Row>
          <Row v-else>
            <template #col>
              <Col colspan="5" class="text-center"> No Data</Col>
            </template>
          </Row>
        </template>
      </Table>
    </div>
  </div>
</template>
