import { defineStore } from 'pinia'

interface photoState {
  photo: string | null
  cameraAccess: boolean
}

export const usePhotoStore = defineStore('photo', {
  state: () =>
    <photoState>{
      photo: '',
      cameraAccess: false
    },
  actions: {
    setPhotoData(photo: string) {
      this.photo = photo
    },
    setCameraAccess(access: boolean) {
      this.cameraAccess = access
    }
  }
})
