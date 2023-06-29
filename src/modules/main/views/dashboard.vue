<script setup lang="ts">
import baseDatePicker from '@/components/base-datepicker.vue'
import baseInput from '@/components/base-input.vue'
import BaseModal, { type SizeType } from '@/components/base-modal.vue'
import { useAttendanceStore } from '@/stores/attendance'
import { useUserStore } from '@/stores/auth'
import { computed, reactive } from 'vue'

const attendance = useAttendanceStore()
const user = useUserStore()

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
  setTimeout(() => {
    modalRef.show = true
    modalRef.title = model.title
    modalRef.content = model.content
    modalRef.size = model.size
    modalRef.className = model.className
  }, 500)
}

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
    content: `User Filter Applied`,
    size: 'md',
    className: 'modal-filter-user-attendance-success'
  })
  filterUser.show = false
}
</script>

<template>
  <div class="flex flex-col w-full gap-2 overflow-y-auto">
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
        class="bg-slate-300/20 rounded-5 h-40 flex flex-1 justify-center items-center"
        id="profile"
        @click="filterUser.show = true"
      >
        <div class="flex flex-col items-center">
          <i class="text-20 i-fad-circle-user"></i>
          <div class="flex flex-row">{{ filterUser.selectedUser.join(', ') }}</div>
        </div>
      </button>
    </div>
    <div
      class="bg-slate-300/20 rounded-5 h-lg flex justify-center items-center"
      id="activity"
      v-if="attendance.$state.attendances.length < 1"
    >
      <h1 class="text-3xl bold">No Activity</h1>
    </div>
    <!-- data -->
    <div
      class="flex flex-col py-5"
      id="activity"
      v-else
      v-for="item in attendance.$state.attendances"
    >
      <div class="flex flex-col lg:flex-row w-full">
        <div class="lg:w-[70%] w-full">
          <div class="flex flex-col w-full">
            <!-- photo -->
            <span class="font-bold lg:text-4xl text-2xl mb-3">Photo</span>
            <div class="bg-slate-300/20 rounded-5 h-80 flex justify-center items-center">
              <img :src="item.photo" class="h-75% rounded-5" />
            </div>
          </div>
        </div>
        <div class="lg:w-[30%] w-full">
          <div class="flex flex-col w-full lg:px-5 lg:mt-0 mt-3 h-full">
            <!-- location -->
            <div class="flex flex-col">
              <span class="font-bold lg:text-4xl text-2xl mb-3">Location</span>
              <span class="lg:text-xl text-lg" v-text="item.location"></span>
            </div>
            <!-- tag & time -->
            <div class="flex lg:flex-col flex-row justify-between lg:my-a mt-5">
              <div class="flex flex-col">
                <span class="font-bold lg:text-4xl text-2xl">Tag Location</span>
                <span class="lg:text-xl text-lg" v-text="item.tagLocation"></span>
              </div>
              <span class="lg:text-xl text-lg" v-text="item.timestamp"></span>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-secondary border-1 w-full mt-5" />
    </div>

    <Teleport to="body">
      <component
        :is="BaseModal"
        :is-open="filterDate.show"
        @on-close="filterDate.show = false"
        size="lg"
        class="modal-filter-date-attendance"
      >
        <template #content>
          <div class="max-h-90vh overflow-auto p-4">
            <h2 class="py-4 text-2xl font-bold">Report Period</h2>
            <form class="space-y-8" @submit.prevent="applyFilterDate">
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
        class="modal-filter-date-attendance"
      >
        <template #content>
          <div class="max-h-90vh overflow-auto p-4">
            <h2 class="py-4 text-2xl font-bold">List Person</h2>
            <div class="space-y-8 flex flex-col">
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
                  />
                  {{ item }}
                </label>
              </div>
              <button class="btn btn-primary btn-block mt-3" @click.prevent="applyFilterUser">
                Save
              </button>
              <button
                class="btn bg-transparent border-1 border-secondary btn-block mt-3"
                type="button"
                @click="filterUser.show = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </template>
      </component>

      <component
        :is="BaseModal"
        :is-open="modalRef.show"
        @on-close="modalRef.show = false"
        :size="modalRef.size"
        :class="modalRef.className"
      >
        <template #content>
          <div class="max-h-90vh overflow-auto p-4">
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
  </div>
</template>
