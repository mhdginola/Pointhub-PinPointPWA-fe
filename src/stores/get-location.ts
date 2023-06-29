import { defineStore } from 'pinia'

interface locationState {
  latitude: number
  longitude: number
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
              console.log(success)
              const position = {
                coords: {
                  latitude: 40.712776,
                  longitude: -74.005974,
                  accessGPS: true
                }
              }
              this.latitude = success.coords.latitude
              this.longitude = success.coords.longitude
              this.accessGPS = true
              resolve()
            },
            (err) => {
              this.latitude = 0
              this.longitude = 0
              this.accessGPS = false
              reject()
            },
            {}
          )
        } catch (err: GeolocationPositionError | any) {
          this.latitude = 0
          this.longitude = 0
          this.accessGPS = false
          reject()
        }
      })
    },
    showPosition() {},
    showError() {}
  }
})
