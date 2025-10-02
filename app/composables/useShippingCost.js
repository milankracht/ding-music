import { computed } from 'vue'
import { SHIPPING_COST, SHIPPING_COST_CD_ONLY } from '~/utils/constants'
import { useProductStore } from '~/stores/productStore'
import { useCartStore } from '~/stores/cartStore'

/**
 * Returns a computed shipping cost based on whether the cart contains vinyl items.
 * @returns {import('vue').ComputedRef<number>} The computed shipping cost.
 */
export function useShippingCost() {
  const cartStore = useCartStore()
  const productStore = useProductStore()

  const hasVinyl = computed(() => {
    return cartStore.currentCart.some((cartItem) => {
      const product = productStore.allProducts.find(
        (prod) => prod.id === +cartItem.id
      )
      return product && product.type === 'vinyl'
    })
  })

  const shipping = computed(() => {
    return hasVinyl.value ? SHIPPING_COST : SHIPPING_COST_CD_ONLY
  })

  return { shipping, hasVinyl }
}
