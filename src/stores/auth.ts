import { defineStore } from 'pinia'

interface userState {
  accessToken: string | null
  role: 'admin' | 'user'
  users: string[]
}

export const useUserStore = defineStore('auth', {
  state: () =>
    <userState>{
      accessToken: 'localStorage' in window ? window.localStorage.getItem('token') ?? '' : '',
      role: 'localStorage' in window ? window.localStorage.getItem('role') ?? 'user' : 'user',
      users: ['Hafiz', 'Arif Muhammad', 'Melati', 'Mawar', 'Jingga']
    },
  actions: {
    async setAccessToken(token: string) {
      return new Promise((resolve) => {
        this.accessToken = token
        if ('localStorage' in window) {
          window.localStorage.setItem('token', token)
        }
        resolve(true)
      })
    },
    signOut() {
      this.accessToken = null
      if ('localStorage' in window) {
        window.localStorage.removeItem('token')
      }
      if ('localStorage' in window) {
        window.localStorage.removeItem('role')
      }
      location.reload()
    },
    switchRole() {
      if ('localStorage' in window) {
        window.localStorage.setItem('role', this.role == 'admin' ? 'user' : 'admin')
      }
      this.role = this.role == 'admin' ? 'user' : 'admin'
      location.href = '/'
    }
  }
})
