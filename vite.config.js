import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://192.168.1.46:8081',
        changeOrigin: true,
        secure: false,
      },
      '/parent': {
        target: 'http://192.168.1.46:8081',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
