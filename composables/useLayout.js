import { ref } from "vue";
const isSidebarActive = ref(true);

const toggleSidebar = () => {
  isSidebarActive.value = !isSidebarActive.value;

};

export const useLayout = () => {
  return {
    isSidebarActive,
    toggleSidebar,
  };
};
