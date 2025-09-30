import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({ cart: [] }),
  getters: {
    currentCart: (state) => state.cart,
    totalItems: (state) =>
      state.cart.reduce((total, item) => total + item.qty, 0),
  },
  actions: {
    incrementCart(productId) {
      const product = this.cart.find((item) => item.id === productId) || null
      if (product) {
        product.qty += 1
      } else {
        this.cart.push({ id: productId, qty: 1 })
      }
      this.updateStoredCart()
    },
    decrementCart(productId) {
      const product = state.cart.find((item) => item.id === productId) || null
      if (product) {
        product.qty -= 1
        if (product.qty <= 0) {
          this.cart = this.cart.filter((item) => item.id !== productId)
        }

        this.updateStoredCart()
      }
    },
    updateCart(productId, qty) {
      const product = this.cart.find((item) => item.id === productId) || null
      if (product) {
        product.qty = qty
        if (product.qty <= 0) {
          this.cart = this.cart.filter((item) => item.id !== productId)
        }
        this.updateStoredCart()
      }
    },
    updateStoredCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    setCart() {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        this.cart = JSON.parse(storedCart)
      } else {
        this.cart = []
      }
    },
    clearCart() {
      this.cart = []
      localStorage.removeItem('cart')
    },
  },
})
