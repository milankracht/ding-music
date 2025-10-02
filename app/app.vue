<template>
  <div>
    <ui-header />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  title: 'DING!',
  meta: [
    {
      name: 'description',
      content:
        'DING! music brims with lively melodic themes, concise solos, group improvisation, and playful rhythms—Afro grooves, odd meters, 70s funk—all with one rule in mind: even when we wander far off the beaten path, we never forget the listener. ',
    },
  ],
})

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
