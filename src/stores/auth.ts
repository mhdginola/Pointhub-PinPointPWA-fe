import { defineStore } from 'pinia'

interface userState {
  accessToken: string | null
  role: 'admin' | 'user'
  users: string[]
}

export const useUserStore = defineStore('auth', {
  state: () =>
    <userState>{
      accessToken: '',
      role: 'admin',
      users: ['Hafiz', 'Arif Muhammad', 'Melati', 'Mawar', 'Jingga']
    },
  actions: {
    async setAccessToken(token: string) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.accessToken = token
          resolve(true)
        }, 0)
      })
    },
    signOut() {
      this.accessToken = null
    },
    switchRole() {
      this.role = this.role == 'admin' ? 'user' : 'admin'
    }
  }
})
