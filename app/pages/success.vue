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
      <div class="flex flex-row justify-between items-center w-full my-16">
        <UiButton
          label="Send mail"
          variant="primary"
          size="lg"
          @click="sendMail()"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const clientStore = useClientStore()

const client = clientStore.currentClient

const message = 'Bedankt voor je bestelling!'

const mailFailed = ref(false)

const sendMail = async () => {
  try {
    await $fetch('/api/sendMail', {
      method: 'POST',
      body: {
        to: client.email,
        bcc: 'info@ding-music.nl',
        subject: 'Confirmation of your order',
        message,
      },
    })

    clientStore.clearClient()
  } catch (error) {
    console.error('Error sending email:', error)
    mailFailed.value = true
  }
}
</script>
