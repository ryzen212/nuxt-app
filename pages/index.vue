<script setup lang="ts">
definePageMeta({
  layout: 'guest'
})
</script>

<template>

  <div class="card">
    <div class="text-center mb-8">
      <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to System Advisor Model!</div>
      <span class="text-muted-color font-medium">Sign in to continue</span>
    </div>
    <Form>
      <div class="flex flex-col gap-2">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText placeholder="Username" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <IconField>

            <InputText placeholder="Keyword Search" />
            <InputIcon>
              <i class="pi pi-eye-slash" />
            </InputIcon>
          </IconField>
        </InputGroup>
        <Button class="mt-4">Sign In</Button>
      </div>
    </Form>
  </div>

</template>