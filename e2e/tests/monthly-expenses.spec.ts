import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "../helpers/auth";
import {
  createMonthlyBudgetInBD,
  deleteAllMonthlyBudgetsInDB,
  deleteAllMonthlyExpensesInDB,
} from "helpers/db-helpers";

test.describe("Monthly budget", () => {
  let currentBudget: Awaited<ReturnType<typeof createMonthlyBudgetInBD>>;

  test.beforeAll(async ({ user }) => {
    currentBudget = await createMonthlyBudgetInBD(user.id);
  });
  test.beforeEach(async () => {
    await deleteAllMonthlyExpensesInDB(currentBudget.id);
  });
  test.afterAll(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });

  test("should add new expenses and update remaining and weekly budget", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);

    const newExpenses = [
      { name: "expense 1", amount: "10" },
      { name: "expense 2", amount: "10" },
    ];
    const totalExpenses = newExpenses
      .map((c) => Number(c.amount))
      .reduce((acc, curr) => acc + curr, 0);

    for (let i = 0; i < newExpenses.length; i++) {
      await page.click('[data-testid="add-expense-input"]');
      await page.fill(
        `[data-testid="expense-name-input-${i}"]`,
        newExpenses[i].name
      );
      await page.fill(
        `[data-testid="expense-amount-input-${i}"]`,
        newExpenses[i].amount
      );
    }

    await page.click('[data-testid="submit-form-entry"]');

    for (let i = 0; i < newExpenses.length; i++) {
      await expect(
        page.locator('[data-testid="data-item"]', {
          hasText: newExpenses[i].name,
        })
      ).toBeVisible();
    }

    const totalData = page.locator('[data-testid="total-data"]');
    await expect(totalData).toContainText(
      String(currentBudget.weeklyBudget - totalExpenses)
    );
    const remainingBudget = page.locator('[data-testid="remaining-budget"]');
    await expect(remainingBudget).toContainText(
      String(currentBudget.remainingBudget - totalExpenses)
    );
  });

  test("should update expense and update remaining and weekly budget", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const expense = { name: "new expense", amount: "20" };
    const updatedExpense = { name: "updated expense", amount: "30" };

    await page.click('[data-testid="add-expense-input"]');
    await page.fill('[data-testid="expense-name-input-0"]', expense.name);
    await page.fill('[data-testid="expense-amount-input-0"]', expense.amount);
    await page.click('[data-testid="submit-form-entry"]');

    const expenseItem = page.locator('[data-testid="data-item"]');
    await expenseItem.locator('[data-testid="update-item-btn"]').click();
    await expect(
      page.locator('[data-testid="update-item-form"]')
    ).toBeVisible();

    await page.fill('[data-testid="update-name-input"]', updatedExpense.name);
    await page.fill(
      '[data-testid="update-amount-input"]',
      updatedExpense.amount
    );
    await page.click('[data-testid="update-btn"]');

    await expect(page.locator('[data-testid="data-item"]')).toContainText(
      updatedExpense.name
    );

    const totalData = page.locator('[data-testid="total-data"]');
    await expect(totalData).toContainText(
      String(currentBudget.weeklyBudget - Number(updatedExpense.amount))
    );
    const remainingBudget = page.locator('[data-testid="remaining-budget"]');
    await expect(remainingBudget).toContainText(
      String(currentBudget.remainingBudget - Number(updatedExpense.amount))
    );
  });

  test("should delete expense and update remaining and weekly budget", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const expense = { name: "new expense", amount: "20" };

    await page.click('[data-testid="add-expense-input"]');
    await page.fill('[data-testid="expense-name-input-0"]', expense.name);
    await page.fill('[data-testid="expense-amount-input-0"]', expense.amount);
    await page.click('[data-testid="submit-form-entry"]');

    const expenseItem = page.locator('[data-testid="data-item"]', {
      hasText: expense.name,
    });
    await expenseItem.locator('[data-testid="update-item-btn"]').click();
    await expect(
      page.locator('[data-testid="update-item-form"]')
    ).toBeVisible();

    await page.click('[data-testid="delete-btn"]');
    await page.click('[data-testid="confirm-delete-btn"]');

    await expect(expenseItem).not.toBeVisible();

    const totalData = page.locator('[data-testid="total-data"]');
    await expect(totalData).toContainText(String(currentBudget.weeklyBudget));
    const remainingBudget = page.locator('[data-testid="remaining-budget"]');
    await expect(remainingBudget).toContainText(
      String(currentBudget.remainingBudget)
    );
  });
});
