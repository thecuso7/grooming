// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import viteCompression from "vite-plugin-compression";

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    compressPublicAssets: true,
    preset: 'node-server',
    routeRules: {
      '/_nuxt/**': {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cors: true
      },
      '/api/**': {
        cors: true,
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    }
  },
  compatibilityDate: '2024-11-01',
  devServer: {
    host: '0.0.0.0',
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
    jwtRefreshLife: process.env.NUXT_JWT_REFRESH_LIFE,
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    }
  },
  routeRules: {
    '/api/**': { cors: true },
    '/uploads/**': { static: true },
    '/pets': { ssr: true },
  },
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/font.css'
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
    '@nuxt/devtools',
    '@nuxt/test-utils/module'
  ],
  typescript: {
    typeCheck: true,
  },
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
