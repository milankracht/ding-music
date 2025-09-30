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
      <p>You received an email with your order status as well.</p>
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
const sendMail = async () => {
  try {
    await $fetch('/api/sendMail', {
      method: 'POST',
      body: {
        to: 'milankr8@icloud.com',
        subject: 'Bestelbevestiging',
        message: 'Bedankt voor je bestelling!',
      },
    })
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
</script>
