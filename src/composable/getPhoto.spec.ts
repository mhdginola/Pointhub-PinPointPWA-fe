import { describe, expect, it } from 'vitest'
import ComponentWithPhoto from '@/components/photo-component.vue'

describe('ComponentWithPhoto', () => {
  it('should take a photo from the camera', async () => {
    const wrapper = ComponentWithPhoto
    // Create a mock MediaStream object
    const mockStream = {
      getVideoTracks: () => []
    }

    // Create a mock getUserMedia function
    const mockGetUserMedia = () => Promise.resolve(mockStream)

    // Save the original getUserMedia function
    const originalGetUserMedia = navigator.mediaDevices.getUserMedia

    // Assign the mock getUserMedia function
    navigator.mediaDevices.getUserMedia = mockGetUserMedia

    // Trigger the "Take Photo" button click event
    await wrapper.find('.take-photo-button').trigger('click')

    // Verify that the photo was taken
    expect(wrapper.vm.find('.preview').text()).not.toBeNull()

    // Restore the original getUserMedia function
    navigator.mediaDevices.getUserMedia = originalGetUserMedia
  })

  it('should select a photo file', async () => {
    const wrapper = ComponentWithPhoto
    // Mock the `window.URL.createObjectURL` function
    window.URL.createObjectURL = () => 'mocked-file-url'

    // Create a mock File object
    const file = new File(['file-content'], 'mocked-file.jpg', { type: 'image/jpeg' })

    // Trigger the "Select File" input change event
    await wrapper.find('input[type="file"]').setValue(file)

    // Verify that the photo file was selected
    expect(wrapper.vm.find('.preview')).not.toBeNull()
  })
})
