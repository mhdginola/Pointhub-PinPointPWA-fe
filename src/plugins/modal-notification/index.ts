import type { App } from 'vue'
import component from './component.vue'
import { openModalNotification } from './options'

export const modalNotification = (app: App) => {
  app.component('modalNotification', component)
}

export { openModalNotification }
