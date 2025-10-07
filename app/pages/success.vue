<template>
  <div
    class="wrapper bg-[url(/img/generic-bg-mobile.jpg)] md:bg-[url(/img/generic-bg-tablet.jpg)] lg:bg-[url(/img/generic-bg-desktop.jpg)]"
  >
    <section class="content-container--first">
      <h1>Order processed</h1>
      <p>
        Your order has been received and is being processed. We will send the
        order to you shortly.
      </p>
      <p v-if="mailFailed">
        Something went wrong while sending email with your order details
      </p>
      <p v-else>You received an email with your order status as well.</p>
    </section>
  </div>
</template>

<script setup>
const clientStore = useClientStore()
const cartStore = useCartStore()
const client = computed(() => clientStore.client)

const mailFailed = ref(false)

const sendMail = async () => {
  try {
    const response = await $fetch('/api/confirmation-mail', {
      method: 'POST',
      body: {
        to: client.value.email,
        orderId: 'ORD12345',
        total: '89.95',
        subject: 'Your order confirmation from DING!',
        message: `Dear ${client.value.name},<br /><br />
        Thank you for your order! We are currently processing it and will notify you once it has shipped.<br /><br />
        Best regards,<br />
        The DING! Team`,
      },
    })
    if (response.success) alert('Confirmation mail has been sent!')
  } catch (err) {
    console.error(err)
    alert('Unable to send confirmation mail.')
  }
}

watch(
  client,
  async (val) => {
    if (val && val.email) {
      await sendMail()
      clientStore.clearClient()
      cartStore.clearCart()
    }
  },
  { immediate: true }
)
</script>
