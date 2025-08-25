import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("useAuthStore", {
  state: () => ({
    user: null,
  }),

  actions: {
    async login(userName, password) {
      
      const res = await axios.post("auth/login", { userName, password });

      const accessToken = useCookie("accessToken"); // ✅ safe inside action
      const refreshToken = useCookie("refreshToken");

      accessToken.value = res.data.accessToken;
      refreshToken.value = res.data.refreshToken;
      this.user = res.data.user || null;
      console.log(this.user);

      return res;
    },

    async fetchUser() {
      try {
        const res = await axios.get("auth/user");
        this.user = res.data;
      } catch (error) {
        this.user = null;
      }
    },

    logout() {
      const accessToken = useCookie("accessToken"); // ✅ safe inside action
      const refreshToken = useCookie("refreshToken");

      accessToken.value = null;
      refreshToken.value = null;
      this.user = null;
    },
  },
});
