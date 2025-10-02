<template>
  <table class="cart-table mb-16">
    <thead v-if="props.variant === 'normal'">
      <tr>
        <th>Product</th>
        <th class="w-[6rem]">Quantity</th>
        <th class="text-right w-[6rem]">Price</th>
      </tr>
    </thead>
    <tbody>
      <CartTableRow
        v-for="item in cartItems"
        :key="item.id"
        :product-id="item.id"
        :qty="item.qty"
        :variant="props.variant"
      />
    </tbody>
    <tfoot>
      <tr class="border-b border-white/50">
        <td class="pl-28">Shipping</td>
        <td></td>
        <td class="cart-table__amount font-bold">
          {{ formatPrice(shippingCost.shipping.value) }}
        </td>
      </tr>
      <tr>
        <td class="pl-28">Total</td>
        <td></td>
        <td class="cart-table__amount font-black">
          {{ formatPrice(cartTotal) }}
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { SHIPPING_COST, SHIPPING_COST_CD_ONLY } from '~/utils/constants'
import { formatPrice } from '~/utils/helper/price'
import { useCartTotal } from '~/composables/useCartTotal'
import { useShippingCost } from '~/composables/useShippingCost'

const props = defineProps({
  variant: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'dense'].includes(value),
  },
})

const cartStore = useCartStore()
const cartItems = computed(() => {
  return cartStore.currentCart.map((item) => {
    return { id: +item.id, qty: +item.qty }
  })
})

// const hasVinyl = computed(() => {
//   const productStore = useProductStore()
//   return cartStore.currentCart.some((cartItem) => {
//     const product = productStore.allProducts.find(
//       (prod) => prod.id === +cartItem.id
//     )
//     return product && product.type === 'vinyl'
//   })
// })

// const shipping = computed(() => {
//   return hasVinyl.value ? SHIPPING_COST : SHIPPING_COST_CD_ONLY
// })

const productStore = useProductStore()

const shippingCost = useShippingCost(cartStore, productStore)

const cartTotal = useCartTotal(cartStore, productStore)
</script>

<style scoped>
.cart-table {
  @apply w-full text-left border-collapse;
}

thead th {
  @apply pb-4 text-sm uppercase tracking-[10%];
}

tfoot td {
  @apply py-2;
}

.cart-table__amount {
  @apply text-[1.25rem] text-right;
}
</style>
