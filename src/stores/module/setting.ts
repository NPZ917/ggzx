import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingStore = defineStore('Setting', () => {
  return {
    isCollapse: ref(false),
    refresh: ref(false)
  }
})

export default useSettingStore
