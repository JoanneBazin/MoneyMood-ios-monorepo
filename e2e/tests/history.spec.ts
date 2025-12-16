import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import { displayedDate } from "helpers/budget";
import {
  createMonthlyBudgetInBD,
  deleteAllMonthlyBudgetsInDB,
} from "helpers/db-helpers";

test.describe("Budget history", () => {
  test.beforeEach(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });
  test.afterAll(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });

  test("should display previous monthly budget details", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const oldBudget = await createMonthlyBudgetInBD(user.id, 6, 2025, false);
    const budgetDate = displayedDate(oldBudget.year, oldBudget.month);

    await page.click('[data-testid="history-nav"]');
    const oldBudgetCard = page.locator('[data-testid="history-card"]', {
      hasText: new RegExp(budgetDate, "i"),
    });
    await oldBudgetCard.locator('[data-testid="history-details-btn"]').click();

    const remaining = page.locator('[data-testid="remaining-budget"]');
    await expect(remaining).toContainText(new RegExp(budgetDate, "i"));
    await expect(remaining).toContainText(String(oldBudget.remainingBudget));

    const entriesCollapses = page.locator('[data-testid="entries-collapse"]');
    await expect(entriesCollapses).toHaveCount(2);
  });

  test("should archive previous monthly budget when creating new one", async ({
    page,
    user,
  }) => {
    const currentBudget = await createMonthlyBudgetInBD(user.id);
    await loginUser(page, user.email, user.password);

    await page.click('[data-testid="create-nav"]');
    await page.click('[data-testid="submit-monthly-budget"]');

    await page.goto("/app/history");

    const budgetDate = displayedDate(currentBudget.year, currentBudget.month);

    await expect(
      page.locator('[data-testid="history-card"]', {
        hasText: new RegExp(budgetDate, "i"),
      })
    ).toBeVisible();
  });

  test("should restore previous monthly budget as current", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const oldBudget = await createMonthlyBudgetInBD(user.id, 6, 2025, false);
    const budgetDate = displayedDate(oldBudget.year, oldBudget.month);

    await page.click('[data-testid="history-nav"]');
    const oldBudgetCard = page.locator('[data-testid="history-card"]', {
      hasText: new RegExp(budgetDate, "i"),
    });
    await oldBudgetCard.locator('[data-testid="history-details-btn"]').click();

    await page.click('[data-testid="budget-options-menu"]');
    await page.click('[data-testid="update-budget-status"]');

    await expect(page).toHaveURL("/app");
    await expect(
      page.locator('[data-testid="remaining-budget"]')
    ).toContainText(String(oldBudget.remainingBudget));
    await expect(page.locator('[data-testid="app-banner"]')).toContainText(
      new RegExp(budgetDate, "i")
    );
  });
});
