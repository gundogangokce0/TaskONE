import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@composables': path.resolve(__dirname, './src/@composables'),
      '@core': path.resolve(__dirname, './src/@core'),
      '@layouts': path.resolve(__dirname, './src/@layouts'),
      '@modules': path.resolve(__dirname, './src/modules')
    }
  },
  server: {
    port: 5500
  }
})
