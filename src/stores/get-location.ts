import { defineStore } from 'pinia'

interface locationState {
  latitude: number | null
  longitude: number | null
  accessGPS: boolean
}

export const useGetLocationStore = defineStore('get Location', {
  state: () =>
    <locationState>{
      latitude: 0,
      longitude: 0,
      accessGPS: false
    },
  actions: {
    async getLocation() {
      await new Promise((resolve: any, reject) => {
        try {
          navigator.geolocation.getCurrentPosition(
            (success) => {
              this.latitude = success.coords.latitude
              this.longitude = success.coords.longitude
              this.accessGPS = true
              resolve()
            },
            (err) => {
              this.latitude = null
              this.longitude = null
              this.accessGPS = false
              reject()
            },
            {}
          )
        } catch (err: GeolocationPositionError | any) {
          this.latitude = null
          this.longitude = null
          this.accessGPS = false
          reject()
        }
      })
    },
    showPosition() {},
    showError() {}
  }
})
