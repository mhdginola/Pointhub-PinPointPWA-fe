import { defineStore } from 'pinia'

type htmlTagType = HTMLHtmlElement
interface globalState {
  htmlTag: htmlTagType
  isDarkMode: boolean
}
let htmlTag = document.getElementsByTagName('html')[0]

export const useGlobalStore = defineStore('global-store', {
  state: () =>
    <globalState>{
      htmlTag: htmlTag,
      isDarkMode: htmlTag.classList.contains('dark')
    },
  actions: {
    toggleDarkMode() {
      if (this.htmlTag.classList.contains('dark')) {
        this.htmlTag.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      } else {
        this.htmlTag.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }

      this.isDarkMode = htmlTag.classList.contains('dark')
    }
  }
})
