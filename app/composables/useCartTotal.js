import { computed } from 'vue'
import { useShippingCost } from '~/composables/useShippingCost'

/**
 * Returns a computed ref for the cart total, including shipping cost.
 * @param {Object} cartStore - The cart store instance (must have currentCart).
 * @param {Object} productStore - The product store instance (must have allProducts).
 * @returns {import('vue').ComputedRef<string>} - Computed ref with total as string (2 decimals).
 */

export function useCartTotal(cartStore, productStore) {
  const { shipping } = useShippingCost()
  return computed(() => {
    const itemsTotal = cartStore.currentCart.reduce((total, item) => {
      const product = productStore.allProducts.find((p) => p.id === +item.id)
      return total + (product ? product.price * item.qty : 0)
    }, 0)
    return (itemsTotal + shipping.value).toFixed(2)
  })
}
