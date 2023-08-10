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
      let photo = await fetch(attendance.photo)
      let blob = await photo.blob()

      let data = new FormData()
      data.append('group', attendance.group)
      data.append('email', attendance.email)
      data.append('groupName', attendance.groupName)
      data.append('location[]', attendance.location[0].toString())
      data.append('location[]', attendance.location[1].toString())
      data.append('photo', blob)
      await $fetch('attendances', {
        method: 'POST',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
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
      await $fetch(request.data.value?.downloadLink, {
        method: 'GET',
        responseType: 'blob'
      }).then((resp) => {
        let href = URL.createObjectURL(resp.data.value)
        let link = document.createElement('a')
        link.href = href
        link.setAttribute('download', 'report.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(href)
      })
    }
  }
})
