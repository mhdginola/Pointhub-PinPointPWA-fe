<script lang="ts">
import { onMounted, ref } from 'vue'
import { useGetLocationStore } from '@/stores/get-location'
import { MapboxMap, MapboxMarker } from 'vue-mapbox-ts'
import BaseModal from './base-modal.vue'
import { openModalNotification } from '@/plugins/modal-notification'

const locationStore = useGetLocationStore()
</script>
<script setup lang="ts">
const getLocationAccess = async () => {
  await locationStore.getLocation().catch(() => {
    openModalNotification({
      show: true,
      title: 'Belum bisa melakukan PinPoint?',
      content: `
          <p> 1. Buka pengaturan perangkat Anda </p>
          <p> 2. Cari opsi "Privasi" atau "Keamanan" </p>
          <p> 3. Cari opsi "Lokasi" atau "Izin Lokasi" </p>
          <p> 4. Aktifkan opsi "izinkan aplikasi mengakses lokasi" atau yang serupa </p>

        `,
      size: 'xl',
      className: 'modal-access-camera-failed'
    })
  })
}

const locationName = ref()
onMounted(async () => {
  await getLocationAccess()
  locationName.value = await locationStore.getLocationName()
})
</script>
<template>
  <span class="font-bold lg:text-4xl text-2xl my-3">Location</span>
  <div class="bg-slate-300/20 rounded-5 h-80 flex justify-center items-center" id="map">
    <MapboxMap
      :accessToken="locationStore.mapBoxToken"
      :center="[locationStore.longitude, locationStore.latitude]"
      :zoom="10"
      v-if="locationStore.$state.accessGPS"
    >
      <MapboxMarker :lng-lat="[locationStore.longitude, locationStore.latitude]" />
    </MapboxMap>
    <i class="i-fad-location-dot-slash text-20" v-else></i>
  </div>
  <div>
    <p>Location: {{ locationName }}</p>
    <p class="hidden longitude">Longitude: {{ locationStore.longitude }}</p>
    <p class="hidden latitude">Latitude: {{ locationStore.latitude }}</p>
    <p class="accessGPS" v-if="locationStore.accessGPS"></p>
  </div>
</template>
