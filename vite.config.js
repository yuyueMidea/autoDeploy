import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // console.log('yy3 ', id);
          if(id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  base: process.env.NODE_ENV === 'production' 
    ? '/CICD2/'  // 替换为你的仓库名
    : '/',
})
