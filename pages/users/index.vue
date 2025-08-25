<script setup>


const { openAdd } = useUserform();

definePageMeta({
  middleware: 'auth',
  layout: 'auth'
})


</script>

<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #start>
        <Button label="New User" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openAdd()" />
      </template>
    </Toolbar>
    <UsersTable />

    <!-- Modals -->
    <UsersForm />
  </div>

</template>