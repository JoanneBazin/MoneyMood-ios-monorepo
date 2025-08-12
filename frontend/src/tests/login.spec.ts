import { test, expect } from "@playwright/test";
import { loginUser } from "./utils/auth";
import { TEST_CONFIG } from "./constants";

test.beforeEach(async ({ page }) => {
  await page.context().clearCookies();
});

test("should log in successfully", async ({ page }) => {
  await loginUser(page);

  await expect(
    page.locator(`text=${TEST_CONFIG.TEST_USER.name}`)
  ).toBeVisible();
});
