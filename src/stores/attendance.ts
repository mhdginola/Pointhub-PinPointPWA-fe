import { $fetch } from '@/services/axios'
import { defineStore } from 'pinia'
import { useGetLocationStore } from './get-location'

export interface attendanceState {
  group: string
  photo: string
  location: [number, number]
  email: string
  groupName: string
  locationName?: string
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
    async fetchAttendaces() {
      let request = await $fetch('attendances', { method: 'GET' })
      this.setAttendance(request.data?.value?.attendances as attendanceState[])
    },
    async postAttendance(attendance: attendanceState) {
      await $fetch('attendances', { method: 'POST', data: attendance })
    },
    async setAttendance(attendance: attendanceState[]) {
      const location = useGetLocationStore()
      for (let att of attendance) {
        att.locationName = await location.getLocationName(att.location[0], att.location[1])
      }
      this.attendances = attendance
    },
    async export() {
      let request = await $fetch('attendances/export', { method: 'GET' })
      window.open(request.data.value?.downloadLink)
    }
  }
})
