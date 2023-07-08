<script setup lang="ts">
import BaseModal, { type SizeType } from '@/components/base-modal.vue'
import baseButton from '@/components/base-button.vue'
import { useAccountStore } from '@/stores/account'
import { computed, onMounted, reactive } from 'vue'
import moment from 'moment'
import Filter from '@/components/filter-component.vue'
import Table from '@/components/table-component.vue'
import Row from '@/components/table-row-component.vue'
import Col from '@/components/table-col-component.vue'
import { useUserStore } from '@/stores/auth'

const account = useAccountStore()
const user = useUserStore()
const filterModel = reactive({
  dateFrom: '',
  dateTo: '',
  users: [...user.users]
})

const filteredReport = computed(() => {
  let filterByUser =
    filterModel.users.length > 0
      ? account.reports.filter((acc) => filterModel.users.includes(acc.user))
      : account.reports
  if (filterModel.dateFrom) {
    filterByUser = filterByUser.filter(
      (dt) =>
        new Date(dt.timestamp).getTime() >=
        new Date(moment(filterModel.dateFrom).format('DD-MM-YYYY HH:mm:ss')).getTime()
    )
  }
  if (filterModel.dateTo) {
    filterByUser = filterByUser.filter(
      (dt) =>
        new Date(dt.timestamp).getTime() <=
        new Date(moment(filterModel.dateTo).format('DD-MM-YYYY HH:mm:ss')).getTime()
    )
  }
  return filterByUser
})
const exportReport = () => {
  openModal({
    show: true,
    title: 'Exporting',
    content: `Downloading... please wait`,
    size: 'md',
    className: 'modal-export-attendance-progress'
  })
}
onMounted(() => {
  // account.mockReport()
})

interface modalInterface {
  show: boolean
  title: string
  content: string
  size: SizeType
  className?: string
}
const modalRef = reactive<modalInterface>({
  show: false,
  title: '',
  content: '',
  size: 'md',
  className: ''
})
const openModal = (model: modalInterface) => {
  modalRef.show = true
  modalRef.title = model.title
  modalRef.content = model.content
  modalRef.size = model.size
  modalRef.className = model.className
}
</script>

<template>
  <div class="flex flex-col">
    <div class="bg-slate-300/20 lg:px-5 px-0 py-5 rounded-5">
      <div class="flex lg:justify-end justify-center items-center gap-2 lg:px-0 px-5">
        <div class="w-auto">
          <Filter
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
          @click="account.mockReport()"
        >
          <span class="hidden lg:block">Mock Data</span>
          <i class="i-far-flask block"></i>
        </baseButton>
      </div>
      <Table :cols="['#', 'Date', 'Time', 'User', 'Location']">
        <template #body>
          <Row v-for="(item, index) in filteredReport" v-if="filteredReport.length > 0">
            <template #col>
              <Col> {{ index + 1 }}</Col>
              <Col> {{ moment(item.timestamp).format('DD/MM/YYYY') }}</Col>
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

  <Teleport to="body">
    <component
      :is="BaseModal"
      :is-open="modalRef.show"
      @on-close="modalRef.show = false"
      :size="modalRef.size"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4" :class="modalRef.className">
          <h2 class="py-4 text-2xl font-bold" v-html="modalRef.title"></h2>
          <div class="gap-5">
            {{ modalRef.content }}
            <button class="btn btn-primary btn-block mt-3" @click="modalRef.show = false">
              Close
            </button>
          </div>
        </div>
      </template>
    </component>
  </Teleport>
</template>
