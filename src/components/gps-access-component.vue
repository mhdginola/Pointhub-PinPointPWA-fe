<script lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { SizeType } from './base-modal.vue'
import { useGetLocationStore } from '@/stores/get-location'
import { MapboxMap, MapboxMarker } from 'vue-mapbox-ts'
import BaseModal from './base-modal.vue'

const locationStore = useGetLocationStore()
const MapBoxAPI = import.meta.env.VITE_MAPBOX_API
const MapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN
export const GetMapBoxLocationName = async () => {
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
</script>
<script setup lang="ts">
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

const getLocationAccess = async () => {
  await locationStore.getLocation().catch(() => {
    openModal({
      show: true,
      title: 'Buka pengaturan perangkat Anda',
      content: `Cari opsi "Privasi" atau "Keamanan" dan masuk ke dalamnya. 
      Cari opsi "Lokasi" atau "Izin Lokasi" dan buka.
      Aktifkan opsi "Izinkan Aplikasi Mengakses Lokasi" atau serupa. 
      Anda juga dapat memilih pengaturan yang lebih spesifik untuk setiap aplikasi yang terdaftar di bawah opsi tersebut.`,
      size: 'md',
      className: 'modal-access-location-failed'
    })
  })
}

const locationComputed = computed(() => [
  locationStore.$state.longitude,
  locationStore.$state.latitude
])
const locationName = ref()
onMounted(async () => {
  await getLocationAccess()
  locationName.value = await GetMapBoxLocationName()
})
</script>
<template>
  <span class="font-bold lg:text-4xl text-2xl my-3">Location</span>
  <div>
    <p>Location: {{ locationName }}</p>
    <p class="capitalize longitude">Longitude: {{ locationStore.longitude }}</p>
    <p class="capitalize latitude">Latitude: {{ locationStore.latitude }}</p>
    <p class="accessGPS" v-if="locationStore.accessGPS"></p>
  </div>
  <div class="bg-slate-300/20 rounded-5 h-80 flex justify-center items-center" id="map">
    <MapboxMap
      :accessToken="MapBoxToken"
      :center="locationComputed"
      :zoom="10"
      v-if="locationStore.$state.accessGPS"
    >
      <MapboxMarker :lng-lat="locationComputed" />
    </MapboxMap>
    <i class="i-fad-location-dot-slash text-20" v-else></i>
  </div>

  <component
    :is="BaseModal"
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
</template>
