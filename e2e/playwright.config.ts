import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  timeout: 60000,
  expect: {
    timeout: 60000,
  },
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : 1,
  reporter: isCI ? [["html"], ["github"]] : [["html"], ["list"]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],

  webServer: [
    {
      command: "npm run test:e2e:server",
      cwd: "../backend",
      timeout: 120000,
      url: "http://localhost:4000/health",
      reuseExistingServer: !isCI,
      stdout: "pipe",
      stderr: "pipe",
    },
    {
      command: isCI
        ? "npm run build && npx vite preview --port 5173"
        : "npm run dev",
      cwd: "../frontend",
      url: "http://localhost:5173",
      timeout: 120000,
      reuseExistingServer: !isCI,
      stdout: "pipe",
      stderr: "pipe",
    },
  ],
});
