import { $fetch } from '@/services/axios'
import { defineStore } from 'pinia'
export interface invite {
  _id?: string
  email: string
  group: string
  createdAt?: string
}
interface state {
  invites: invite[]
}
export const useInviteStore = defineStore('invite', {
  state: () =>
    <state>{
      invites: []
    },
  actions: {
    async createInvite(data: invite) {
      await $fetch('invitations', { method: 'POST', data: data })
    },
    async acceptInvite(id: invite['_id']) {
      await $fetch(`invitations/${id}`, { method: 'PATCH', data: { accept: true } })
    },
    async deleteInvite(id: string) {
      await $fetch(`invitations/${id}`, { method: 'DELETE' })
    }
  }
})
