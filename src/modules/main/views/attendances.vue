<script setup lang="ts">
import baseModal, { type SizeType } from '@/components/base-modal.vue'
import Maps, { GetMapBoxLocationName } from '@/components/gps-access-component.vue'
import Photo from '@/components/photo-component.vue'
import TagLocation from '@/components/tag-location.vue'
import { useBaseNotification, TypesEnum } from '@/composable/notification'
import { useGetLocationStore } from '@/stores/get-location'
import { reactive, ref } from 'vue'
import { usePhotoStore } from '@/stores/get-photo'
import { useAttendanceStore, type attendanceState } from '@/stores/attendance'
import { useRouter } from 'vue-router'

const router = useRouter()
const { notification } = useBaseNotification()
const attendance = useAttendanceStore()
const locationStore = useGetLocationStore()
const photoStore = usePhotoStore()
const tagLocation = ref()

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

interface notifInterface {
  type: TypesEnum
  title: string
  text: string
}
const openNotif = (model: notifInterface) => {
  notification(model.title, model.text, { type: model.type })
}

const SubmitAttendance = async () => {
  if (!photoStore.$state.photo) {
    openNotif({
      title: 'Error',
      text: 'Capture Picture',
      type: TypesEnum.Danger
    })
    return
  }
  if (!locationStore.accessGPS) {
    openNotif({
      title: 'Error',
      text: 'Please Allow Location',
      type: TypesEnum.Danger
    })
    return
  }
  let data = <attendanceState>{
    name: 'Hafiz',
    address: 'Jakarta',
    email: 'hafiz@gmail.com',
    location: await GetMapBoxLocationName(),
    photo: photoStore.$state.photo,
    tagLocation: tagLocation.value,
    timestamp: new Date()
  }
  attendance.setAttendance(data)
  openModal({
    show: true,
    title: 'Success',
    content: `Create Attendance Success`,
    size: 'md',
    className: 'modal-add-attendance-success'
  })
  setTimeout(() => {
    router.push({
      name: 'dashboard'
    })
  }, 500)
}
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <div class="flex lg:flex-row flex-col w-full gap-2">
      <div class="lg:w-[60%] w-full">
        <div class="flex flex-col gap-2">
          <!-- photo -->
          <Photo />

          <!-- map -->
          <Maps />
        </div>
      </div>
      <div class="lg:w-[40%] w-full lg:px-5">
        <!-- tag -->
        <TagLocation v-model="tagLocation" />
      </div>
    </div>
    <button
      class="bg-green lg:w-[60%] w-full text-center p-2 text-white capitalize rounded-5 capitalize mt-5"
      @click.prevent="SubmitAttendance"
    >
      submit
    </button>

    <!-- modal -->
    <Teleport to="body">
      <component
        :is="baseModal"
        :is-open="modalRef.show"
        @on-close="modalRef.show = false"
        :size="modalRef.size"
      >
        <template #content>
          <div class="max-h-90vh overflow-auto p-4" :class="modalRef.className">
            <span class="py-4 text-2xl font-bold" v-html="modalRef.title"></span>
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
