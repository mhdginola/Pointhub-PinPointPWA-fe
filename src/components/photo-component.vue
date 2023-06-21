<template>
  <div>
    <video ref="videoElement" autoplay></video>
    <canvas ref="canvasElement" style="display: none;"></canvas>
    <button @click="takePhoto">Take Photo</button>
    <img :src="photoStore.photoData" v-if="photoStore.photoData" alt="Captured Photo" />
    <img :src="previewURL" v-if="previewURL" alt="Captured Photo" />
    <form @submit="uploadImage">
      <input type="file" accept="image/*" ref="fileInput" name="photo" />
      <button type="submit" id="submit">Upload</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { usePhotoStore } from '@/stores/get-photo';


export default defineComponent({
  data() {
    return {
      previewURL: null as string | null
    };
  },
  mounted() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = this.$refs.videoElement as HTMLVideoElement;
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Failed to access the camera:', error);
      });
  },
  methods: {
    uploadImage(event: { preventDefault: () => void; }) {
      event.preventDefault();

      const fileInput = this.$refs.fileInput as HTMLInputElement;
      
      if(!fileInput.files){return ;}

      const file = fileInput.files[0];
      console.log(typeof file);
      console.log(file);

      if (file) {
        const formData = new FormData();
        const reader = new FileReader();
        reader.onload = () => {
          this.previewURL = reader.result;
        };
        
        reader.readAsDataURL(file);
        formData.append('image', file);

        // Perform your upload logic with the formData
        // For example, make an API request to upload the image
      }
    }
  },
  setup() {
    const photoStore = usePhotoStore();
    const videoElement = ref<HTMLVideoElement | null>(null);
    const canvasElement = ref<HTMLCanvasElement | null>(null);

    const takePhoto = () => {
      if (!videoElement.value || !canvasElement.value) return;

      const context = canvasElement.value.getContext('2d');

      if (!context) return;

      // Set canvas dimensions to match video element
      canvasElement.value.width = videoElement.value.videoWidth;
      canvasElement.value.height = videoElement.value.videoHeight;

      // Draw video frame onto the canvas
      context.drawImage(
        videoElement.value,
        0,
        0,
        canvasElement.value.width,
        canvasElement.value.height
      );

      // Get the image data from the canvas as a base64-encoded string
      const photoData = canvasElement.value.toDataURL('image/png');

      // Update the photo data in the Pinia store
      photoStore.setPhotoData(photoData);
      console.log(typeof photoStore.photoData);
      console.log(photoStore.photoData);
    };

    return {
      photoStore,
      videoElement,
      canvasElement,
      takePhoto
    };
  }
});
</script>
