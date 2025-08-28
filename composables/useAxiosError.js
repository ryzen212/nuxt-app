import { useToast } from "primevue";

export const useAxiosError = () => {
  const toast = useToast();
  const router = useRouter();

  function handleAxiosError(error) {
    if (error.response) {
      const { status, data } = error.response;
      let errors = {};
      switch (status) {
        case 400: // Validation
          toast.add({
            severity: "error",
            summary: "Please try again.",
            detail: "Validation failed.",
            life: 3000,
          });
          errors = data.errors;
          console.log(errors);
          return { errors };

        case 401: // Unauthorized
          router.push("/");
          toast.add({
            severity: "error",
            summary: data.summary,
            detail: data.message,
            life: 3000,
          });

          return { errors };

        default:
          toast.add({
            severity: "error",
            summary: "Please try again.",
            detail: "Unexpected Error.",
            life: 3000,
          });
          return { errors };
      }
    } else {
      toast.add({
        severity: "error",
        summary: "Please try again.",
        detail: "Unexpected Error.",
        life: 3000,
      });
      return { type: "network", message: "Network error" };
    }
  }

  return { handleAxiosError };
};
