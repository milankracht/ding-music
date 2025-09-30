<template>
  <div
    class="wrapper bg-[url(/img/generic-bg-mobile.jpg)] md:bg-[url(/img/generic-bg-tablet.jpg)] lg:bg-[url(/img/generic-bg-desktop.jpg)]"
  >
    <section class="content-container--first">
      <h1>Confirmation</h1>
      <h2>You ordered following items</h2>
      <CartTable variant="dense" />
      <h2>Order will be shipped to</h2>
      <dl>
        <template
          v-for="field in clientFields"
          :key="field.key"
        >
          <dd>{{ field.label }}</dd>
          <dt>{{ client[field.key] }}</dt>
        </template>
      </dl>

      <div class="flex flex-row justify-between items-center w-full my-16">
        <UiButton
          label="Back"
          variant="secondary"
          size="lg"
          @click="router.push('/client-info')"
        />

        <UiButton
          label="Pay now"
          variant="primary"
          size="lg"
          @click="submitOrder()"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const clientStore = useClientStore()

const clientFields = [
  { key: 'email', label: 'Email' },
  { key: 'name', label: 'Name' },
  { key: 'address', label: 'Address' },
  { key: 'postalCode', label: 'Postal Code' },
  { key: 'city', label: 'City' },
  { key: 'country', label: 'Country' },
]

const client = computed(() => clientStore.client)

const submitOrder = () => {
  createOrder()
    .then((response) => {
      console.log('Client created:', response)
      console.log('Go to payment gateway...')
    })
    .catch(() => {
      setToastMessage('Error processing order', 'error')
      clearToast()
    })
}

const createOrder = async () => {
  return $fetch('/api/order', {
    method: 'POST',
    body: {
      clientId: client.value.id,
      details: JSON.stringify(useCartStore().cart),
    },
  })
}
</script>

<style scoped>
dl {
  @apply grid grid-cols-2 gap-x-8 gap-y-4 max-w-[90%] md:max-w-[50%] mb-16;
}

dd {
  @apply font-light text-gray-200;
}
dt {
  @apply font-bold;
}
</style>
