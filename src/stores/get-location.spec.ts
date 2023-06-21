import { describe, beforeEach, expect, it } from 'vitest'
import { useGetLocationStore } from './get-location'
import { setActivePinia, createPinia } from 'pinia'

describe('get Location', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should be defined', () => {
    const getLocationStore = useGetLocationStore()
    expect(getLocationStore.$state.latitude).toBeDefined()
    expect(getLocationStore.$state.longitude).toBeDefined()
    expect(getLocationStore.$state.accessGPS).toBeDefined()
    expect(typeof getLocationStore.$state.latitude).toBe('number')
    expect(typeof getLocationStore.$state.longitude).toBe('number')
    expect(typeof getLocationStore.$state.accessGPS).toBe('boolean')
    expect(getLocationStore.getLocation).toBeDefined()
    expect(getLocationStore.showPosition).toBeDefined()
    expect(getLocationStore.showError).toBeDefined()
  })

  it('should access GPS and update coordinates', async() => {
    const getLocationStore = useGetLocationStore()

    // Mock the geolocation API
    const mockGeolocation = {
      getCurrentPosition: ((successCallback: (arg0: { coords: { latitude: number; longitude: number } }) => void) => {
        const position = {
          coords: {
            latitude: 40.712776,
            longitude: -74.005974,
            accessGPS: true
          }
        };
        successCallback(position);
      })
    };
    global.navigator.geolocation = mockGeolocation;

    // Mount the component
    getLocationStore.getLocation();

    // Assert that the coordinates have been updated
    expect(getLocationStore.$state.latitude).toBe(40.712776);
    expect(getLocationStore.$state.longitude).toBe(-74.005974);
    expect(getLocationStore.$state.accessGPS).toBe(true);
  });

  it('should not able to access GPS and update coordinates', async() => {
    const getLocationStore = useGetLocationStore()
    // Mock the geolocation API
    const mockGeolocation = {
      getCurrentPosition: ((_successCallback: any, errorCallback: () => void)=> {
        errorCallback() 
      })
    };
    global.navigator.geolocation = mockGeolocation;

    // Mount the component
    getLocationStore.getLocation();

    // Assert that the coordinates have been updated
    expect(getLocationStore.$state.latitude).toBe(null);
    expect(getLocationStore.$state.longitude).toBe(null);
    expect(getLocationStore.$state.accessGPS).toBe(false);
  });
})
