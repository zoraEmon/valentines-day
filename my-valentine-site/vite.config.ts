import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Keep chunk warning higher for dev builds; use manualChunks to split large deps
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // split vendor libs to reduce main bundle size
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          lottie: ['lottie-web', 'lottie-react']
        }
      }
    }
  }
})
