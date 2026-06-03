import { expect, Page } from "@playwright/test";

export const accessProfileSettings = async (page: Page) => {
  await page.getByTestId("nav-menu").click();
  await page.getByTestId("profile-nav").click();
  await page.getByTestId("profile-settings-nav").click();

  await expect(page).toHaveURL("/profile/settings");
};

export const accessProfileBudget = async (page: Page) => {
  await page.getByTestId("nav-menu").click();
  await page.getByTestId("profile-nav").click();

  await expect(page).toHaveURL("/profile/budget");
};
