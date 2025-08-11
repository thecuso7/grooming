// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    jwtAccessSecret: 'NUXT_JWT_ACCESS_SECRET',
    jwtAccessLife: 'NUXT_JWT_ACCESS_LIFE',
    jwtRefreshSecret: 'NUXT_JWT_REFRESH_SECRET',
    jwtRefreshLife: 'NUXT_JWT_REFRESH_LIFE'
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
