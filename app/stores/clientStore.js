import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', {
  state: () => ({ client: {} }),
  getters: {
    currentClient: (state) => state.client,
  },
  actions: {
    async fetchClientById(uuid) {
      const response = await $fetch(`/api/clients/${uuid}`)
      this.client = response || {}
    },
    setClient(client) {
      this.client = client
      localStorage.setItem('client', client.uuid)
    },
  },
})
