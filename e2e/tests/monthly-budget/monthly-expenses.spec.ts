import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "../../helpers/auth";
import {
  createMonthlyBudgetInDB,
  createMonthlyExpenseInDB,
  deleteAllMonthlyBudgetsInDB,
  deleteAllMonthlyExpensesInDB,
} from "helpers/db-helpers";
import { fillNewEntry, getCurrencyValue } from "helpers/budget";

test.describe("Monthly expenses", () => {
  let currentBudget: Awaited<ReturnType<typeof createMonthlyBudgetInDB>>;

  test.beforeAll(async ({ user }) => {
    currentBudget = await createMonthlyBudgetInDB(user.id);
  });
  test.beforeEach(async () => {
    await deleteAllMonthlyExpensesInDB(currentBudget.id);
  });
  test.afterAll(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });

  test(
    "should add new expenses and update remaining and weekly budget",
    { tag: ["@smoke, @regression"] },
    async ({ page, user }) => {
      await loginUser(page, user.email, user.password);

      const newExpenses = [
        { name: "expense 1", amount: "10" },
        { name: "expense 2", amount: "10" },
      ];
      const totalExpenses = newExpenses
        .map((c) => Number(c.amount))
        .reduce((acc, curr) => acc + curr, 0);

      for (let i = 0; i < newExpenses.length; i++) {
        await fillNewEntry(page, "expenses", newExpenses[i], i);
      }
      await page.getByTestId("add-expenses-btn").click();

      for (let i = 0; i < newExpenses.length; i++) {
        await expect(
          page.getByTestId("data-item").filter({
            hasText: newExpenses[i].name,
          }),
        ).toBeVisible();
      }

      const weeklyBudget = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );
      expect(weeklyBudget).toBe(currentBudget.weeklyBudget - totalExpenses);

      const remainingBudget = await getCurrencyValue(
        page.getByTestId("total-budget-amount"),
      );
      expect(remainingBudget).toBe(
        currentBudget.remainingBudget - totalExpenses,
      );
    },
  );

  test(
    "should update expenses list after API confirmation",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      let receiveResponse = (value?: unknown) => {};
      const blockPromise = new Promise((resolve) => {
        receiveResponse = resolve;
      });

      await page.route(
        `${process.env.API_URL}/api/monthly-budgets/${currentBudget.id}/expenses`,
        async (route) => {
          await blockPromise;
          await route.continue();
        },
      );

      await loginUser(page, user.email, user.password);

      const newExpense = { name: "expense 1", amount: "10" };

      await fillNewEntry(page, "expenses", newExpense);
      await page.getByTestId("add-expenses-btn").click();

      const temporaryWeeklyTotal = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );
      expect(temporaryWeeklyTotal).toBe(currentBudget.weeklyBudget);
      const entryItem = page.getByTestId("data-item").filter({
        hasText: newExpense.name,
      });
      await expect(entryItem).not.toBeVisible();

      receiveResponse();

      await expect(entryItem).toBeVisible();
      const updatedWeeklyTotal = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );
      expect(updatedWeeklyTotal).toBe(
        currentBudget.weeklyBudget - Number(newExpense.amount),
      );
    },
  );

  test(
    "should add new expense and update only current weekly budget",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await loginUser(page, user.email, user.password);

      const currentWeeklyTotal = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );

      await page.getByTestId("week-nav-right").click();
      const nextWeeklyTotal = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );
      await page.getByTestId("week-nav-left").click();

      const newExpense = { name: "expense 1", amount: "10" };

      await fillNewEntry(page, "expenses", newExpense);
      await page.getByTestId("add-expenses-btn").click();

      await expect(
        page.getByTestId("data-item").filter({
          hasText: newExpense.name,
        }),
      ).toBeVisible();

      const updatedCurrentWeeklyTotal = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );
      expect(updatedCurrentWeeklyTotal).toBe(
        currentWeeklyTotal - Number(newExpense.amount),
      );

      await page.getByTestId("week-nav-right").click();
      const updatedNextWeeklyTotal = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );
      expect(updatedNextWeeklyTotal).toBe(nextWeeklyTotal);
    },
  );

  //Problème synchro cache / database
  test(
    "should update expense and update remaining and weekly budget",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      // await loginUser(page, user.email, user.password);
      const existantExpense = await createMonthlyExpenseInDB(
        currentBudget.id,
        1,
      );
      await loginUser(page, user.email, user.password);
      const updatedExpense = { name: "Updated expense", amount: "100" };

      const expenseItem = page.getByTestId("data-item").filter({
        hasText: existantExpense.name,
      });

      const previousRemaining = await getCurrencyValue(
        page.getByTestId("total-budget-amount"),
      );
      const previousWeekly = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );

      await expenseItem.getByTestId("update-item-btn").click();
      await expect(page.getByTestId("update-item-form")).toBeVisible();

      await page.getByTestId("update-name-input").fill(updatedExpense.name);
      await page.getByTestId("update-amount-input").fill(updatedExpense.amount);
      await page.getByTestId("update-btn").click();

      await expect(expenseItem).toContainText(updatedExpense.name);

      const updatedRemaining = await getCurrencyValue(
        page.getByTestId("total-budget-amount"),
      );
      const updatedWeekly = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );

      const expenseDifference =
        Number(updatedExpense.amount) - existantExpense.amount;
      expect(updatedWeekly).toBe(previousWeekly - expenseDifference);

      expect(updatedRemaining).toBe(previousRemaining - expenseDifference);
    },
  );

  //Problème synchro cache / database
  test(
    "should delete expense and update remaining and weekly budget",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      // await loginUser(page, user.email, user.password);
      const existantExpense = await createMonthlyExpenseInDB(
        currentBudget.id,
        1,
      );
      await loginUser(page, user.email, user.password);

      const expenseItem = page.getByTestId("data-item").filter({
        hasText: existantExpense.name,
      });

      const previousRemaining = await getCurrencyValue(
        page.getByTestId("total-budget-amount"),
      );
      const previousWeekly = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );

      await expenseItem.getByTestId("update-item-btn").click();
      await expect(page.getByTestId("update-item-form")).toBeVisible();

      await page.getByTestId("delete-btn").click();
      await page.getByTestId("confirm-delete-btn").click();

      await expect(expenseItem).not.toBeVisible();

      const updatedRemaining = await getCurrencyValue(
        page.getByTestId("total-budget-amount"),
      );
      const updatedWeekly = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );

      expect(updatedWeekly).toBe(previousWeekly - existantExpense.amount);

      expect(updatedRemaining).toBe(previousRemaining - existantExpense.amount);
    },
  );

  test("should cancel expense deletion before request", async ({
    page,
    user,
  }) => {
    await loginUser(page, user.email, user.password);
    const existantExpense = await createMonthlyExpenseInDB(currentBudget.id, 1);

    const expenseItem = page.getByTestId("data-item").filter({
      hasText: existantExpense.name,
    });

    const previousRemaining = await getCurrencyValue(
      page.getByTestId("total-budget-amount"),
    );
    const previousWeekly = await getCurrencyValue(
      page.getByTestId("total-data-amount"),
    );

    await expenseItem.getByTestId("update-item-btn").click();
    await expect(page.getByTestId("update-item-form")).toBeVisible();

    await page.getByTestId("delete-btn").click();
    await page.getByTestId("cancel-delete-btn").click();
    await page.getByTestId("dialog-close").click();

    await expect(expenseItem).toBeVisible();

    const updatedRemaining = await getCurrencyValue(
      page.getByTestId("total-budget-amount"),
    );
    const updatedWeekly = await getCurrencyValue(
      page.getByTestId("total-data-amount"),
    );

    expect(updatedWeekly).toBe(previousWeekly);

    expect(updatedRemaining).toBe(previousRemaining);
  });
});
