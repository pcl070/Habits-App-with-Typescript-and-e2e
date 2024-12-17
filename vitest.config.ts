import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue() as any], // Force compatibility for the plugin
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.ts'],
    exclude: [
      '**/node_modules/**',
      '**/e2e/**',
      '**/dist/**',
      '**/coverage/**',
    ],
    setupFiles: './src/tests/setupTests.ts',
  },
});
