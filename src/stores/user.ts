import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    name: 'liweiye',
    role: 'admin'
  })

  return {
    userInfo
  }
})
