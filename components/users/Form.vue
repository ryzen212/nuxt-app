<script setup>
import { resolver } from '~/formSchemas/users/userCreateSchema';
const toast = useToast();
const { handleAxiosError } = useAxiosError();
const { create, update, showModal, closeModal } = useUserform();
const { loadTable } = useUserTable();

const user = reactive({
    userName: null,
    email: null,
    phoneNumber: null,
    password: null,
    role: null,

})

const formErrors = ref({});
async function handeSubmit(e) {
    // if (!e.valid) return;

    try {
        const formData = e.values;
        const data = await create(formData);
        await loadTable();
        toast.add({ severity: 'success', summary: data.status, detail: data.message, life: 3000 });
        closeModal();
    } catch (error) {

        const { errors } = handleAxiosError(error);
        formErrors.value = errors;

    }
}
</script>
<template>
    <Dialog v-model:visible="showModal" :initialValues="user" :style="{ width: '600px' }" header="Create User"
        :modal="true">
        <Form v-slot="$form" @submit="handeSubmit">
            <div class="flex flex-col gap-4">

                <div>
                    <FloatLabel variant="in">
                        <InputText name="userName" v-model="user.userName" fluid />
                        <label>Username (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.userName?.invalid || formErrors.userName" severity="error"
                        size="small" variant="simple">
                        {{ $form.userName?.invalid ? $form.userName.error.message : formErrors.userName[0] }}
                    </Message>
                </div>
                <div>
                    <FloatLabel variant="in">
                        <InputText name="email" v-model="user.email" fluid />
                        <label>Email (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.email?.invalid || formErrors.email" severity="error" size="small"
                        variant="simple">
                        {{ $form.email?.invalid ? $form.email.error.message : formErrors.email[0] }}
                    </Message>
                </div>

                <div>
                    <FloatLabel variant="in">
                        <InputText name="phoneNumber" v-model="user.phoneNumber" fluid />
                        <label>Phone number (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.phoneNumber?.invalid || formErrors.phoneNumber" severity="error"
                        size="small" variant="simple">
                        {{ $form.phoneNumber?.invalid ? $form.phoneNumber.error.message : formErrors.phoneNumber[0] }}
                    </Message>
                </div>
                <div>
                    <FloatLabel variant="in">
                        <InputText name="password" v-model="user.password" fluid />
                        <label>Password (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.password?.invalid || formErrors.password" severity="error"
                        size="small" variant="simple">
                        {{ $form.password?.invalid ? $form.password.error.message : formErrors.password[0] }}
                    </Message>
                </div>
                <div>
                    <FloatLabel variant="in">
                        <InputText name="role" v-model="user.role" fluid />
                        <label>Role (required)</label>
                    </FloatLabel>
                    <Message class="p-1" v-if="$form.role?.invalid || formErrors.role" severity="error" size="small"
                        variant="simple">
                        {{ $form.role?.invalid ? $form.role.error.message : formErrors.role[0] }}
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