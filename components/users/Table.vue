<script setup>


const { data, params, keyword, isLoading, totalRecords, loadTable, onPageChange, onSortChange, onSearchTable } = useUserTable(); // ✅ works
const {  openEditModal } = useUserform();


onMounted(async () => {
  await loadTable();
});
</script> 

<template>

  <DataTable :value="data" :paginator="true" dataKey="id" :loading="isLoading" :rows="params.rows" :lazy="true"
    :first="params.first" scrollHeight="500px" :totalRecords="totalRecords" @page="onPageChange" @sort="onSortChange"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 25, 50]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
    <template #empty> No users found. </template>
    <template #loading> Loading users data. Please wait. </template>
    <template #header>
      <div class="flex flex-wrap gap-2 items-center justify-between">
        <h2 class="text-xl">Manage Users </h2>
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText v-model="keyword" @keydown="onSearchTable" placeholder="Search..." fluid />
        </IconField>
      </div>
    </template>
    <Column field="userName" header="Name" sortable></Column>
    <Column field="email" header="Email" sortable style="min-width: 12rem"></Column>
    <Column field="role" header="Role" sortable style="min-width: 15rem"></Column>

    <Column header="Actions" style="min-width: 12rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" outlined rounded class="mr-2"  @click="openEditModal(slotProps.data)"/>
        <Button icon="pi pi-trash" outlined rounded severity="danger" />
      </template>
    </Column>
  </DataTable>

</template>