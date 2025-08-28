// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devServer: {
    host: '0.0.0.0',  // Доступ с хоста
  },
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: true,
    },
    {
      path: '~/components/public',
      pathPrefix: false,
    }
  ],
  runtimeConfig: {
    apiSecret: '123',
    jwtAccessSecret: process.env.NUXT_JWT_ACCESS_SECRET,
    jwtAccessLife: process.env.NUXT_JWT_ACCESS_LIFE,
    jwtRefreshSecret: process.env.NUXT_JWT_REFRESH_SECRET,
    jwtRefreshLife: process.env.NUXT_JWT_REFRESH_LIFE
  },
  routeRules: {
    '/api/**': { cors: true },
  },
  css: [
    '@/assets/css/tailwind.css'
  ],
  modules: [
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
