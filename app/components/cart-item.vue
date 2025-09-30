<template>
  <div
    v-if="props.album"
    class="cart-item"
  >
    <img
      :src="props.album.image"
      :alt="`${props.album.title} album cover`"
      class="cart-item__image"
      :class="{
        'hidden md:block': cartRow,
        'cart-item__image--small': props.qty,
      }"
    />
    <div class="cart-item__details">
      <h4 class="text-[1.125rem]">{{ props.album.title }}</h4>
      <p class="capitalize">
        {{ props.album.year }} – {{ album.type }}{{ displayedQty }}
      </p>
      <div
        v-if="!props.qty"
        class="text-base font-black"
      >
        {{ price }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '~/utils/helper/price'

const props = defineProps({
  album: {
    type: Object,
    required: true,
  },
  cartRow: {
    type: Boolean,
    default: false,
  },
  qty: {
    type: Number,
    default: 0,
  },
})

const price = computed(() => {
  return formatPrice(props.album.price, props.album.currency)
})

const displayedQty = computed(() => {
  const postfix = props.qty > 1 ? 'copies' : 'copy'
  return ` | ${props.qty} ${postfix}` || ''
})
</script>

<style scoped>
.cart-item {
  @apply flex flex-row gap-4;
}

.cart-item__image {
  @apply w-[6rem] h-[6rem] object-cover aspect-square drop-shadow-[var(--drop-shadow-md)];
}

.cart-item__image--small {
  @apply w-[4rem] h-[4rem];
}

.cart-item__details {
  @apply flex flex-col justify-center;
}
</style>
