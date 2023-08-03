import { $fetch } from '@/services/axios'
import { defineStore } from 'pinia'
interface group {
  _id: string
  name: string
  createdAt?: string
}
interface state {
  groups: group[]
}
export const useGroupStore = defineStore('group', {
  state: () =>
    <state>{
      groups: []
    },
  actions: {
    async fetchGroups() {
      let request = await $fetch('groups', { method: 'GET' })
      this.setGroups(request.data?.value?.groups as group[])
    },
    async fetchGroup(id: string) {
      let request = await $fetch(`groups/${id}`, { method: 'GET' })
      return request.data?.value
    },
    async createGroup(name: group['name']) {
      await $fetch('groups', { method: 'POST', data: { name: name } })
      await this.fetchGroups()
    },
    async updateGroup(group: group) {
      await $fetch(`groups/${group._id}`, { method: 'PATCH', data: { name: group.name } })
      await this.fetchGroups()
    },
    async deleteGroup(id: string) {
      await $fetch(`groups/${id}`, { method: 'DELETE' })
      await this.fetchGroups()
    },
    setGroups(groups: group[]) {
      this.groups = groups
    }
  }
})
