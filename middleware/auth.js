import { useAuthStore } from "#imports";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  try {
    await auth.fetchUser(); // fetch user info from backend
  } catch (error) {
   auth.logout();
    console.error(error.message);
  return navigateTo("/");
  }
  if (!auth.accessToken) {
    return navigateTo("/");
  }
});
