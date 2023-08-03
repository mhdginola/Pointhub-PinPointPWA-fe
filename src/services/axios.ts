import { openModalNotification } from '@/plugins/modal-notification'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useUserStore } from '@/stores/auth'
import axios from 'axios'

const API = import.meta.env.VITE_API
const instance = axios.create({
  baseURL: API
})

instance.interceptors.request.use(
  (cfg) => {
    if ('localStorage' in window && window.localStorage.getItem('token')) {
      cfg.headers.set('Authorization', 'Bearer ' + window.localStorage.getItem('token'))
    }
    openModalNotification({
      show: true,
      title: 'Please wait',
      content: 'Processing data',
      size: 'sm'
    })
    return cfg
  },
  (er) => {
    return Promise.reject(er)
  }
)

instance.interceptors.response.use(
  (res) => {
    openModalNotification({ show: false })
    return res
  },
  (err) => {
    if (err?.response) {
      openModalNotification({
        show: true,
        title: err?.response?.data?.status ?? 'An error happened',
        content: err?.response?.data?.message ?? "The URL you'll try to get was returning an error"
      })
      if (err?.response?.data?.code == 401) {
        const auth = useUserStore()
        auth.signOut()
      }
    }
    if (err?.message) {
      openModalNotification({
        show: true,
        title: err?.code ?? 'An error happened',
        content: err?.message ?? "The URL you'll try to get was returning an error"
      })
    }
    return Promise.reject(err)
  }
)

const { execute: $fetch, ...$fetchOptions } = useAxios('', instance, { immediate: false })

export { $fetch, $fetchOptions, API }
