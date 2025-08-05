import axios from 'axios'

export default defineNuxtPlugin(() => {
  axios.defaults.baseURL = 'https://localhost:7241' // Your ASP.NET API
  axios.defaults.withCredentials = true             // For cookies (if used)
  axios.defaults.withXSRFToken = true               // Not needed for JWT
})