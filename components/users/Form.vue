<script setup>
const toast = useToast();

const { create, update, showModal, closeModal } = useUserform();
const { loadTable } = useUserTable();
async function handeSubmit(e) {
    try {
        const formData = e.values;
        const data = await create(formData);
        await loadTable();
        toast.add({ severity: 'success', summary: data.status, detail: data.message, life: 3000 });
        closeModal();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'User create failed.', life: 3000 });
    }
}
</script>
<template>
    <Dialog v-model:visible="showModal" :style="{ width: '600px' }" header="Create User" :modal="true">
        <Form v-slot="$form" @submit="handeSubmit">
            <div class="flex flex-col gap-4">

                <div>
                    <FloatLabel variant="in">
                        <InputText name="userName" fluid />
                        <label>Username (required)</label>
                    </FloatLabel>
                    <!-- <Message class="p-1" v-if="$form.summary?.invalid || errors.summary" severity="error" size="small"
                        variant="simple">
                        {{ $form.summary?.invalid ? $form.summary.error.message : errors.summary[0] }}
                    </Message> -->
                </div>
                <div>
                    <FloatLabel variant="in">
                        <InputText name="email" fluid />
                        <label>Email (required)</label>
                    </FloatLabel>
                    <!-- <Message class="p-1" v-if="$form.summary?.invalid || errors.summary" severity="error" size="small"
                        variant="simple">
                        {{ $form.summary?.invalid ? $form.summary.error.message : errors.summary[0] }}
                    </Message> -->
                </div>

                <div>
                    <FloatLabel variant="in">
                        <InputText name="phoneNumber" fluid />
                        <label>Phone number (required)</label>
                    </FloatLabel>
                    <!-- <Message class="p-1" v-if="$form.summary?.invalid || errors.summary" severity="error" size="small"
                        variant="simple">
                        {{ $form.summary?.invalid ? $form.summary.error.message : errors.summary[0] }}
                    </Message> -->
                </div>
                <div>
                    <FloatLabel variant="in">
                        <InputText name="password" fluid />
                        <label>Password (required)</label>
                    </FloatLabel>
                    <!-- <Message class="p-1" v-if="$form.summary?.invalid || errors.summary" severity="error" size="small"
                        variant="simple">
                        {{ $form.summary?.invalid ? $form.summary.error.message : errors.summary[0] }}
                    </Message> -->
                </div>
                <div>
                    <FloatLabel variant="in">
                        <InputText name="role" fluid />
                        <label>Role (required)</label>
                    </FloatLabel>
                    <!-- <Message class="p-1" v-if="$form.summary?.invalid || errors.summary" severity="error" size="small"
                        variant="simple">
                        {{ $form.summary?.invalid ? $form.summary.error.message : errors.summary[0] }}
                    </Message> -->
                </div>
            </div>
            <div class="flex justify-end gap-2 mt-8">
                <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeModal" />
                <Button label="Save" icon="pi pi-check" type="submit" />
            </div>
        </Form>
    </Dialog>
</template>