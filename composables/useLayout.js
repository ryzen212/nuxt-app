import { ref } from "vue";


const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
});

const toggleSidebar = () => {
  if (window.innerWidth > 991) {
    layoutState.staticMenuDesktopInactive =
      !layoutState.staticMenuDesktopInactive;
  } else {
    layoutState.staticMenuDesktopInactive = false;
    layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
  }
};

const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

export const useLayout = () => {
  return {
    layoutState,
    toggleSidebar,
    isSidebarActive
  };
};
