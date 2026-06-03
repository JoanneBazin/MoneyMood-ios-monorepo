import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import { fillNewEntry, getCurrencyValue } from "helpers/budget";
import {
  createFixedEntryInDb,
  deleteAllFixedEntriesInDB,
  PrismaModelSheets,
  deleteAllMonthlyBudgetsInDB,
} from "helpers/db-helpers";
import { accessProfileBudget } from "helpers/profile";

interface ResourcesConfig {
  label: string;
  entryType: "incomes" | "charges";
  name: string;
  table: PrismaModelSheets;
}

test.describe("Fixed incomes and charges", () => {
  test.beforeEach(async ({ user }) => {
    await deleteAllFixedEntriesInDB(user.id);
  });
  test.afterAll(async ({ user }) => {
    await deleteAllFixedEntriesInDB(user.id);
  });

  const resources: ResourcesConfig[] = [
    {
      label: "Fixed charges",
      entryType: "charges",
      name: "charges",
      table: "fixedCharge",
    },
    {
      label: "Fixed incomes",
      entryType: "incomes",
      name: "revenus",
      table: "fixedIncome",
    },
  ];

  for (const { label, entryType, name, table } of resources) {
    test.describe(`${label} managment`, () => {
      test(
        `should add fixed ${entryType} and update monthly budget creation fields`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          await loginUser(page, user.email, user.password);
          await accessProfileBudget(page);
          const newEntry = { name: "entry 1", amount: "100" };

          const entriesContainer = page.getByTestId("budget-data").filter({
            has: page
              .getByTestId("budget-data-title")
              .getByText(name, { exact: false }),
          });
          const previousTotal = await getCurrencyValue(
            entriesContainer.getByTestId("total-data-amount"),
          );

          await fillNewEntry(page, entryType, newEntry);
          await page.getByTestId(`add-${entryType}-btn`).click();

          const entryItem = page.getByTestId("data-item").filter({
            hasText: newEntry.name,
          });
          await expect(entryItem).toBeVisible();
          await expect(entryItem).toContainText(newEntry.name);
          const updatedTotal = await getCurrencyValue(
            entriesContainer.getByTestId("total-data-amount"),
          );
          expect(updatedTotal).toBe(previousTotal + Number(newEntry.amount));

          await page.goto("/app");
          await page.getByTestId("create-nav").click();
          await expect(
            page.getByTestId(`${entryType}-name-input-0`),
          ).toHaveValue(newEntry.name);
          await expect(
            page.getByTestId(`${entryType}-amount-input-0`),
          ).toHaveValue(newEntry.amount);
        },
      );

      test(
        `should update fixed ${entryType} and update monthly budget creation fields`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          const existantEntry = await createFixedEntryInDb(user.id, table);
          await loginUser(page, user.email, user.password);
          await accessProfileBudget(page);
          const updatedAmount = "500";

          const entriesContainer = page.getByTestId("budget-data").filter({
            has: page
              .getByTestId("budget-data-title")
              .getByText(name, { exact: false }),
          });
          const previousTotal = await getCurrencyValue(
            entriesContainer.getByTestId("total-data-amount"),
          );

          const entryItem = page.getByTestId("data-item").filter({
            hasText: existantEntry.name,
          });
          await entryItem.getByTestId("update-item-btn").click();
          await expect(page.getByTestId("update-item-form")).toBeVisible();

          await page.getByTestId("update-amount-input").fill(updatedAmount);
          await page.getByTestId("update-btn").click();

          await expect(entryItem).toContainText(updatedAmount);

          const updatedTotal = await getCurrencyValue(
            entriesContainer.getByTestId("total-data-amount"),
          );
          const entryDifference =
            Number(updatedAmount) - Number(existantEntry.amount);
          expect(updatedTotal).toBe(previousTotal + entryDifference);

          await page.goto("/app");
          await page.getByTestId("create-nav").click();
          await expect(
            page.getByTestId(`${entryType}-name-input-0`),
          ).toHaveValue(existantEntry.name);
          await expect(
            page.getByTestId(`${entryType}-amount-input-0`),
          ).toHaveValue(updatedAmount);
        },
      );

      test(
        `should update fixed ${entryType} without impacting existant budgets`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          const existantEntry = await createFixedEntryInDb(user.id, table);
          await loginUser(page, user.email, user.password);
          const updatedAmount = "500";

          await page.getByTestId("create-nav").click();
          await expect(
            page.getByTestId(`${entryType}-name-input-0`),
          ).toHaveValue(existantEntry.name);
          await expect(
            page.getByTestId(`${entryType}-amount-input-0`),
          ).toHaveValue(String(existantEntry.amount));
          await page.getByTestId("submit-monthly-budget").click();

          await expect(page).toHaveURL("app");
          await page.getByTestId(`total-card-${name}`).click();
          const monthlyEntryItem = page.getByTestId("data-item").filter({
            hasText: existantEntry.name,
          });
          await expect(monthlyEntryItem).toContainText(
            String(existantEntry.amount),
          );

          await accessProfileBudget(page);

          const entryItem = page.getByTestId("data-item").filter({
            hasText: existantEntry.name,
          });
          await entryItem.getByTestId("update-item-btn").click();
          await expect(page.getByTestId("update-item-form")).toBeVisible();

          await page.getByTestId("update-amount-input").fill(updatedAmount);
          await page.getByTestId("update-btn").click();
          await expect(entryItem).toContainText(updatedAmount);

          await page.goto("/app");
          await page.getByTestId(`total-card-${name}`).click();
          await expect(monthlyEntryItem).toContainText(
            String(existantEntry.amount),
          );

          await deleteAllMonthlyBudgetsInDB(user.id);
        },
      );

      test(
        `should delete fixed ${entryType} and update monthly budget creation fields`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          const existantEntry = await createFixedEntryInDb(user.id, table);
          await loginUser(page, user.email, user.password);
          await accessProfileBudget(page);

          const entriesContainer = page.getByTestId("budget-data").filter({
            has: page
              .getByTestId("budget-data-title")
              .getByText(name, { exact: false }),
          });

          const entryItem = page.getByTestId("data-item").filter({
            hasText: existantEntry.name,
          });
          await entryItem.getByTestId("update-item-btn").click();
          await expect(page.getByTestId("update-item-form")).toBeVisible();

          await page.getByTestId("delete-btn").click();
          await page.getByTestId("confirm-delete-btn").click();

          await expect(entryItem).not.toBeVisible();
          await expect(page.getByTestId("data-item")).toHaveCount(0);

          const updatedTotal = await getCurrencyValue(
            entriesContainer.getByTestId("total-data-amount"),
          );
          expect(updatedTotal).toBe(0);

          await page.goto("/app");
          await page.getByTestId("create-nav").click();
          await expect(
            page.getByTestId(`${entryType}-name-input-0`),
          ).not.toBeVisible();
          await expect(
            page.getByTestId(`${entryType}-amount-input-0`),
          ).not.toBeVisible();
        },
      );

      test(`should cancel fixed ${entryType} deletion before request`, async ({
        page,
        user,
      }) => {
        const existantEntry = await createFixedEntryInDb(user.id, table);
        await loginUser(page, user.email, user.password);
        await accessProfileBudget(page);

        const entriesContainer = page.getByTestId("budget-data").filter({
          has: page
            .getByTestId("budget-data-title")
            .getByText(name, { exact: false }),
        });
        const previousTotal = await getCurrencyValue(
          entriesContainer.getByTestId("total-data-amount"),
        );

        const entryItem = page.getByTestId("data-item").filter({
          hasText: existantEntry.name,
        });
        await entryItem.getByTestId("update-item-btn").click();
        await expect(page.getByTestId("update-item-form")).toBeVisible();

        await page.getByTestId("delete-btn").click();
        await page.getByTestId("cancel-delete-btn").click();
        await page.getByTestId("dialog-close").click();

        await expect(page.getByTestId("update-item-form")).not.toBeVisible();
        await expect(entryItem).toBeVisible();

        const updatedTotal = await getCurrencyValue(
          entriesContainer.getByTestId("total-data-amount"),
        );
        expect(updatedTotal).toBe(previousTotal);
      });
    });
  }
});
