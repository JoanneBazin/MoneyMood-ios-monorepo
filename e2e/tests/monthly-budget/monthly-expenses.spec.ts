import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "../../helpers/auth";
import {
  createMonthlyBudgetInDB,
  deleteAllMonthlyBudgetsInDB,
} from "helpers/db-helpers";
import {
  fillNewEntry,
  fillUpdateEntryForm,
  getCurrencyValue,
  seedMonthlyExpenseInDB,
} from "helpers/budget";

test.describe("Monthly expenses", () => {
  let currentBudget: Awaited<ReturnType<typeof createMonthlyBudgetInDB>>;

  test.beforeEach(async ({ user }) => {
    currentBudget = await createMonthlyBudgetInDB(user.id);
  });

  test.afterEach(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });

  test(
    "should add new expenses and update remaining and weekly budget",
    { tag: ["@smoke", "@regression"] },
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

  test("should update expenses list after API confirmation", async ({
    page,
    user,
  }) => {
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
  });

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

  const invalidAmountCases = [
    { value: "", issue: "empty" },
    { value: "0", issue: "invalid" },
  ];

  for (const { value, issue } of invalidAmountCases) {
    test(`should failed adding a new expense with ${issue} amount`, async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      const currentWeeklyTotal = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );

      const newExpense = { name: "expense 1", amount: value };

      await fillNewEntry(page, "expenses", newExpense);
      await page.getByTestId("add-expenses-btn").click();

      await expect(page.getByTestId("amount-input-error")).toBeVisible();
      await expect(
        page.getByTestId("data-item").filter({
          hasText: newExpense.name,
        }),
      ).not.toBeVisible();

      const updatedCurrentWeeklyTotal = await getCurrencyValue(
        page.getByTestId("total-data-amount"),
      );
      expect(updatedCurrentWeeklyTotal).toBe(currentWeeklyTotal);
    });

    test(`should failed updating expense with ${issue} amount`, async ({
      page,
      user,
      request,
    }) => {
      const { data: existantExpense } = await seedMonthlyExpenseInDB(
        request,
        currentBudget.id,
      );
      await loginUser(page, user.email, user.password);

      const expenseItem = page.getByTestId("data-item").filter({
        hasText: existantExpense.name,
      });
      await expect(expenseItem).toBeVisible();

      await expenseItem.getByTestId("update-item-btn").click();
      await fillUpdateEntryForm(page, {
        name: existantExpense.name,
        amount: value,
      });

      await expect(page.getByTestId("amount-input-error")).toBeVisible();
      await expect(page.getByTestId("update-item-form")).toBeVisible();
    });
  }

  test(
    "should update expense and update remaining and weekly budget",
    { tag: ["@regression"] },
    async ({ page, user, request }) => {
      const { data: existantExpense } = await seedMonthlyExpenseInDB(
        request,
        currentBudget.id,
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
      await fillUpdateEntryForm(page, updatedExpense);

      await expect(expenseItem).not.toBeVisible();
      await expect(
        page.getByTestId("data-item").filter({
          hasText: updatedExpense.name,
        }),
      ).toBeVisible();

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

  test(
    "should delete expense and update remaining and weekly budget",
    { tag: ["@regression"] },
    async ({ page, user, request }) => {
      const { data: existantExpense } = await seedMonthlyExpenseInDB(
        request,
        currentBudget.id,
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

      expect(updatedWeekly).toBe(previousWeekly + existantExpense.amount);

      expect(updatedRemaining).toBe(previousRemaining + existantExpense.amount);
    },
  );

  test("should cancel expense deletion before request", async ({
    page,
    user,
    request,
  }) => {
    const { data: existantExpense } = await seedMonthlyExpenseInDB(
      request,
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
