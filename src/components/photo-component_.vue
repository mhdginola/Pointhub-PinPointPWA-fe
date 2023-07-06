<script setup lang="ts">
import { usePhotoStore } from '@/stores/get-photo'
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { SizeType } from './base-modal.vue'
import BaseModal from './base-modal.vue'
import BaseButton from '@/components/base-button.vue'
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from '@/composable/camera-composable'

const photoStore = usePhotoStore()
const videoRef = ref()

onMounted(() => {
  const camera = new CameraPhoto(videoRef.value)
  setTimeout(() => {
    camera.startCamera(FACING_MODES.USER, {})
  }, 500)
})
</script>
<template>
  <span class="font-bold lg:text-4xl text-2xl mb-3">Photo</span>
  <div
    class="bg-slate-300/20 rounded-5 h-80 flex justify-center items-center"
    v-if="!photoStore.cameraAccess && !photoStore.photo"
  >
    <i class="i-fad-camera text-20"></i>
  </div>

  <!-- video -->
  <video
    class="bg-slate-300/20 rounded-5 h-80 w-full flex justify-center items-center"
    id="video"
    ref="videoRef"
  >
    Video not available
  </video>
</template>
