import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import { fillNewEntry, getProjectTotals } from "helpers/budget";
import {
  createSpecialBudgetWithCatAndExpenses,
  deleteAllSpecialBudgetsInDB,
} from "helpers/db-helpers";
import {
  accessProjectDetails,
  selectWhenStable,
} from "helpers/special-budgets";

test.describe("Project expenses", () => {
  let specialBudget: Awaited<
    ReturnType<typeof createSpecialBudgetWithCatAndExpenses>
  >;

  test.beforeEach(async ({ user }) => {
    await deleteAllSpecialBudgetsInDB(user.id);
    specialBudget = await createSpecialBudgetWithCatAndExpenses(user.id);
  });

  test.afterAll(async ({ user }) => {
    await deleteAllSpecialBudgetsInDB(user.id);
  });

  test(
    "should add a new expense without cat and update remaining budget",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await loginUser(page, user.email, user.password);
      await accessProjectDetails(page, specialBudget.name);

      const newExpense = { name: "expense 1", amount: "10" };

      const remainingContainer = page.getByTestId("remaining-budget");
      const expensesWithoutCatContainer = page.getByTestId("expenses-section");

      await expect(expensesWithoutCatContainer).toBeVisible();
      const {
        totalRemaining: previousRemaining,
        totalExpenses: previousExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      await fillNewEntry(
        expensesWithoutCatContainer,
        "special-expenses",
        newExpense,
      );
      await page.getByTestId("submit-form-entry").click();

      const expenseItem = expensesWithoutCatContainer
        .getByTestId("data-item")
        .filter({ hasText: newExpense.name });
      await expect(expenseItem).toBeVisible();

      const {
        totalRemaining: currentRemaining,
        totalExpenses: currentExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      expect(currentExpenses).toBe(
        previousExpenses + Number(newExpense.amount),
      );
      expect(currentRemaining).toBe(
        previousRemaining - Number(newExpense.amount),
      );
    },
  );

  test(
    "should add a new expense with cat and update remaining budget",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await loginUser(page, user.email, user.password);
      await accessProjectDetails(page, specialBudget.name);

      const newExpense = { name: "expense with cat 1", amount: "20" };

      const remainingContainer = page.getByTestId("remaining-budget");
      const catSection = page.getByTestId("special-cat-section").filter({
        hasText: specialBudget.categories.name,
      });
      await expect(catSection).toBeVisible();

      const {
        totalRemaining: previousRemaining,
        totalExpenses: previousExpenses,
      } = await getProjectTotals(remainingContainer, catSection);

      await fillNewEntry(catSection, "special-expenses", newExpense);
      await page.getByTestId("submit-form-entry").click();

      const expenseItem = catSection
        .getByTestId("data-item")
        .filter({ hasText: newExpense.name });
      await expect(expenseItem).toBeVisible();

      const {
        totalRemaining: currentRemaining,
        totalExpenses: currentExpenses,
      } = await getProjectTotals(remainingContainer, catSection);
      expect(currentExpenses).toBe(
        previousExpenses + Number(newExpense.amount),
      );
      expect(currentRemaining).toBe(
        previousRemaining - Number(newExpense.amount),
      );
    },
  );

  const creationCases = [
    { value: "", issue: "empty" },
    { value: "0", issue: "invalid" },
  ];

  for (const { value, issue } of creationCases) {
    test(`should failed adding a new expense with ${issue} amount`, async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);
      await accessProjectDetails(page, specialBudget.name);

      const newExpense = { name: "expense 1", amount: value };

      const remainingContainer = page.getByTestId("remaining-budget");
      const expensesWithoutCatContainer = page.getByTestId("expenses-section");
      await expect(expensesWithoutCatContainer).toBeVisible();

      const {
        totalRemaining: previousRemaining,
        totalExpenses: previousExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      await fillNewEntry(
        expensesWithoutCatContainer,
        "special-expenses",
        newExpense,
      );
      await page.getByTestId("submit-form-entry").click();

      await expect(
        expensesWithoutCatContainer.getByTestId("amount-input-error"),
      ).toBeVisible();
      const expenseItem = expensesWithoutCatContainer
        .getByTestId("data-item")
        .filter({ hasText: newExpense.name });
      await expect(expenseItem).not.toBeVisible();

      const {
        totalRemaining: currentRemaining,
        totalExpenses: currentExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      expect(currentExpenses).toBe(previousExpenses);
      expect(currentRemaining).toBe(previousRemaining);
    });

    test(`should failed updating a new expense with ${issue} amount`, async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);
      await accessProjectDetails(page, specialBudget.name);

      const expense = specialBudget.expenses;

      const expensesWithoutCatContainer = page.getByTestId("expenses-section");
      const expenseItem = expensesWithoutCatContainer
        .getByTestId("data-item")
        .filter({ hasText: expense.name });
      await expect(expenseItem).toBeVisible();

      await expenseItem.getByTestId("update-item-btn").click();
      await expect(page.getByTestId("update-item-form")).toBeVisible();

      await page.getByTestId("update-amount-input").fill(value);
      await page.getByTestId("update-btn").click();

      await expect(page.getByTestId("amount-input-error")).toBeVisible();
      await expect(page.getByTestId("update-item-form")).toBeVisible();
    });
  }

  test(
    "should update expense category and update subtotals",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await loginUser(page, user.email, user.password);
      await accessProjectDetails(page, specialBudget.name);

      const category = specialBudget.categories;
      const expense = specialBudget.expenses;

      const remainingContainer = page.getByTestId("remaining-budget");
      const expensesWithoutCatContainer = page.getByTestId("expenses-section");
      await expect(expensesWithoutCatContainer).toBeVisible();

      const expenseItem = expensesWithoutCatContainer
        .getByTestId("data-item")
        .filter({ hasText: expense.name });
      await expect(expenseItem).toBeVisible();

      const catSection = page.getByTestId("special-cat-section").filter({
        hasText: category.name,
      });
      await expect(catSection).toBeVisible();

      const {
        totalRemaining: previousRemaining,
        totalExpenses: previousExpenses,
        totalCatExpenses: previousCatExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
        catSection,
      );

      await expenseItem.getByTestId("update-item-btn").click();
      await expect(page.getByTestId("update-item-form")).toBeVisible();

      await selectWhenStable(page, "select#category", category.name);
      await page.getByTestId("update-btn").click();

      await expect(
        catSection.getByTestId("data-item").filter({
          hasText: expense.name,
        }),
      ).toBeVisible();

      const {
        totalRemaining: currentRemaining,
        totalExpenses: currentExpenses,
        totalCatExpenses: currentCatExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
        catSection,
      );
      expect(currentExpenses).toBe(previousExpenses - expense.amount);
      expect(currentCatExpenses).toBe(previousCatExpenses! + expense.amount);
      expect(currentRemaining).toBe(previousRemaining);
    },
  );

  test(
    "should update expense and update total and remaining budget",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await loginUser(page, user.email, user.password);
      await accessProjectDetails(page, specialBudget.name);

      const expense = specialBudget.expenses;
      const updatedExpense = { name: "Updated expense", amount: "40" };

      const remainingContainer = page.getByTestId("remaining-budget");
      const expensesWithoutCatContainer = page.getByTestId("expenses-section");

      const expenseItem = expensesWithoutCatContainer
        .getByTestId("data-item")
        .filter({ hasText: expense.name });
      await expect(expenseItem).toBeVisible();

      const {
        totalRemaining: previousRemaining,
        totalExpenses: previousExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      await expenseItem.getByTestId("update-item-btn").click();
      await expect(page.getByTestId("update-item-form")).toBeVisible();

      await page.getByTestId("update-name-input").fill(updatedExpense.name);
      await page.getByTestId("update-amount-input").fill(updatedExpense.amount);
      await page.getByTestId("update-btn").click();

      await expect(page.getByTestId("update-item-form")).not.toBeVisible();
      await expect(expenseItem).toBeVisible();
      await expect(
        expensesWithoutCatContainer.getByTestId("data-item").filter({
          hasText: updatedExpense.name,
        }),
      ).toBeVisible();

      const {
        totalRemaining: currentRemaining,
        totalExpenses: currentExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      const expenseDifference = Number(updatedExpense.amount) - expense.amount;
      expect(currentExpenses).toBe(previousExpenses + expenseDifference);
      expect(currentRemaining).toBe(previousRemaining - expenseDifference);
    },
  );

  test(
    "should delete expense and update total and remaining budget",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await loginUser(page, user.email, user.password);
      await accessProjectDetails(page, specialBudget.name);

      const expense = specialBudget.expenses;

      const remainingContainer = page.getByTestId("remaining-budget");
      const expensesWithoutCatContainer = page.getByTestId("expenses-section");

      const expenseItem = expensesWithoutCatContainer
        .getByTestId("data-item")
        .filter({ hasText: expense.name });
      await expect(expenseItem).toBeVisible();

      const {
        totalRemaining: previousRemaining,
        totalExpenses: previousExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      await expenseItem.getByTestId("update-item-btn").click();
      await expect(page.getByTestId("update-item-form")).toBeVisible();

      await page.getByTestId("delete-btn").click();
      await page.getByTestId("confirm-delete-btn").click();

      await expect(expenseItem).not.toBeVisible();

      const {
        totalRemaining: currentRemaining,
        totalExpenses: currentExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      expect(currentExpenses).toBe(previousExpenses - expense.amount);
      expect(currentRemaining).toBe(previousRemaining + expense.amount);
    },
  );

  test(
    "should cancel expense deletion before request",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await loginUser(page, user.email, user.password);
      await accessProjectDetails(page, specialBudget.name);

      const expense = specialBudget.expenses;

      const remainingContainer = page.getByTestId("remaining-budget");
      const expensesWithoutCatContainer = page.getByTestId("expenses-section");

      const expenseItem = expensesWithoutCatContainer
        .getByTestId("data-item")
        .filter({ hasText: expense.name });
      await expect(expenseItem).toBeVisible();

      const {
        totalRemaining: previousRemaining,
        totalExpenses: previousExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      await expenseItem.getByTestId("update-item-btn").click();
      await expect(page.getByTestId("update-item-form")).toBeVisible();

      await page.getByTestId("delete-btn").click();
      await page.getByTestId("cancel-delete-btn").click();
      await page.getByTestId("dialog-close").click();

      await expect(expenseItem).toBeVisible();

      const {
        totalRemaining: currentRemaining,
        totalExpenses: currentExpenses,
      } = await getProjectTotals(
        remainingContainer,
        expensesWithoutCatContainer,
      );

      expect(currentExpenses).toBe(previousExpenses);
      expect(currentRemaining).toBe(previousRemaining);
    },
  );
});
