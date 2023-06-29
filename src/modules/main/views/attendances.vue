<script setup lang="ts">
import baseSelect from '@/components/base-select.vue'
import baseInput from '@/components/base-input.vue'
import baseModal, { type SizeType } from '@/components/base-modal.vue'
import { useBaseNotification, TypesEnum } from '@/composable/notification'
import { useGetLocationStore } from '@/stores/get-location'
import { computed, reactive, ref, watch } from 'vue'
import { MapboxMap, MapboxMarker } from 'vue-mapbox-ts'
import { useScreenBreakpointStore } from '@/stores/screen-breakpoint'
import { usePhotoStore } from '@/stores/get-photo'
import { useAttendanceStore, type attendanceState } from '@/stores/attendance'
import { useRouter } from 'vue-router'
const MapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN
const MapBoxAPI = import.meta.env.VITE_MAPBOX_API
const GetMapBoxLocationName = async () => {
  // this func return location name based on coordinate given by mapbox location
  let response = await fetch(
    `${MapBoxAPI}/${locationStore.$state.longitude},${locationStore.$state.latitude}.json?access_token=${MapBoxToken}`
  )
  if (!response.ok) {
    alert('error getting location detail')
  }
  let result = await response.json()
  if (result.features.length > 0) {
    return result.features[0]?.place_name as string
  } else {
    return ''
  }
}

const router = useRouter()
const breakPoint = useScreenBreakpointStore()
const photoStore = usePhotoStore()
const locationStore = useGetLocationStore()
const { notification } = useBaseNotification()
const attendance = useAttendanceStore()

const photoType = ref('')
const canvasRef = ref()
const videoRef = ref()
const videoModel = reactive({
  width: 320,
  height: 0
})
const locationComp = computed(() => [locationStore.$state.longitude, locationStore.$state.latitude])
const tagLocations = reactive<string[]>(['Rumah', 'Kantor', 'Kantor 2'])
const tagModel = reactive({
  show: false,
  inputModel: '',
  radioModel: tagLocations[0]
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
  setTimeout(() => {
    modalRef.show = true
    modalRef.title = model.title
    modalRef.content = model.content
    modalRef.size = model.size
    modalRef.className = model.className
  }, 500)
}

interface notifInterface {
  type: TypesEnum
  title: string
  text: string
}
const openNotif = (model: notifInterface) => {
  notification(model.title, model.text, { type: model.type })
}

const getCameraAccess = async () => {
  try {
    await window.navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((strem) => {
        photoStore.setCameraAccess(true)
        photoStore.setPhotoData('')
        videoRef.value.srcObject = strem
        videoRef.value.play()
      })
  } catch (e) {
    openModal({
      show: true,
      title: 'Buka pengaturan perangkat Anda',
      content: `Cari opsi "Privasi" atau "Keamanan" dan masuk ke dalamnya. 
      Cari opsi "Camera" atau "Izin Camera" dan buka. 
      Aktifkan opsi "Izinkan Aplikasi Mengakses Camera" atau serupa. 
      Anda juga dapat memilih pengaturan yang lebih spesifik untuk setiap aplikasi yang terdaftar di bawah opsi tersebut.`,
      size: breakPoint.$state.screenBreakpoint == '2xl' ? 'xl' : 'md',
      className: 'modal-access-camera-failed'
    })
  }
}
const getCameraPhoto = async () => {
  let ctx = canvasRef.value.getContext('2d')
  if (videoModel.width && videoModel.height) {
    canvasRef.value.width = videoModel.width
    canvasRef.value.height = videoModel.height
    ctx.drawImage(videoRef.value, 0, 0, videoModel.width, videoModel.height)

    const data = canvasRef.value.toDataURL('image/png')
    photoStore.setPhotoData(data)
    photoStore.setCameraAccess(false)
  }
}
const getLocationAccess = async () => {
  await locationStore.getLocation().catch(() => {
    openModal({
      show: true,
      title: 'Buka pengaturan perangkat Anda',
      content: `Cari opsi "Privasi" atau "Keamanan" dan masuk ke dalamnya. 
      Cari opsi "Lokasi" atau "Izin Lokasi" dan buka.
      Aktifkan opsi "Izinkan Aplikasi Mengakses Lokasi" atau serupa. 
      Anda juga dapat memilih pengaturan yang lebih spesifik untuk setiap aplikasi yang terdaftar di bawah opsi tersebut.`,
      size: breakPoint.$state.screenBreakpoint == '2xl' ? 'xl' : 'md',
      className: 'modal-access-location-failed'
    })
  })
}

const newTagLocation = () => {
  tagLocations.push(tagModel.inputModel)
  tagModel.inputModel = ''
  tagModel.show = false
  openModal({
    show: true,
    title: 'Success',
    content: `Create tag location Success`,
    size: breakPoint.$state.screenBreakpoint == '2xl' ? 'xl' : 'md',
    className: 'modal-create-tag-location-success'
  })
}

watch(
  () => videoRef.value,
  (val) => {
    val.addEventListener('canplay', (e: any) => {
      videoModel.height = val.videoHeight / (val.videoWidth / videoModel.width)
      if (isNaN(videoModel.height)) {
        videoModel.height = videoModel.width / (4 / 3)
      }
      val.setAttribute('width', videoModel.width)
      val.setAttribute('height', videoModel.height)
    })
  }
)

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
    tagLocation: tagModel.radioModel,
    timestamp: new Date().toLocaleDateString('id-ID', { hour12: false })
  }
  attendance.setAttendance(data)
  openModal({
    show: true,
    title: 'Success',
    content: `Create Attendance Success`,
    size: breakPoint.$state.screenBreakpoint == '2xl' ? 'xl' : 'md',
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
          <span class="font-bold lg:text-4xl text-2xl mb-3">Photo</span>
          <baseSelect
            placeholder="Take photo"
            :list="[{ label: 'Snap Camera' }]"
            v-model="photoType"
            border="full"
          />
          <div
            class="bg-slate-300/20 rounded-5 h-80 flex justify-center items-center"
            v-if="!photoStore.$state.cameraAccess && !photoStore.$state.photo"
          >
            <i class="i-fad-camera text-20"></i>
          </div>
          <!-- temp. photo -->
          <canvas class="hidden" ref="canvasRef"></canvas>
          <!-- video -->
          <video
            class="bg-slate-300/20 rounded-5 h-80 w-full flex justify-center items-center"
            id="video"
            ref="videoRef"
            v-if="photoStore.$state.cameraAccess && !photoStore.$state.photo"
          >
            Video not available
          </video>
          <!-- captured image -->
          <img
            class="rounded-5 h-80 w-full"
            v-if="photoStore.$state.photo && !photoStore.$state.cameraAccess"
            :src="photoStore.$state.photo"
          />
          <button
            class="bg-blue block text-center p-2 text-white capitalize rounded-5 capitalize"
            @click.prevent="getCameraAccess"
          >
            open camera
          </button>
          <button
            class="bg-green block text-center p-2 text-white capitalize rounded-5 capitalize"
            @click.prevent="getCameraPhoto"
          >
            capture
          </button>

          <!-- map -->
          <span class="font-bold lg:text-4xl text-2xl my-3">Location</span>
          <div class="bg-slate-300/20 rounded-5 h-80 flex justify-center items-center" id="map">
            <MapboxMap
              :accessToken="MapBoxToken"
              :center="locationComp"
              :zoom="10"
              v-if="locationStore.$state.accessGPS"
            >
              <MapboxMarker :lng-lat="locationComp" />
            </MapboxMap>
            <i class="i-fad-location-dot-slash text-20" v-else></i>
          </div>
          <button
            class="bg-blue block text-center p-2 text-white capitalize rounded-5 capitalize"
            @click.prevent="getLocationAccess"
            v-if="!locationStore.$state.accessGPS"
          >
            allow location
          </button>
        </div>
      </div>
      <div class="lg:w-[40%] w-full lg:px-5">
        <div class="flex flex-col">
          <span class="font-bold lg:text-4xl text-2xl mb-3">Tag Location</span>
          <div class="p-2 rounded-5 border-secondary border-1 flex flex-col">
            <label class="text-blue" v-for="tag in tagLocations">
              <input
                type="radio"
                class="border-blue mt-1"
                v-model="tagModel.radioModel"
                :value="tag"
                name="tag"
              />
              {{ tag }}
            </label>

            <button
              class="bg-blue text-center p-2 text-white capitalize rounded-5 capitalize mt-3 add-tagLocation"
              @click.prevent="tagModel.show = true"
            >
              new tag
            </button>
          </div>
        </div>
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

      <component
        :is="baseModal"
        :is-open="tagModel.show"
        @on-close="tagModel.show = false"
        size="md"
        class="modal-add-tagLocation"
      >
        <template #content>
          <div class="max-h-90vh overflow-auto p-4">
            <h2 class="py-4 text-2xl font-bold">New Tag</h2>
            <form class="space-y-8 action-form-tagLocation" @submit.prevent="newTagLocation">
              <baseInput
                mode="bordered"
                type="text"
                placeholder="Tag"
                class="my-2 rounded"
                v-model="tagModel.inputModel"
                required
              />
              <button class="btn btn-primary btn-block mt-3" type="submit">Save</button>
            </form>
          </div>
        </template>
      </component>
    </Teleport>
  </div>
</template>
