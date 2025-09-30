<template>
  <div class="cart-overlay">
    <h4>Just added to your cart</h4>
    <CartItem :album="props.album" />
    <div class="flex flex-row justify-between items-center w-full">
      <UiButton
        label="Close"
        variant="secondary"
        size="md"
        @click="$emit('close')"
      />

      <UiButton
        label="View cart"
        variant="primary"
        size="md"
        @click="router.push('/cart')"
      />
    </div>

    <UiButton
      class="cart-overlay__close"
      icon="ic:round-close"
      size="lg"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  album: {
    type: Object,
  },
})

const router = useRouter()
</script>

<style scoped>
.cart-overlay {
  @apply fixed top-0 right-0 w-full max-w-[25rem] bg-black/80 z-[999] flex flex-col justify-center items-center gap-8 p-8 pt-20;
}

.cart-overlay__close {
  @apply absolute top-3 right-4;
}
</style>
