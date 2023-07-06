<script setup lang="ts">
import { usePhotoStore } from '@/stores/get-photo'
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { SizeType } from './base-modal.vue'
import BaseModal from './base-modal.vue'
import BaseButton from '@/components/base-button.vue'
import BaseSelect from './base-select.vue'

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
    value: 'USER'
  },
  {
    label: 'Rear Camera',
    value: 'ENVIRONTMENT'
  }
]
const videoModel = reactive<videoInterface>({
  width: 320,
  height: 0,
  facial: listOption[0]
})
const modalPreview = ref(false)

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
const getCameraAccess = async () => {
  try {
    await stopCameraAccess()
    await window.navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: {
            exact: videoModel.facial.value
          }
        }
      })
      .then((stream) => {
        photoStore.setCameraAccess(true)
        photoStore.setPhotoData('')
        mediaStream.value = stream
        videoRef.value.srcObject = stream
        videoRef.value.play()
      })
  } catch (e) {
    console.log(e)
    openModal({
      show: true,
      title: 'Buka pengaturan perangkat Anda',
      content: `Cari opsi "Privasi" atau "Keamanan" dan masuk ke dalamnya. 
      Cari opsi "Camera" atau "Izin Camera" dan buka. 
      Aktifkan opsi "Izinkan Aplikasi Mengakses Camera" atau serupa. 
      Anda juga dapat memilih pengaturan yang lebih spesifik untuk setiap aplikasi yang terdaftar di bawah opsi tersebut.`,
      size: 'md',
      className: 'modal-access-camera-failed'
    })
  }
}
const stopCameraAccess = () => {
  mediaStream.value?.getTracks().forEach((track) => {
    track.stop()
  })
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
  await getCameraAccess()
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
    @update:model-value="getCameraAccess"
  />
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
    v-show="photoStore.cameraAccess"
  >
    Video not available
  </video>
  <!-- captured image -->
  <div v-if="photoStore.photo" class="fixed bottom-[75px] z-20 right-[5px]">
    <i
      class="i-fad-xmark-large text-lg text-black absolute top-2 left-2"
      @click.prevent=";[photoStore.setPhotoData('')]"
    ></i>
    <img
      class="rounded-5 h-30"
      v-if="photoStore.photo"
      :src="photoStore.photo"
      @click.prevent="modalPreview = true"
    />
  </div>
  <BaseButton
    :class-name="photoStore.photo ? 'bg-blue' : 'bg-[#D757F6]'"
    @click.prevent="photoStore.photo ? getCameraAccess() : getCameraPhoto()"
  >
    {{ photoStore.photo ? 'Re-Capture' : 'Capture' }}
  </BaseButton>

  <!-- temp. photo -->
  <canvas class="hidden" ref="canvasRef"></canvas>

  <Teleport to="body">
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

    <component :is="BaseModal" :is-open="modalPreview" @on-close="modalPreview = false">
      <template #content>
        <div class="max-h-90vh overflow-auto p-4">
          <span class="text-2xl font-bold">Preview</span>
          <div class="flex flex-col gap-3">
            <img :src="(photoStore.photo as string)" class="w-full rounded-lg" />
            <button class="btn btn-primary btn-block mt-3" @click="modalPreview = false">
              Close
            </button>
          </div>
        </div>
      </template>
    </component>
  </Teleport>
</template>
