import { describe, beforeEach, expect, it } from 'vitest'
import { usePhotoStore } from './get-photo'
import { setActivePinia, createPinia } from 'pinia'

describe('photo', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should be defined', () => {
    const photoStore = usePhotoStore()
    expect(photoStore.$state.photo).toBeDefined()
    expect(typeof photoStore.$state.photo).toBe('string')
    expect(photoStore.setPhotoData).toBeDefined()
  })

  it('should set photo data', async() => {
    const photoStore = usePhotoStore()

    const photo = 'test';
    // Mount the component
    photoStore.setPhotoData(photo);

    // Assert that the coordinates have been updated
    expect(photoStore.$state.photo).toBe(photo);
  });
})
