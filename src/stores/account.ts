import moment from 'moment'
import { defineStore } from 'pinia'

export interface report {
  timestamp: Date | string
  user: string
  location: string
}
type role = 'admin' | 'user'
export interface user {
  id: number
  name: string
  role?: role | string
  email: string
}

interface state {
  reports: report[]
  users: user[]
  groups: string[]
}

export const useAccountStore = defineStore('account-user', {
  state: () =>
    <state>{
      reports: [],
      users: [],
      groups: []
    },
  actions: {
    mockReport() {
      // this.reports.splice(0)
      this.reports.push(
        {
          timestamp: moment().add(0, 'day').add(-3, 'hour').toString(),
          location: 'Jakarta',
          user: 'Hafiz'
        },
        {
          timestamp: moment().add(-1, 'day').add(-4, 'hour').toString(),
          location: 'Jakarta',
          user: 'Arif Muhammad'
        },
        {
          timestamp: moment().add(-2, 'day').add(-5, 'hour').toString(),
          location: 'Jakarta',
          user: 'Jingga'
        }
      )
    },
    mockUser() {
      this.users.splice(0)
      this.users.push({
        name: 'Hafiz',
        role: 'user',
        email: 'hafiz@gmail.com',
        id: new Date().valueOf()
      })
      this.users.push({
        name: 'Arif Muhammad',
        role: 'admin',
        email: 'arif@gmail.com',
        id: new Date().valueOf() + 2
      })
    },
    inviteUser(user: user) {
      if (user.id == 0) {
        this.users.push({ ...user, id: new Date().valueOf() })
      } else {
        let index = this.users.indexOf(this.users.find((x) => x.id == user.id) as user)
        if (index != -1) {
          this.users[index].name = user.name
          this.users[index].email = user.email
          this.users[index].role = user.role
        }
      }
    },
    deleteUser(email: string) {
      let user = this.users.find((x) => x.email == email) as user
      let index = this.users.indexOf(user)
      this.users.splice(index, 1)
    },
    mockGroup() {
      this.groups.splice(0)
      this.groups.push(...['Cabang Jakarta'])
    },
    createGroup(name: string, old?: string) {
      if (!old) {
        this.groups.push(name)
      } else {
        let index = this.groups.indexOf(this.groups.find((x) => x == old) as string)
        if (index != -1) {
          this.groups[index] = name
        }
      }
    },
    deleteGroup(name: string) {
      let group = this.groups.find((x) => x == name) as string
      let index = this.groups.indexOf(group)
      this.groups.splice(index, 1)
    }
  }
})
