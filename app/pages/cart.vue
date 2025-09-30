<template>
  <div
    class="wrapper bg-[url(/img/generic-bg-mobile.jpg)] md:bg-[url(/img/generic-bg-tablet.jpg)] lg:bg-[url(/img/generic-bg-desktop.jpg)]"
  >
    <section class="content-container--first">
      <h1>Cart</h1>
      <CartTable />

      <div class="flex flex-row justify-between items-center w-full my-8">
        <UiButton
          label="Continue shopping"
          variant="secondary"
          size="lg"
          @click="router.push('/order')"
        />

        <UiButton
          label="Check out"
          variant="primary"
          size="lg"
          @click="router.push('/client-info')"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const router = useRouter()
</script>
