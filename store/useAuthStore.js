import { defineStore } from 'pinia'
import { useCookie } from '#app'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: useCookie('accessToken'),
    refreshToken: useCookie('refreshToken'),
  }),
  actions: {
    async login(userName, password) {
      const res = await axios.post('auth/login', { userName, password })

      // ✅ correct references
      this.accessToken.value = res.data.accessToken
      this.refreshToken.value = res.data.refreshToken
      this.user = res.data.user || null

      return res
    },

    async fetchUser() {
      const res = await axios.get('auth/user')
      this.user = res.data
      return res.data
    },

    logout() {
      // ✅ clear cookie values
      this.accessToken.value = null
      this.refreshToken.value = null
      this.user = null
    }
  }
})
