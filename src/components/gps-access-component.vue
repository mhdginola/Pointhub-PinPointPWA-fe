<script setup lang="ts">
import { useGetLocationStore } from '@/stores/get-location'
const getLocationStore = useGetLocationStore()
</script>

<template>
  <div>
    <button @click="getLocationStore.getLocation()" class="getLocation">Get Location</button>
    <p v-if="getLocationStore.latitude" class="latitude">Latitude: {{ getLocationStore.latitude }}</p>
    <p v-if="getLocationStore.longitude" class="longitude">Longitude: {{ getLocationStore.longitude }}</p>
    <p v-if="!getLocationStore.accessGPS" class="accessGPS">Error occurred while retrieving geolocation: Geolocation is not supported by this browser.</p>
  </div>
</template>