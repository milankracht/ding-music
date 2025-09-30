<template>
  <tr>
    <td
      :class="props.variant === 'normal' ? 'py-5' : 'pt-3 pb-1'"
      :colspan="props.variant === 'normal' ? 1 : 2"
    >
      <CartItem
        :album="album"
        :cartRow="true"
        :qty="props.qty"
      />
    </td>
    <td
      v-if="props.variant === 'normal'"
      class="py-2"
    >
      <input
        type="number"
        :value="props.qty"
        class="max-w-20 text-center"
        @change="updateQty($event.target.value)"
      />
    </td>
    <td class="item-row__total">{{ formatPrice(itemTotal) }}</td>
  </tr>
</template>

<script setup>
import { formatPrice } from '~/utils/helper/price'

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    default: 0,
  },
  variant: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'dense'].includes(value),
  },
})

const productStore = useProductStore()

const album = computed(() => {
  return productStore.allProducts.find((item) => item.id === +props.productId)
})

const itemTotal = computed(() => {
  return (album.value.price * props.qty).toFixed(2) || '0.00'
})

const cartStore = useCartStore()

const updateQty = (newQty) => {
  cartStore.updateCart(+props.productId, +newQty)
}
</script>

<style scoped>
.item-row__total {
  @apply text-right;
}

tr {
  @apply border-b border-white/50;
}

td {
  @apply align-top;
}

.item-row__total {
  @apply text-[1.25rem] font-bold py-3;
}
</style>
