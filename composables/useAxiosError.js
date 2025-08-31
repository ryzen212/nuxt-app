import { useToast } from "primevue";

export const useAxiosError = () => {
  const toast = useToast();
  const router = useRouter();

   function handleAxiosError(response) {

      const { status, data } = response;

      switch (status) {
        case 401: // Unauthorized
        case 419: // CSRF token expired
          router.push("/");
          break;
        case 403: // Forbidden
          router.push("/forbidden"); // optional, if you want a forbidden page
          break;
      }
      return { data, status };

  }

  return { handleAxiosError };
};
