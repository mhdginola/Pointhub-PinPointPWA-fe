<script setup lang="ts">
import baseDatePicker from '@/components/base-datepicker.vue'
import baseInput from '@/components/base-input.vue'
import BaseModal, { type SizeType } from '@/components/base-modal.vue'
import { useUserStore } from '@/stores/auth'
import { useAccountStore } from '@/stores/account'
import { computed, onMounted, reactive } from 'vue'
import moment from 'moment'

const user = useUserStore()
const account = useAccountStore()

const filterDate = reactive({
  from: '',
  to: '',
  show: false
})
const filterUser = reactive({
  show: false,
  selectedUser: [user.users[0]],
  searchUser: ''
})
const filteredUser = computed(() => {
  return user.users.filter((u) => u.toLowerCase().includes(filterUser.searchUser.toLowerCase()))
})
const filterAllUser = () => {
  filterUser.selectedUser.splice(0)
  filterUser.selectedUser.push(...user.users)
}

const applyFilterDate = () => {
  openModal({
    show: true,
    title: 'Applied',
    content: `Date Filter Applied`,
    size: 'md',
    className: 'modal-filter-date-attendance-success'
  })
  filterDate.show = false
}
const applyFilterUser = () => {
  openModal({
    show: true,
    title: 'Applied',
    content: `Person Filter Applied`,
    size: 'md',
    className: 'modal-filter-person-attendance-success'
  })
  filterUser.show = false
}

onMounted(() => {
  account.mockReport()
})

const filteredReport = computed(() => {
  return filterUser.selectedUser.length > 0
    ? account.reports.filter((r) =>
        filterUser.selectedUser.map((u) => u.toLowerCase()).includes(r.user.toLowerCase())
      )
    : account.reports
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
  <div class="flex flex-col mt-5">
    <div class="flex flex-row gap-2">
      <button
        class="bg-slate-300/20 rounded-5 h-40 flex flex-1 justify-center items-center filter-date-attendance"
        id="datepicker"
        @click="filterDate.show = true"
      >
        <div class="flex flex-col items-center">
          <i class="text-20 i-fad-calendar"></i>
          <div class="flex flex-row">{{ filterDate.from }} - {{ filterDate.to }}</div>
        </div>
      </button>
      <button
        class="bg-slate-300/20 rounded-5 h-40 flex flex-1 justify-center items-center filter-person-attendance"
        id="profile"
        @click="filterUser.show = true"
      >
        <div class="flex flex-col items-center">
          <i class="text-20 i-fad-circle-user"></i>
          <div class="flex flex-row">{{ filterUser.selectedUser.join(', ') }}</div>
        </div>
      </button>
    </div>

    <div class="bg-slate-300/20 p-5 rounded-5 mt-5">
      <div class="flex justify-end">
        <button class="btn bg-blue mt-3 export-attendance" @click="exportReport">
          <i class="i-fad-download text-2xl"></i>
        </button>
      </div>
      <table class="w-full mt-5 table-fixed border-secondary border-1">
        <thead class="bg-blue p-5">
          <th>#</th>
          <th>Date</th>
          <th>Time</th>
          <th>User</th>
          <th>Location</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredReport">
            <td class="px-2 border-se border-1 p-3">{{ index + 1 }}</td>
            <td class="px-2 border-se border-1 p-3">
              {{ moment(item.timestamp).format('DD/MM/YYYY') }}
            </td>
            <td class="px-2 border-se border-1 p-3">
              {{ moment(item.timestamp).format('HH:mm') }}
            </td>
            <td class="px-2 border-se border-1 p-3">{{ item.user }}</td>
            <td class="px-2 border-se border-1 p-3">{{ item.location }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Teleport to="body">
    <component
      :is="BaseModal"
      :is-open="filterDate.show"
      @on-close="filterDate.show = false"
      size="lg"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4 modal-filter-date-attendance">
          <h2 class="py-4 text-2xl font-bold">Report Period</h2>
          <form class="space-y-8 filter-date-attendance" @submit.prevent="applyFilterDate">
            <div class="flex flex-row gap-2">
              <component
                :is="baseDatePicker"
                v-model="filterDate.from"
                label="From"
                class="w-full"
                name="startDate"
              />
              <component
                :is="baseDatePicker"
                v-model="filterDate.to"
                label="To"
                class="w-full"
                name="endDate"
              />
            </div>
            <button class="btn btn-primary btn-block mt-3" type="submit">Save</button>
            <button
              class="btn bg-transparent border-1 border-secondary btn-block mt-3"
              type="button"
              @click="filterDate.show = false"
            >
              Cancel
            </button>
          </form>
        </div>
      </template>
    </component>

    <component
      :is="BaseModal"
      :is-open="filterUser.show"
      @on-close="filterUser.show = false"
      size="lg"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4 modal-filter-person-attendance">
          <h2 class="py-4 text-2xl font-bold">List Person</h2>
          <form
            class="space-y-8 flex flex-col filter-person-attendance"
            @submit.prevent="applyFilterUser"
          >
            <component
              :is="baseInput"
              v-model="filterUser.searchUser"
              label="Search"
              class="w-full"
              mode="bordered"
            />

            <button class="btn mt-3 btn-secondary mx-a" @click.prevent="filterAllUser">
              All User
            </button>
            <div class="flex flex-col">
              <label v-for="item in filteredUser">
                <input
                  type="checkbox"
                  class="border-blue mr-1"
                  v-model="filterUser.selectedUser"
                  :value="item"
                  id="filter-person"
                />
                {{ item }}
              </label>
            </div>
            <button class="btn btn-primary btn-block mt-3" type="submit">Save</button>
            <button
              class="btn bg-transparent border-1 border-secondary btn-block mt-3"
              type="button"
              @click="filterUser.show = false"
            >
              Cancel
            </button>
          </form>
        </div>
      </template>
    </component>

    <component
      :is="BaseModal"
      :is-open="modalRef.show"
      @on-close="modalRef.show = false"
      :size="modalRef.size"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4" :class="modalRef.className">
          <h2 class="py-4 text-2xl font-bold" v-html="modalRef.title"></h2>
          <div class="space-y-8">
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
