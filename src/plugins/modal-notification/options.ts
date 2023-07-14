import type { SizeType } from '@/components/base-modal.vue'
import { reactive } from 'vue'

export interface propsInterface {
  show: boolean
  title?: string
  content?: string
  size?: SizeType
  className?: string
}

export const props: propsInterface = reactive({
  show: false
})
export const openModalNotification = (args: propsInterface) => {
  Object.assign(props, args)
}
