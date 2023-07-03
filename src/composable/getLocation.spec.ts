import { describe, beforeEach, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GpsAccessComponent from '@/components/gps-access-component.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('GpsAccessComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should access GPS and update coordinates', async () => {
    // Mock the geolocation API
    const mockGeolocation = {
      getCurrentPosition: (
        successCallback: (arg0: { coords: { latitude: number; longitude: number } }) => void
      ) => {
        const position = {
          coords: {
            latitude: 40.712776,
            longitude: -74.005974
          }
        }
        successCallback(position)
      }
    }
    global.navigator.geolocation = mockGeolocation

    // Mount the component
    const wrapper = shallowMount(GpsAccessComponent)

    // Trigger the get location button click
    const getButton = wrapper.find('button.getLocation')
    getButton.trigger('click')

    await wrapper.vm.$nextTick()

    // Assert that the coordinates have been updated
    expect(wrapper.find('.latitude').text()).toBe('Latitude: 40.712776')
    expect(wrapper.find('.longitude').text()).toBe('Longitude: -74.005974')
    expect(wrapper.find('.accessGPS').exists()).toBe(false)
  })
  it('should not able to access GPS and update coordinates', async () => {
    // Mock the geolocation API
    const mockGeolocation = {
      getCurrentPosition: (
        successCallback: any,
        errorCallback: (arg0: { message: string }) => void
      ) => {
        const error = { message: 'Geolocation is not supported by this browser' }
        errorCallback(error)
      }
    }
    global.navigator.geolocation = mockGeolocation

    // Mount the component
    const wrapper = shallowMount(GpsAccessComponent)

    // Trigger the get location button click
    const getButton = wrapper.find('button.getLocation')
    getButton.trigger('click')

    await wrapper.vm.$nextTick()

    // Assert that the coordinates have been updated
    expect(wrapper.find('.latitude').exists()).toBe(false)
    expect(wrapper.find('.longitude').exists()).toBe(false)
    expect(wrapper.find('.accessGPS').text()).toBe(
      'Error occurred while retrieving geolocation: Geolocation is not supported by this browser.'
    )
  })
})
