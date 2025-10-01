import { computed } from 'vue'

/**
 * Returns a computed ref for the cart total, including shipping cost.
 * @param {Object} cartStore - The cart store instance (must have currentCart).
 * @param {Object} productStore - The product store instance (must have allProducts).
 * @param {number} shippingCost - The shipping cost to include in the total.
 * @returns {import('vue').ComputedRef<string>} - Computed ref with total as string (2 decimals).
 */
export function useCartTotal(cartStore, productStore, shippingCost) {
  return computed(() => {
    return cartStore.currentCart
      .reduce((total, item) => {
        const product = productStore.allProducts.find((p) => p.id === +item.id)
        return total + (product ? product.price * item.qty : 0)
      }, shippingCost)
      .toFixed(2)
  })
}
