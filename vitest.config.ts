import path from 'path';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // любая необходимая пользовательская конфигурация Vitest
  plugins: [
    vue() // ← ВАЖНО: добавьте плагин в конфиг
  ],
  test: {
    globals: true,
    setupFiles: './vitest.setup.ts',
    projects: [
      {
        plugins: [vue()],
        test: {
          name: 'unit',
          include: ['test/{e2e,unit}/*.{test,spec}.ts'],
          environment: 'happy-dom',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/*.{test,spec}.ts'],
          environment: 'nuxt',
        },
      }),
    ],
  },
  resolve: {
    alias: {
      // Настраиваем те же алиасы что и в nuxt.config.ts
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, './'),
      '~~': resolve(__dirname, './'),
      '@@': resolve(__dirname, './'),
      'assets': resolve(__dirname, './assets'),
      'public': resolve(__dirname, './public')
    }
  }
})