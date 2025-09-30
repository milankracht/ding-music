export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-08-09',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
  },
})
