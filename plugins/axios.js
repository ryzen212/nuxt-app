import axios from "axios";

export default defineNuxtPlugin(() => {
  // Main axios instance
  axios.defaults.baseURL = "http://localhost:5288/api/";

  // Create raw axios instance (no interceptors)
  const rawAxios = axios.create({
    baseURL: "http://localhost:5288/api/",
  });

  // Request interceptor
  axios.interceptors.request.use((config) => {
    const auth = useAuthStore();
    const accessToken = useCookie("accessToken");
    if (accessToken.value) {
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    }

    return config;
  });

  // Response interceptor
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const auth = useAuthStore();

      if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true; // avoid multiple retries

        try {
          // Use rawAxios so interceptor doesn’t fire again
          const res = await rawAxios.post("auth/refresh", {
            refreshToken: auth.refreshToken,
          });

          const accessToken = useCookie("accessToken");
          const refreshToken = useCookie("refreshToken");
          accessToken.value = res.data.accessToken;
          refreshToken.value = res.data.refreshToken;

          // Retry original request with new token
          error.config.headers.Authorization = `Bearer ${accessToken.value}`;
          return axios(error.config);
        } catch (refreshError) {
          auth.logout();
        }
      }

      return Promise.reject(error);
    }
  );
});
