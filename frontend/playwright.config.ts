import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30 * 1000,
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    storageState: undefined,
    contextOptions: {
      storageState: undefined,
    },
  },
  fullyParallel: false,
  workers: 1,
});
