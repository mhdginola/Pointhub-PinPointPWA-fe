<script lang="ts">
import { onMounted, ref } from 'vue'
import { useGetLocationStore } from '@/stores/get-location'
import { openModalNotification } from '@/plugins/modal-notification'
import 'leaflet/dist/leaflet.css'
import { map, latLng, tileLayer, type MapOptions, marker } from 'leaflet'

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

const setLocationMaps = () => {
  const opt: MapOptions = {
    center: latLng(locationStore.latitude, locationStore.longitude),
    zoom: 12
  }
  const leaflet = map('map', opt)
  tileLayer(
    `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${locationStore.mapAPI}`,
    {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      crossOrigin: true,
      zIndex: 10
    }
  ).addTo(leaflet)
  marker([locationStore.latitude, locationStore.longitude]).addTo(leaflet)
}

const locationName = ref()
onMounted(async () => {
  await getLocationAccess()
  setLocationMaps()
  locationName.value = await locationStore.getLocationName()
})
</script>
<style>
.leaflet-pane,
.leaflet-control-container div {
  z-index: 10 !important;
}
</style>
<template>
  <span class="font-bold lg:text-4xl text-2xl my-3">Location</span>
  <div class="bg-slate-300/20 rounded-5 h-80 flex justify-center items-center" id="map">
    <div v-if="locationStore.$state.accessGPS" class="w-full h-full" id="map"></div>
    <i class="i-fad-location-dot-slash text-20" v-else></i>
  </div>
  <div>
    <p>Location: {{ locationName }}</p>
    <p class="hidden longitude">Longitude: {{ locationStore.longitude }}</p>
    <p class="hidden latitude">Latitude: {{ locationStore.latitude }}</p>
    <p class="accessGPS" v-if="locationStore.accessGPS"></p>
  </div>
</template>
