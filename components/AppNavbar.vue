
<script setup>
const {  toggleSidebar } = useLayout()


</script>
<template>
    <div class="layout-topbar">
        <div class="flex items-center flex-1">
            <Button icon="pi pi-bars" class="layout-menu-button" aria-label="Save" variant="text" size="large" @click="toggleSidebar" rounded />
            <span class="ms-2 text-2xl">SAM</span>
        </div>
        <div>
            <Avatar label="U" class="mr-2" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
        </div>
    </div>
</template>