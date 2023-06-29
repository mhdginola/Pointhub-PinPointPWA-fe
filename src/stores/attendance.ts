import { defineStore } from 'pinia'

export interface attendanceState {
  name: string
  email: string
  address: string
  photo: string
  location: string | Promise<string> | any
  tagLocation: string
  timestamp: Date | string
}

interface attendancesState {
  attendances: attendanceState[]
}

export const useAttendanceStore = defineStore('attendance', {
  state: () =>
    <attendancesState>{
      attendances: []
    },
  actions: {
    setAttendance(attendance: attendanceState) {
      this.attendances.push(attendance)
    }
  }
})
