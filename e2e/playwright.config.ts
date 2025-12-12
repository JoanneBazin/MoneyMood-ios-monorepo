import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  expect: {
    timeout: 60000,
  },
  retries: isCI ? 2 : 0,
  workers: 1,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:5173",
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  webServer: [
    {
      command: "npm run test:e2e:server",
      cwd: "../backend",
      timeout: 30000,
      url: "http://localhost:4000/health",
      reuseExistingServer: !isCI,
      ignoreHTTPSErrors: true,
      stdout: "pipe",
      stderr: "pipe",
    },
    {
      command: isCI
        ? "npm run build && npx vite preview --port 5173"
        : "npm run dev",
      cwd: "../frontend",
      url: "http://localhost:5173",
      timeout: 30000,
      reuseExistingServer: !isCI,
      stdout: "pipe",
      stderr: "pipe",
    },
  ],

  globalSetup: "./global-setup.ts",
  // globalTimeout: 120000,
  // globalTeardown: path.resolve(__dirname, "./tests/e2e/global-teardown"),
});
