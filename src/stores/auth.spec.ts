import { describe, beforeEach, expect, it } from 'vitest'
import { useUserStore } from './auth'
import { setActivePinia, createPinia } from 'pinia'

describe('auth', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should be defined', () => {
    const userStore = useUserStore()
    expect(userStore.$state.accessToken).toBeDefined()
    expect(typeof userStore.$state.accessToken).toBe('string')
    expect(userStore.setAccessToken).toBeDefined()
    expect(userStore.signOut).toBeDefined()
  })

  it('should set access token', async() => {
    const userStore = useUserStore()

    const accessToken = 'test';
    // Mount the component
    userStore.setAccessToken(accessToken);

    // Assert that the coordinates have been updated
    expect(userStore.$state.accessToken).toBe(accessToken);
  });

  it('should signout', async() => {
    const userStore = useUserStore()

    userStore.signOut();
    
    expect(userStore.$state.accessToken).toBe(null);
  });
})
