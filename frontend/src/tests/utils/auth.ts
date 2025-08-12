import { expect, Page } from "@playwright/test";
import { TEST_CONFIG } from "../constants";

export const loginUser = async (page: Page) => {
  await page.goto("/login");

  await page.fill('input[name="email"]', TEST_CONFIG.TEST_USER.email);
  await page.fill('input[name="password"]', TEST_CONFIG.TEST_USER.password);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("/app");
};
