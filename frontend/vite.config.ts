import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8000', // Proxy API requests to backend
      '/auth': 'http://localhost:8000', // Proxy auth requests as well
      '/menu': 'http://localhost:8000',
      '/orders': 'http://localhost:8000',
    }
  },
  build: {
    outDir: 'dist'
  }
})

