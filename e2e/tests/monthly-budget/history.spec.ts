import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import { displayedDate, getCurrencyValue } from "helpers/budget";
import {
  createArchivedBudget,
  createMonthlyBudgetInDB,
  deleteAllMonthlyBudgetsInDB,
} from "helpers/db-helpers";

test.describe("Budget history", () => {
  test.beforeEach(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });
  test.afterAll(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });

  test(
    "should display previous monthly budget details",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await createMonthlyBudgetInDB(user.id, 4, 2025, false);
      const youngestBudget = await createMonthlyBudgetInDB(
        user.id,
        6,
        2025,
        false,
      );
      const budgetDate = displayedDate(
        youngestBudget.year,
        youngestBudget.month,
      );
      await loginUser(page, user.email, user.password);

      await page.getByTestId("history-nav").click();
      const firstBudgetCard = page.getByTestId("history-card").first();

      await expect(firstBudgetCard).toContainText(new RegExp(budgetDate, "i"));
      const remainingBudget = await getCurrencyValue(
        firstBudgetCard.getByTestId("history-card-remaining-budget"),
      );
      expect(remainingBudget).toBe(youngestBudget.remainingBudget);

      await firstBudgetCard.getByTestId("history-details-btn").click();

      const remaining = page.getByTestId("remaining-budget");
      await expect(remaining).toContainText(new RegExp(budgetDate, "i"));

      const entriesCollapses = page.getByTestId("entries-collapse");
      await expect(entriesCollapses).toHaveCount(2);
      await expect(page.getByTestId("budget-data")).toBeVisible();
    },
  );
  test(
    "should display only the 6 most recent budgets and filter by date",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      const { year, months } = await createArchivedBudget(user.id);
      const visiblesMonths = months.slice(0, 6);
      const oldestMonth = months[6];

      await loginUser(page, user.email, user.password);
      await page.getByTestId("history-nav").click();

      for (const month of visiblesMonths) {
        const budgetDate = displayedDate(year, month);
        await expect(
          page.getByTestId("history-card").filter({
            hasText: new RegExp(budgetDate, "i"),
          }),
        ).toBeVisible();
      }

      const hiddenBudgetDate = displayedDate(year, oldestMonth);
      await expect(
        page.getByTestId("history-card").filter({
          hasText: new RegExp(hiddenBudgetDate, "i"),
        }),
      ).not.toBeVisible();

      const dateInput = page.locator("#date-picker");
      await dateInput.click();
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Backspace");
      await dateInput.pressSequentially(hiddenBudgetDate);

      const firstBudgetCard = page.getByTestId("history-card").first();
      await expect(firstBudgetCard).toContainText(
        new RegExp(hiddenBudgetDate, "i"),
      );
    },
  );

  test("should restore previous monthly budget as current", async ({
    page,
    user,
  }) => {
    const oldBudget = await createMonthlyBudgetInDB(user.id, 6, 2025, false);
    const currentBudget = await createMonthlyBudgetInDB(user.id);
    await loginUser(page, user.email, user.password);

    const oldBudgetDate = displayedDate(oldBudget.year, oldBudget.month);
    const currentBudgetDate = displayedDate(
      currentBudget.year,
      currentBudget.month,
    );
    const dashboardBanner = page.getByTestId("app-banner");

    await expect(dashboardBanner).toContainText(
      new RegExp(currentBudgetDate, "i"),
    );

    await page.click('[data-testid="history-nav"]');
    const oldBudgetCard = page.locator('[data-testid="history-card"]', {
      hasText: new RegExp(oldBudgetDate, "i"),
    });
    await oldBudgetCard.locator('[data-testid="history-details-btn"]').click();

    await page.click('[data-testid="budget-options-menu"]');
    await page.click('[data-testid="update-budget-status"]');

    await expect(page).toHaveURL("/app");
    await expect(dashboardBanner).toContainText(new RegExp(oldBudgetDate, "i"));

    await page.click('[data-testid="history-nav"]');
    await expect(
      page.locator('[data-testid="history-card"]', {
        hasText: new RegExp(currentBudgetDate, "i"),
      }),
    ).toBeVisible();
  });
});
