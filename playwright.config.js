// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  // ── Timeouts ────────────────────────────────────────────────
  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  // ── Parallelism & Retries ────────────────────────────────────
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,

  // ── Reporter ─────────────────────────────────────────────────
  reporter: 'html',

  // ── Shared Settings ──────────────────────────────────────────
  use: {
    baseURL: 'https://automationexercise.com/',

    actionTimeout:     15000,
    navigationTimeout: 30000,

    screenshot: 'only-on-failure',
    video:      'retain-on-failure',
    trace:      'on-first-retry',
  },

  // ── Projects ─────────────────────────────────────────────────
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});