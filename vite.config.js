import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: [], // Remove axios from external
    }
  },
  optimizeDeps: {
    include: ['axios'] // Add this
  }
})