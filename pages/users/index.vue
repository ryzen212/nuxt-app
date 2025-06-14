<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <div class="flex items-center justify-center min-h-100">

    <div class="card">
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

          <Button>Sign In</Button>
        </div>
      </Form>
    </div>

  </div>
</template>