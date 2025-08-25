import { ref } from "vue";

import axios from "axios";
export function useUserTable() {
  const data = ref([]);
  const selectedUsers = ref([]); // plural, since it's usually multiple
  const keyword = ref("");
  const isLoading = ref(true);
  const debounceTimeout = ref(null);
  const totalRecords = ref(0);

  // table state (pagination, sorting, filters)
  const params = ref({
    first: 0,
    rows: 10,
    filters: {},
    sortField: "",
    sortOrder: 1,
    search: "",
  });

  async function loadTable() {
    isLoading.value = true;
    try {
      const response = await axios.get("users", {
        params: params.value,
      });
      const result = response.data;
      data.value = result.data;
      totalRecords.value = result.totalRecords;
    } catch (error) {
      console.error("Error loading table data:", error);
    } finally {
      isLoading.value = false;
    }
  }
  async function onPageChange(event) {
    isLoading.value = true;
    params.value.first = event.first;
    params.value.rows = event.rows;

    await loadTable(); // No arguments needed as params are part of the store state
  }

  // Handle sorting changes
  async function onSortChange(event) {
    isLoading.value = true;
    params.value.first = 0;
    params.value.sortField = event.sortField;
    params.value.sortOrder = event.sortOrder;

    await loadTable(); // No arguments needed as params are part of the store state
  }

  async function onSearchTable() {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value); // Clear the previous timeout
    }

    debounceTimeout.value = setTimeout(() => {
      isLoading.value = true;
      params.value.search = keyword.value; // Update search term in params
      loadTable(); // Trigger the table reload
    }, 500); // Delay of 500ms
  }

  // helper for search with debounce

  return {
    // state
    data,
    selectedUsers,
    keyword,
    isLoading,
    totalRecords,
    params,

    // methods
    loadTable,
    onPageChange,
    onSortChange,
    onSearchTable,
  };
}
