import axios from 'axios'

export default defineNuxtPlugin(() => {
  // Main axios instance
  axios.defaults.baseURL = 'http://localhost:5288/api'

  // Create raw axios instance (no interceptors)
  const rawAxios = axios.create({
    baseURL: 'http://localhost:5288/api',
  })

  // Request interceptor
  axios.interceptors.request.use((config) => {
    const auth = useAuthStore()

    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`
    }

    return config
  })

  // Response interceptor
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const auth = useAuthStore()

      if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true // avoid multiple retries

        try {
          // Use rawAxios so interceptor doesn’t fire again
          const res = await rawAxios.post('/auth/refresh', {
            refreshToken: auth.refreshToken,
          })

          auth.accessToken = res.data.accessToken
          auth.refreshToken = res.data.refreshToken

          // Retry original request with new token
          error.config.headers.Authorization = `Bearer ${auth.accessToken}`
          return axios(error.config)
        } catch (refreshError) {
          auth.logout()
        }
      }

      return Promise.reject(error)
    }
  )
})
