<script setup lang="ts">
import { usePhotoStore } from '@/stores/get-photo'
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import BaseButton from '@/components/base-button.vue'
import BaseSelect from './base-select.vue'
import { openModalNotification } from '@/plugins/modal-notification'

const photoStore = usePhotoStore()
const canvasRef = ref()
const mediaStream = ref<MediaStream>()
const videoRef = ref()
interface listInterface {
  label: string
  value: string
}
interface videoInterface {
  width: number
  height: number
  facial: listInterface
}
const listOption: listInterface[] = [
  {
    label: 'Front Camera',
    value: 'user'
  },
  {
    label: 'Rear Camera',
    value: 'environment'
  }
]
const videoModel = reactive<videoInterface>({
  width: 1024,
  height: 0,
  facial: listOption[0]
})

const streamCamera = async (facingMode: string) => {
  setTimeout(async () => {
    const options = {
      audio: false,
      video: {
        facingMode
      }
    }
    try {
      const supports = navigator.mediaDevices.getSupportedConstraints()
      if (!supports['facingMode']) {
        openModalNotification({
          show: true,
          title: 'Tidak bisa membuka kamera',
          content: `Perangkat tidak mendukung untuk menjalankan operasi ini`,
          size: 'md',
          className: 'modal-access-camera-failed'
        })
        return
      }
      mediaStream.value = await navigator.mediaDevices.getUserMedia(options)
    } catch (e) {
      openModalNotification({
        show: true,
        title: 'Belum bisa melakukan PinPoint?',
        content: `
          <p> 1. Buka pengaturan perangkat Anda </p>
          <p> 2. Cari opsi "Privasi" atau "Keamanan" </p>
          <p> 3. Cari opsi "Camera" atau "Izin Kamera" </p>
          <p> 4. Pastikan Anda memilih aplikasi browser internet yang Anda gunakan </p>
          <p> 5. Aktifkan opsi "izinkan aplikasi mengakses kamera" atau yang serupa </p>
          <br/>
          <p>(Pada perangkat tertentu, langkah 5 bisa mendahului langkah 4)</p>

        `,
        size: 'xl',
        className: 'modal-access-camera-failed'
      })
      return
    }
    photoStore.setCameraAccess(true)
    photoStore.setPhotoData('')
    videoRef.value.srcObject = mediaStream.value
    videoRef.value.play()
  }, 1000)
}

const stopCameraAccess = () => {
  if (mediaStream.value) {
    mediaStream.value?.getTracks().forEach((track) => {
      track.stop()
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
  }
}
onBeforeMount(async () => {
  await streamCamera(videoModel.facial.value)
})
onMounted(async () => {
  document.addEventListener('blur', () => {
    stopCameraAccess()
  })
})
onBeforeUnmount(() => {
  stopCameraAccess()
})

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
</script>

<template v-cloak>
  <span class="font-bold lg:text-4xl text-2xl mb-3">Photo</span>
  <BaseSelect
    v-model="videoModel.facial"
    :list="listOption"
    @update:model-value=";[stopCameraAccess(), streamCamera(videoModel.facial.value)]"
    class="mb-3"
  />
  <div
    class="bg-slate-300/20 rounded-5 h-90 flex justify-center items-center"
    v-if="!photoStore.cameraAccess && !photoStore.photo"
  >
    <i class="i-fad-camera-slash text-20"></i>
  </div>
  <!-- video -->
  <video
    class="bg-slate-300/20 rounded-5 h-90 w-full flex justify-center items-center"
    id="video"
    ref="videoRef"
    v-show="photoStore.cameraAccess && !photoStore.photo"
  >
    Video not available
  </video>
  <!-- captured image -->
  <div
    v-if="photoStore.photo"
    class="bg-slate-300/20 rounded-5 h-90 w-full flex justify-center items-center"
  >
    <img :class="`w-[${videoModel.width}px] h-full`" :src="photoStore.photo?.toString()" />
  </div>

  <BaseButton
    :class-name="photoStore.photo ? 'bg-blue' : 'bg-[#D757F6]'"
    @click.prevent="photoStore.photo ? streamCamera(videoModel.facial.value) : getCameraPhoto()"
  >
    {{ photoStore.photo ? 'Re-Capture' : 'Capture' }}
  </BaseButton>

  <!-- temp. photo -->
  <canvas class="hidden" ref="canvasRef"></canvas>
</template>
