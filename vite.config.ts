import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // In production nginx proxies /api to the Nest container. Mirroring that
    // here keeps the dev server same-origin too, so no CORS config is needed.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Assets under this size are inlined as data URIs. The skill/company logos
    // are tiny SVGs, so inlining them removes a request per logo.
    assetsInlineLimit: 4096,
  },
})
