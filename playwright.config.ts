import type { PlaywrightTestConfig } from '@playwright/test';
import { devices, defineConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e', // Only check tests in the 'e2e' directory
  testMatch: '**/*.spec.ts', // Explicitly include only Playwright tests

  /* Maximum time one test can run for. */
  timeout: process.env.CI ? 10_000 : 10_000,
  expect: {
    timeout: process.env.CI ? 5_000 : 4_000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    headless: !!process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: process.env.CI ? 'npx vite preview --port 5173' : 'npx vite dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
};

// Explicitly exclude all non-e2e tests
export default defineConfig({
  ...config,
  testIgnore: ['**/components/**', '**/unit/**', '**/tests/**'], // Exclude unit test directories
});
