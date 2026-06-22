import { Page } from "@playwright/test";
import { expect } from "fixtures/user.fixture";

interface DataType {
  name: string;
  totalBudget: string;
}

export const selectWhenStable = async (
  page: Page,
  selector: string,
  label: string,
) => {
  const select = page.locator(selector);
  await select.waitFor({ state: "visible" });

  await page.selectOption(selector, { label });
};

export const fillProjectForm = async (
  page: Page,
  action: "edit" | "create",
  data: DataType,
) => {
  await expect(page.getByTestId("project-form")).toBeVisible();

  await page.fill('input[name="name"]', data.name);
  await page.fill('input[name="amount"]', data.totalBudget);
  await page.getByTestId(`${action}-project`).click();
};

export const fillCategoryForm = async (
  page: Page,
  action: "edit" | "create",
  data: { name: string },
) => {
  await expect(page.getByTestId("cat-form")).toBeVisible();

  await page.fill('input[name="name"]', data.name);
  await page.getByTestId(`${action}-cat`).click();
};
