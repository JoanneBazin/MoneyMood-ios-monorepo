import { test, expect } from "@playwright/test";
import { loginUser } from "./utils/auth";
import { getApiUrl, TEST_CONFIG } from "./constants";

const currentBudgetRoute = getApiUrl("/api/monthly-budgets/current");
const timeout = TEST_CONFIG.TIMEOUTS.DEFAULT;

test.beforeEach(async ({ page }) => {
  await page.context().clearCookies();
});

test("dashboard should display user's budget if existent", async ({ page }) => {
  await loginUser(page);

  await page.route(currentBudgetRoute, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "123456",
        month: 9,
        year: 2025,
        isCurrent: true,
        remainingBudget: 80,
        weeklyBudget: 20,
        numberOfWeeks: 4,
        incomes: [{ id: "1235", amount: 100, name: "income" }],
        charges: [{ id: "4581", amount: 20, name: "charge" }],
        expenses: [{ id: "12454", amount: 5, name: "expense", weekNumber: 1 }],
      }),
    })
  );

  await page.reload();

  await expect(page.locator(".total-budget")).toBeVisible({ timeout: timeout });

  await expect(page.locator(".data-card")).toBeVisible();

  const weeklyBudgetAmount = page.locator(".total-data__amount");
  await expect(weeklyBudgetAmount).toBeVisible();
  await expect(weeklyBudgetAmount).toContainText("15");
});

test("weekly budget updates when adding expense", async ({ page }) => {
  await loginUser(page);

  await page.route(currentBudgetRoute, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "123456",
        month: 9,
        year: 2025,
        isCurrent: true,
        remainingBudget: 80,
        weeklyBudget: 20,
        numberOfWeeks: 4,
        incomes: [{ id: "1235", amount: 100, name: "income" }],
        charges: [{ id: "4581", amount: 20, name: "charge" }],
        expenses: [],
      }),
    })
  );

  await page.route(
    getApiUrl("/api/monthly-budgets/123456/expenses"),
    (route) => {
      if (route.request().method() === "POST") {
        route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({
            expenses: [
              {
                id: "2546",
                name: "expense",
                amount: 10,
                weekNumber: 1,
              },
            ],
            remainingBudget: 70,
          }),
        });
      } else {
        route.continue();
      }
    }
  );

  await page.reload();

  await expect(page.locator(".total-data__amount")).toContainText("20");

  await page.click('[data-testid="add-expense-input"]');
  await page.fill('[data-testid="expense-name-input"]', "expense");
  await page.fill('[data-testid="expense-amount-input"]', "10");
  await page.click('[data-testid="submit-form-entry"]');

  await expect(page.locator(".total-data__amount")).toContainText("10");
});

test("dashboard should display action buttons if no current budget", async ({
  page,
}) => {
  await loginUser(page);

  await page.route(currentBudgetRoute, (route) =>
    route.fulfill({
      status: 404,
      contentType: "application/json",
      body: JSON.stringify({ error: "Pas de budget actif" }),
    })
  );

  await page.reload();

  await expect(
    page.locator('[data-testid="budget-actions-container"]')
  ).toBeVisible({
    timeout: timeout,
  });
});

test("dashboard updates when adding new current budget", async ({ page }) => {
  await loginUser(page);
  await page.goto("/app/create");

  await page.route(getApiUrl("/api/monthly-budgets"), (route) => {
    if (route.request().method() === "POST") {
      route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: "123456",
          month: 9,
          year: 2025,
          isCurrent: true,
          remainingBudget: 80,
          weeklyBudget: 16,
          numberOfWeeks: 5,
          incomes: [{ id: "1235", amount: 100, name: "income" }],
          charges: [{ id: "4581", amount: 20, name: "charge" }],
          expenses: [],
        }),
      });
    } else {
      route.continue();
    }
  });

  await page.click('[data-testid="add-income-input"]');
  await page.fill('[data-testid="income-name-input"]', "income");
  await page.fill('[data-testid="income-amount-input"]', "100");

  await page.click('[data-testid="add-charge-input"]');
  await page.fill('[data-testid="charge-name-input"]', "charge");
  await page.fill('[data-testid="charge-amount-input"]', "20");

  await page.click('[data-testid="submit-monthly-budget"]');

  await expect(page).toHaveURL("/app");

  await expect(page.locator(".total-budget")).toContainText("80.00");
  await expect(page.locator(".total-data__amount")).toContainText("€16");
});
