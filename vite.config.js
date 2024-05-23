import { fileURLToPath, URL } from 'node:url'
import ViteYaml from '@modyfi/vite-plugin-yaml'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/_variables.css";`
      }
    }
  },
  plugins: [
    ViteYaml(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@epicenter': fileURLToPath(new URL('./node_modules/@ericpitcock/epicenter-vue-components/src', import.meta.url))
    }
  }
})
