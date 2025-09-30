<template>
  <div>
    <ui-header />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const productStore = useProductStore()
productStore.fetchProducts().catch((error) => {
  console.error('Error fetching products:', error)
})

const clientStore = useClientStore()

onMounted(() => {
  // TODO: only fetch client if uuid is set and client is not in store
  const clientUuid = localStorage.getItem('client') || null
  if (clientUuid) {
    clientStore.fetchClientById(clientUuid).catch((error) => {
      console.error('Error fetching client:', error)
    })
  }
})
</script>
<style></style>
