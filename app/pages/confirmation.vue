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

      <div
        class="flex flex-row gap-4 justify-between items-center w-full my-16"
      >
        <UiButton
          label="Back"
          variant="secondary"
          size="lg"
          @click="router.push('/client-info')"
        />

        <UiButton
          :label="paymentButtonLabel"
          variant="primary"
          size="lg"
          :disabled="paymentInProgress"
          @click="submitOrder()"
        />
      </div>
    </section>
  </div>
  <Teleport to="body">
    <UiToast
      :message="message"
      :type="messageType"
    />
  </Teleport>
</template>

<script setup>
const clientStore = useClientStore()
const cartStore = useCartStore()
const productStore = useProductStore()
import { useCartTotal } from '~/composables/useCartTotal'

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
      toPayment(response.uuid)
    })
    .catch(() => {
      setToastMessage('Error processing order', 'error')
      clearToast()
    })
}

const createOrder = async () => {
  return $fetch('/api/delivery', {
    method: 'POST',
    body: {
      clientId: client.value.id,
      details: JSON.stringify(cartStore.cart),
    },
  })
}

const paymentInProgress = ref(false)
const paymentButtonLabel = computed(() => {
  if (paymentInProgress.value) {
    return 'Processing...'
  }
  return 'Pay now'
})

const toPayment = async (deliveryUuid) => {
  paymentInProgress.value = true
  try {
    await createMolliePayment(deliveryUuid)
  } catch (error) {
    paymentInProgress.value = false
    setToastMessage('Error redirecting to payment', 'error')
    clearToast()
  }
}

const createMolliePayment = async (deliveryUuid) => {
  const response = await $fetch('/api/create-payment', {
    method: 'POST',
    body: {
      amount: useCartTotal(cartStore, productStore).value,
      clientId: client.value.id,
      deliveryUuid,
    },
  })
  window.location.href = response.checkoutUrl
}

const message = ref('')
const messageType = ref('info')

const setToastMessage = (msg, type = 'error') => {
  message.value = msg
  messageType.value = type
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
