import { defineStore } from 'pinia'
interface invitation {
  timestamp: Date | string
  from: string
  to: string
  inviteRole: string
  inviteGroup: string
}
interface state {
  invitations: invitation[]
}
export const UseInvitationStore = defineStore('InvitationStore', {
  state: () =>
    <state>{
      invitations: []
    },
  actions: {
    mockInvitation() {
      this.invitations.splice(0)
      this.invitations.push({
        from: 'Nur Aini',
        to: 'Hafiz',
        inviteGroup: 'KB-Sidoarjo',
        inviteRole: 'User',
        timestamp: new Date()
      })
    }
  }
})
