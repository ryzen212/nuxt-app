<script setup>
import { resolver } from '~/formSchemas/users/userCreateSchema';
const toast = useToast();
const { handleAxiosError } = useAxiosError();
const { create, update, showModal, closeModal, user } = useUserform();
const { loadTable } = useUserTable();



const errors = ref({});
async function handeSubmit(e) {
    console.log(user);
    if (!e.valid) return;
    try {
        const formData = e.values;
        let data;
        if (user.id) {
            data = await update(formData);
        } else {
            data = await create(formData);
        }
   
        console.log(data);
        await loadTable();
       toast.add({ severity: 'success', summary: data.status, detail: data.message, life: 3000 });
        closeModal();
    } catch (error) {
        if (error.response) {
            const { data, status } = handleAxiosError(error.response);
            if (status == 422) {
                errors.value = data.errors;
            }
        }
      console.error(error.message);

    }
}
</script>
<template>
    <Dialog v-model:visible="showModal"  :style="{ width: '600px' }"
        :header="user.id ? 'Update User' : 'Create User'" :modal="true">
        <Form v-slot="$form" :initialValues="user" :resolver @submit="handeSubmit">
            <div class="flex flex-col gap-4">

                <div>
                    <FloatLabel variant="in">
                        <InputText name="userName" v-model="user.userName" fluid />
                        <label>Username (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.userName?.invalid || errors.userName" severity="error" size="small"
                        variant="simple">
                        {{ $form.userName?.invalid ? $form.userName.error.message : errors.userName[0] }}
                    </Message>
                </div>
                <div>
                    <FloatLabel variant="in">
                        <InputText name="email" v-model="user.email" fluid />
                        <label>Email (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.email?.invalid || errors.email" severity="error" size="small"
                        variant="simple">
                        {{ $form.email?.invalid ? $form.email.error.message : errors.email[0] }}
                    </Message>
                </div>

                <div>
                    <FloatLabel variant="in">
                        <InputText name="phoneNumber" v-model="user.phoneNumber" fluid />
                        <label>Phone number (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.phoneNumber?.invalid || errors.phoneNumber" severity="error"
                        size="small" variant="simple">
                        {{ $form.phoneNumber?.invalid ? $form.phoneNumber.error.message : errors.phoneNumber[0] }}
                    </Message>
                </div>
                <div>
                    <FloatLabel variant="in">
                        <InputText name="password" v-model="user.password" fluid />
                        <label>Password (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.password?.invalid || errors.password" severity="error" size="small"
                        variant="simple">
                        {{ $form.password?.invalid ? $form.password.error.message : errors.password[0] }}
                    </Message>
                </div>
                <div>
                    <FloatLabel variant="in">
                        <InputText name="role" v-model="user.role" fluid />
                        <label>Role (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.role?.invalid || errors.role" severity="error" size="small"
                        variant="simple">
                        {{ $form.role?.invalid ? $form.role.error.message : errors.role[0] }}
                    </Message>
                </div>
            </div>
            <div class="flex justify-end gap-2 mt-8">
                <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeModal" />
                <Button label="Save" icon="pi pi-check" type="submit" />
            </div>
        </Form>
    </Dialog>
</template>