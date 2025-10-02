<template>
  <div
    class="wrapper bg-[url(/img/order-bg-mobile.jpg)] md:bg-[url(/img/order-bg-tablet.jpg)] lg:bg-[url(/img/order-bg-desktop.jpg)]"
  >
    <section class="content-container--first">
      <h1>Order</h1>

      <div class="flex flex-col gap-8">
        <template v-if="prioOneProducts.length">
          <Album
            v-for="product in prioOneProducts"
            :key="product.id"
            :album="product"
            @toggle-overlay="toggleOverlay"
            @add-to-cart="addToCart"
          />
        </template>
      </div>
    </section>

    <section class="content-container">
      <h2>You might also like</h2>

      <div class="flex flex-row gap-4 space-between flex-wrap gap-8">
        <template v-if="prioTwoProducts.length">
          <Album
            v-for="product in prioTwoProducts"
            :key="product.id"
            :album="product"
            size="sm"
            @toggle-overlay="toggleOverlay"
            @add-to-cart="addToCart"
          />
        </template>
      </div>
    </section>

    <InfoOverlay
      :is-visible="overlayIsVisible"
      :album="activeProduct"
      @close="closeInfoOverlay"
    />

    <CartOverlay
      v-if="cartOverlayVisible"
      :album="activeProduct"
      @close="closeCartOverlay"
    />
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore'

const overlayIsVisible = ref(false)
const activeProductId = ref(null)

const productStore = useProductStore()

const prioOneProducts = computed(() => {
  return productStore.allProducts?.filter((product) => product.prio === 1) || []
})

const prioTwoProducts = computed(() => {
  return productStore.allProducts?.filter((product) => product.prio > 1) || []
})

const toggleOverlay = (productId) => {
  if (!productId) return
  activeProductId.value = productId
  overlayIsVisible.value = !overlayIsVisible.value
}

const closeInfoOverlay = () => {
  overlayIsVisible.value = false
  activeProductId.value = null
}

const activeProduct = computed(() => {
  return (
    productStore.allProducts?.find(
      (product) => product.id === activeProductId.value
    ) || null
  )
})

const cartOverlayVisible = ref(false)

const cartStore = useCartStore()

const addToCart = (productId) => {
  if (productId) {
    activeProductId.value = productId
    cartOverlayVisible.value = true

    try {
      cartStore.incrementCart(productId)
    } catch (e) {
      console.error('Error in incrementCart:', e)
    }
  }
}

const closeCartOverlay = () => {
  cartOverlayVisible.value = false
  activeProductId.value = null
}
</script>
