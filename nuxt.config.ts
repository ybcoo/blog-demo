// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  routeRules: {
    '/': { redirect: '/home' }
  },
  css: ['~/assets/css/global.css'] // 这里的路径是相对于项目根目录的
})
