import { useCookie } from "#app";
import axios from 'axios'


export const useAuth = () => {
  const user = ref(null);
  const token = useCookie("accessToken");

  const login = async (email, password) => {
    const res = await axios.post("/login", { email, password });

    // Save token in cookie
    token.value = res.data.accessToken;

    // Optionally fetch user data
    user.value = res.data.user || null;

    return res.data;
  };

  return {
    login,
  };
};
