import { Page } from "@playwright/test";
import { expect } from "fixtures/user.fixture";

export const accessProjectDetails = async (page: Page, budgetName: string) => {
  await page.getByTestId("projects-nav").click();
  const budgetCard = page.getByTestId("special-budget-card").filter({
    hasText: budgetName,
  });
  await expect(budgetCard).toBeVisible();
  await budgetCard.click();

  await expect(page).toHaveURL(/\/app\/projects\/.+/);
};

export const selectWhenStable = async (
  page: Page,
  selector: string,
  label: string,
) => {
  const select = page.locator(selector);
  await select.waitFor({ state: "visible" });

  await page.selectOption(selector, { label });
};
