import { defineStore } from 'pinia';

export const useUserStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },
    signOut() {
      this.accessToken = null;
    },
  },
});
