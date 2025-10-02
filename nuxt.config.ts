export default defineNuxtConfig({
  app: {
    head: {
      title: 'DING!', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
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
