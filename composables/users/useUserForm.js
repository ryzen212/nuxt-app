import { ref } from "vue";

import axios from "axios";

const showModal = ref(false);
const user = reactive({
  id: null,
  userName: null,
  email: null,
  phoneNumber: null,
  password: null,
  role: null,
});
export function useUserform() {
  function openAdd() {
    resetUser();
    showModal.value = true;
  }
  function openEditModal(data) {
    resetUser();
    user.id = data.id;
    user.userName = data.userName;
    user.email = data.email;
    user.phoneNumber = data.phoneNumber;
    user.role = data.role;
    showModal.value = true;
  }
  function closeModal() {
    showModal.value = false;
  }
  function resetUser() {
    Object.assign(user, {
      id: null,
      userName: null,
      email: null,
      phoneNumber: null,
      password: null,
      role: null,
    });
  }
  async function create(formData) {
    const { data } = await axios.post("users", formData);
    return data;
  }
  async function update(formData) {
    const { data } = await axios.put(`users/${user.id}`, formData);
    return data;
  }

  return {
    showModal,
    openEditModal,
    user,
    openAdd,
    closeModal,
    create,
    update,
  };
}
