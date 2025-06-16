<script setup>
const { isSidebarActive } = useLayout();


</script>

<template>

  <div class="layout-wrapper"  :class="{ 'layout-sidebar-inactive': isSidebarActive }">
    <AppNavbar />
    <AppSidebar />
    <div class="container">
      <slot />
    </div>
  </div>
</template>