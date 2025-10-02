// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'node-server',
  },
  compatibilityDate: '2024-11-01',
  devServer: {
    host: '0.0.0.0',  // Доступ с хоста
  },
  build: {
    transpile: ['vuetify'],
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
    '/uploads/**': { static: true }
  },
  css: [
    '@/assets/css/tailwind.css'
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({
           autoImport: true,
          //  date: {
          //     adapter: DateFnsAdapter,
          //     locale: {
          //       ru: ruRu,
          //     },
          //   },
          }))
      })
    },
    '@pinia/nuxt',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
