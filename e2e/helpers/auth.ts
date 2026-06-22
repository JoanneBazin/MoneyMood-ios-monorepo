import { Page } from "@playwright/test";

export const loginUser = async (
  page: Page,
  email: string,
  password: string,
) => {
  await page.goto("/login");

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  await page.waitForURL("/app");
};

export const logoutUser = async (page: Page) => {
  await page.evaluate(() => {
    localStorage.clear();
  });
};
