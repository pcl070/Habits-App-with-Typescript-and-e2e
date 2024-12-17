import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'; // Import from Vite, not Vitest
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
