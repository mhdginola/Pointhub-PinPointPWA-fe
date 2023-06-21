import { defineStore } from 'pinia'

interface StateInterface {
  latitude: number | null,
  longitude: number | null,
  accessGPS: boolean,
}

export const useGetLocationStore = defineStore('getLocation', {
  state: (): StateInterface => ({
    latitude: null,
    longitude: null,
    accessGPS: true,
  }),
  actions: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
      } else {
        console.error('Geolocation is not supported by this browser.');
        this.accessGPS = false;
      }
    },
    showPosition(position: { coords: { latitude: number | null; longitude: number | null; }; }) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.accessGPS = true;
    },
    showError() {
      this.latitude = null;
      this.longitude = null;
      this.accessGPS = false;
    }
  }
})
