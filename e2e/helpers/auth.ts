import { Page } from "@playwright/test";

const USER_STORE_KEY = "user-storage";
interface User {
  id: string;
  name: string;
  email: string;
}

export const loginUser = async (
  page: Page,
  email: string,
  password: string
) => {
  await page.goto("/login");

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  await page.waitForURL("/app");
};

export const getStoredUser = async (page: Page): Promise<User | null> => {
  return await page.evaluate((storeKey) => {
    const storeData = localStorage.getItem(storeKey);
    if (!storeData) return null;

    try {
      const parsed = JSON.parse(storeData);
      return parsed.state?.user || null;
    } catch {
      return null;
    }
  }, USER_STORE_KEY);
};

export const logoutUser = async (page: Page) => {
  await page.evaluate(() => {
    localStorage.clear();
  });
};
