import { Locator, Page } from "@playwright/test";
import { expect } from "fixtures/user.fixture";
import { getCurrencyValue } from "./budget";

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

export const getTotalEntries = async (container: Locator) => {
  return getCurrencyValue(container.getByTestId("total-data-amount"));
};
