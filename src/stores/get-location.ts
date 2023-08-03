import { $fetch } from '@/services/axios'
import { defineStore } from 'pinia'

const MapBoxAPI = import.meta.env.VITE_MAPBOX_API
const MapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN
const MapAPI = import.meta.env.VITE_MAP_API

interface tagLocation {
  name: string
  longitude: number
  latitude: number
  _id?: string
}
interface locationState {
  latitude: number
  longitude: number
  accessGPS: boolean
  mapBoxToken: string
  mapBoxAPI: string
  mapAPI: string
  tagLocations: tagLocation[]
}

export const useGetLocationStore = defineStore('get Location', {
  state: () =>
    <locationState>{
      latitude: 0,
      longitude: 0,
      accessGPS: false,
      mapBoxToken: MapBoxToken,
      mapBoxAPI: MapBoxAPI,
      mapAPI: MapAPI,
      tagLocations: []
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
    async getLocationName(longitude: number, latitude: number) {
      let response = await fetch(
        `${MapBoxAPI}/${longitude},${latitude}.json?access_token=${MapBoxToken}`
      )
      if (!response.ok) {
        alert('error getting location detail')
      }
      let result = await response.json()
      if (result.features.length > 0) {
        return result.features[0]?.place_name as string
      } else {
        return ''
      }
    },
    async createTagLocation(tag: tagLocation) {
      await $fetch('tagLocations', { method: 'POST', data: tag })
      await this.fetchTagLocations()
    },
    async deleteTagLocation(id: string) {
      await $fetch(`tagLocations/${id}`, { method: 'DELETE' })
      await this.fetchTagLocations()
    },
    async fetchTagLocations() {
      let request = await $fetch('tagLocations', { method: 'GET' })
      this.setTagLocations(request.data?.value.tagLocations as tagLocation[])
    },
    setTagLocations(tag: tagLocation[]) {
      this.tagLocations = tag
    }
  }
})
