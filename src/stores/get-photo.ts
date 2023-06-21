// store.js
import { defineStore } from 'pinia';

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    photo: null as string | null
  }),
  actions: {
    setPhotoData(photoData: string) {
      this.photo = photoData;
    }
  }
});
