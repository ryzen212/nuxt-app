// import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async () => {
  const accessToken = useCookie("accessToken");
  if (!accessToken.value) {
    return navigateTo("/");
  }
  const auth = useAuthStore();
  try {
    await auth.fetchUser();
  } catch (error) {
    auth.logout();
    return navigateTo("/");
  }
});
