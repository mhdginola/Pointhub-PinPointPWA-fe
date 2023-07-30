import { useAxios } from '@vueuse/integrations/useAxios'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

instance.interceptors.request.use(
  (cfg) => {
    console.log('fetch')
    return cfg
  },
  (er) => {
    return Promise.reject(er)
  }
)

const { execute: $fetch, ...$fetchOptions } = useAxios('', instance, { immediate: false })

export { $fetch, $fetchOptions }
