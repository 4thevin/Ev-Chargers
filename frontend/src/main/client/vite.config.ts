import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ include: "**/*.tsx"})],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',
    },
    hmr: {
      overlay: true, // shows error overlay in browser
    },
  }
})

