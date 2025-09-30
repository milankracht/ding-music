import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({ products: [] }),
  getters: {
    allProducts: (state) => state.products,
  },
  actions: {
    async fetchProducts() {
      const { data: products } = await useFetch('/api/products')
      this.products = products.value || []
    },
  },
})
