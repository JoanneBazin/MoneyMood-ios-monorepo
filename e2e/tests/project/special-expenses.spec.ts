import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import {
  cleanSpecialBudgetDataInDb,
  createSpecialBudgetInDB,
  createSpecialCategoryInDB,
  createSpecialExpenseInDB,
  deleteAllSpecialBudgetsInDB,
} from "helpers/db-helpers";
import {
  accessProjectDetails,
  selectWhenStable,
} from "helpers/special-budgets";

test.describe("Special budgets", () => {
  let specialBudget: Awaited<ReturnType<typeof createSpecialBudgetInDB>>;

  test.beforeAll(async ({ user }) => {
    specialBudget = await createSpecialBudgetInDB(user.id);
  });

  test.beforeEach(async () => {
    await cleanSpecialBudgetDataInDb(specialBudget.id);
  });
  test.afterAll(async ({ user }) => {
    await deleteAllSpecialBudgetsInDB(user.id);
  });

  test("should add a new expense without cat and update remaining budget", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);

    const newExpense = { name: "expense 1", amount: "10" };

    await accessProjectDetails(page, specialBudget.name);

    await page
      .locator('[data-testid="add-special-expense-input"]')
      .first()
      .click();
    await page.fill(
      '[data-testid="special-expense-name-input-0"]',
      newExpense.name
    );
    await page.fill(
      '[data-testid="special-expense-amount-input-0"]',
      newExpense.amount
    );
    await page.click('[data-testid="submit-form-entry"]');

    await expect(page.locator('[data-testid="data-item"]')).toContainText(
      newExpense.name
    );
    const remaining = specialBudget.remainingBudget - Number(newExpense.amount);
    await expect(
      page.locator('[data-testid="remaining-budget"]')
    ).toContainText(String(remaining));
  });

  test("should add a new expense with cat and update remaining budget", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const cat = await createSpecialCategoryInDB(specialBudget.id);
    const newExpense = { name: "expense with cat", amount: "20" };

    await accessProjectDetails(page, specialBudget.name);

    const catSection = page.locator('[data-testid="special-cat-section"]', {
      hasText: cat.name,
    });

    await catSection
      .locator('[data-testid="add-special-expense-input"]')
      .click();
    await page.fill(
      '[data-testid="special-expense-name-input-0"]',
      newExpense.name
    );
    await page.fill(
      '[data-testid="special-expense-amount-input-0"]',
      newExpense.amount
    );
    await page.click('[data-testid="submit-form-entry"]');

    await expect(catSection.locator('[data-testid="data-item"]')).toContainText(
      newExpense.name
    );
    const remaining = specialBudget.remainingBudget - Number(newExpense.amount);
    await expect(
      page.locator('[data-testid="remaining-budget"]')
    ).toContainText(String(remaining));
  });

  test("should update expense category and update subtotals", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const cat = await createSpecialCategoryInDB(specialBudget.id);
    const expense = await createSpecialExpenseInDB(specialBudget.id);
    if (!expense) return;

    await accessProjectDetails(page, specialBudget.name);

    await expect(
      page.locator('[data-testid="total-data"]').first()
    ).toContainText(String(expense.amount));
    const expenseItem = page.locator('[data-testid="data-item"]', {
      hasText: expense.name,
    });
    await expenseItem.locator('[data-testid="update-item-btn"]').click();

    await expect(
      page.locator('[data-testid="update-item-form"]')
    ).toBeVisible();

    await selectWhenStable(page, "select#category", cat.name);
    await page.click('[data-testid="update-btn"]');

    const catSection = page.locator('[data-testid="special-cat-section"]', {
      hasText: cat.name,
    });

    await expect(catSection.locator('[data-testid="data-item"]')).toContainText(
      expense.name
    );
    await expect(
      catSection.locator('[data-testid="total-data"]')
    ).toContainText(String(expense.amount));

    await expect(
      page.locator('[data-testid="total-data"]').first()
    ).toContainText("0.00");
  });

  test("should delete special category and all expenses on cascade", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const cat = await createSpecialCategoryInDB(specialBudget.id);

    const expenseInCat = await createSpecialExpenseInDB(
      specialBudget.id,
      cat.id
    );
    if (!expenseInCat) return;

    await accessProjectDetails(page, specialBudget.name);

    const catSection = page.locator('[data-testid="special-cat-section"]', {
      hasText: cat.name,
    });
    await catSection.locator('[data-testid="update-cat-btn"]').click();

    await expect(page.locator('[data-testid="cat-form"]')).toBeVisible();
    await page.click('[data-testid="delete-cat-btn"]');
    await page.click('[data-testid="delete-cat-cascade"]');

    await expect(catSection).not.toBeVisible();
    await expect(
      page.locator('[data-testid="data-item"]', { hasText: expenseInCat.name })
    ).not.toBeVisible();

    await expect(
      page.locator('[data-testid="remaining-budget"]')
    ).toContainText(String(specialBudget.totalBudget));
  });

  test("should delete special category and update cat expenses", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const cat = await createSpecialCategoryInDB(specialBudget.id);

    const expenseInCat = await createSpecialExpenseInDB(
      specialBudget.id,
      cat.id
    );
    if (!expenseInCat) return;

    await accessProjectDetails(page, specialBudget.name);

    const catSection = page.locator('[data-testid="special-cat-section"]', {
      hasText: cat.name,
    });
    await catSection.locator('[data-testid="update-cat-btn"]').click();

    await expect(page.locator('[data-testid="cat-form"]')).toBeVisible();
    await page.click('[data-testid="delete-cat-btn"]');
    await page.click('[data-testid="delete-cat-only"]');

    await expect(catSection).not.toBeVisible();
    await expect(
      page.locator('[data-testid="data-item"]', { hasText: expenseInCat.name })
    ).toBeVisible();
  });
});
