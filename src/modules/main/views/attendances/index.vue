<script setup lang="ts">
import BaseButton from '@/components/base-button.vue'
import Maps from '@/components/gps-access-component.vue'
import Photo from '@/components/photo-component.vue'
import TagLocation from '@/components/tag-location.vue'
import { useBaseNotification, TypesEnum } from '@/composable/notification'
import { useGetLocationStore } from '@/stores/get-location'
import { ref } from 'vue'
import { usePhotoStore } from '@/stores/get-photo'
import { useAttendanceStore, type attendanceState } from '@/stores/attendance'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/auth'
import { useAccountStore } from '@/stores/account'
import { openModalNotification } from '@/plugins/modal-notification'

const user = useUserStore()
const router = useRouter()
const account = useAccountStore()
const { notification } = useBaseNotification()
const attendance = useAttendanceStore()
const locationStore = useGetLocationStore()
const photoStore = usePhotoStore()
const tagLocation = ref()

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
  if (!tagLocation.value) {
    openNotif({
      title: 'Error',
      text: 'Please Select Tag Location',
      type: TypesEnum.Danger
    })
    return
  }
  let data = <attendanceState>{
    name: user.username,
    address: 'Jakarta',
    email: 'hafiz@gmail.com',
    location: await locationStore.getLocationName(),
    photo: photoStore.$state.photo,
    tagLocation: tagLocation.value,
    timestamp: new Date()
  }
  attendance.setAttendance(data)
  account.reports.push({
    location: data.location,
    timestamp: data.timestamp,
    user: data.name
  })
  openModalNotification({
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
  <div class="flex flex-col gap-2">
    <!-- photo -->
    <Photo />

    <!-- map -->
    <Maps />

    <!-- tag -->
    <TagLocation v-model="tagLocation" />

    <BaseButton class-name="bg-green-primary" @click.prevent="SubmitAttendance">
      submit
    </BaseButton>
  </div>
</template>
