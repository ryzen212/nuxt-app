import { ref } from "vue";

import axios from "axios";

const userId = ref();
const showModal = ref(false);

export function useUserform() {
    
  function openAdd() {
    showModal.value = true;
  }
  function closeModal() {
    showModal.value = false;
  }

  async function create(formData) {
    const { data } = await axios.post("users", formData);
    return data;
  }
  async function update(formData) {
    const { data } = await axios.put(`users/${userId.value}`, formData);
    return data;
  }

  return {
    showModal,
    userId,
    openAdd,
    closeModal,
    create,
    update,
  };
}
