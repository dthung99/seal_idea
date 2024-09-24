import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [react()],
  server: {
    proxy: {
      '/backend/api': {
        target: 'http://localhost:8080/', // Your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
      },
      '/dev_api': {
        target: 'http://localhost:8080/', // Your backend server URL
        changeOrigin: true,
      },
    },
  },
})

