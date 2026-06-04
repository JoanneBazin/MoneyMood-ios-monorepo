import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "../../helpers/auth";
import {
  createMonthlyBudgetInDB,
  deleteAllMonthlyBudgetsInDB,
} from "helpers/db-helpers";
import {
  displayedDate,
  fillNewEntry,
  getCurrencyValue,
  getMonthlyBudgetTotals,
} from "helpers/budget";

test.describe("Monthly budget", () => {
  test.afterAll(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });

  test.describe("Budget creation", () => {
    test.beforeEach(async ({ user }) => {
      await deleteAllMonthlyBudgetsInDB(user.id);
    });

    test(
      "should create first current budget and update dashboard with it",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);

        const charge = { name: "charge 1", amount: "100.5" };
        const income = { name: "income 1", amount: "1000" };

        await page.getByTestId("create-nav").click();

        await fillNewEntry(page, "incomes", income);
        await fillNewEntry(page, "charges", charge);

        await page.getByTestId("submit-monthly-budget").click();
        await expect(page).toHaveURL("app");

        const date = new Date();
        const displayedDate = new Intl.DateTimeFormat("fr-FR", {
          month: "long",
          year: "numeric",
        }).format(date);

        await expect(page.getByTestId("app-banner")).toContainText(
          new RegExp(displayedDate, "i"),
        );

        const remainingBudget = await getCurrencyValue(
          page.getByTestId("total-budget-amount"),
        );
        const totalCharges = await getCurrencyValue(
          page.getByTestId("total-card-charges-amount"),
        );
        const totalIncomes = await getCurrencyValue(
          page.getByTestId("total-card-revenus-amount"),
        );
        expect(remainingBudget).toBe(
          Number(income.amount) - Number(charge.amount),
        );
        expect(totalCharges).toBe(Number(charge.amount));
        expect(totalIncomes).toBe(Number(income.amount));
      },
    );

    test(
      "should create new current budget and replace current one on dashboard",
      { tag: ["@smoke", "@regression"] },
      async ({ page, user }) => {
        const currentBudget = await createMonthlyBudgetInDB(user.id);
        await loginUser(page, user.email, user.password);

        const previousRemainingBudget = await getCurrencyValue(
          page.getByTestId("total-budget-amount"),
        );
        const weeklyBudget = await getCurrencyValue(
          page.getByTestId("total-data-amount"),
        );
        expect(previousRemainingBudget).toBe(currentBudget.remainingBudget);
        expect(weeklyBudget).toBe(currentBudget.weeklyBudget);

        const charges = [
          { name: "charge 1", amount: "10" },
          { name: "charge 2", amount: "10" },
        ];
        const incomes = [
          { name: "income 1", amount: "100" },
          { name: "income 2", amount: "100" },
        ];
        const chargesAmount = charges
          .map((c) => Number(c.amount))
          .reduce((acc, curr) => acc + curr, 0);
        const incomesAmount = incomes
          .map((i) => Number(i.amount))
          .reduce((acc, curr) => acc + curr, 0);

        await page.getByTestId("create-nav").click();

        for (let i = 0; i < incomes.length; i++) {
          await fillNewEntry(page, "incomes", incomes[i], i);
        }
        for (let i = 0; i < charges.length; i++) {
          await fillNewEntry(page, "charges", charges[i], i);
        }
        await page.getByTestId("submit-monthly-budget").click();
        await expect(page).toHaveURL("app");

        const newRemainingBudget = await getCurrencyValue(
          page.getByTestId("total-budget-amount"),
        );
        const totalCharges = await getCurrencyValue(
          page.getByTestId("total-card-charges-amount"),
        );
        const totalIncomes = await getCurrencyValue(
          page.getByTestId("total-card-revenus-amount"),
        );
        expect(newRemainingBudget).toBe(incomesAmount - chargesAmount);
        expect(totalCharges).toBe(chargesAmount);
        expect(totalIncomes).toBe(incomesAmount);

        await page.getByTestId("history-nav").click();
        await expect(page).toHaveURL("/app/history");
        const oldBudgetDate = displayedDate(
          currentBudget.year,
          currentBudget.month,
        );
        const oldBudgetCard = page.getByTestId("history-card").filter({
          hasText: new RegExp(oldBudgetDate, "i"),
        });
        await expect(oldBudgetCard).toBeVisible();
      },
    );

    test(
      "should failed creating monthly budget if already exists for this month",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);
        const currentDate = new Date();
        await createMonthlyBudgetInDB(
          user.id,
          currentDate.getMonth() + 1,
          currentDate.getFullYear(),
        );

        await page.getByTestId("create-nav").click();
        await page.getByTestId("submit-monthly-budget").click();

        await expect(
          page.getByTestId("create-req-error").filter({
            hasText: "Un budget mensuel pour ce mois existe déjà",
          }),
        ).toBeVisible();
      },
    );

    test("should failed creating monthly budget with empty fields", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      await page.getByTestId("create-nav").click();

      await page.getByTestId("add-incomes-input").click();
      await page.getByTestId("submit-monthly-budget").click();

      await expect(page).toHaveURL("app/create");
      await expect(page.getByTestId("name-input-error")).toBeVisible();
      await expect(page.getByTestId("amount-input-error")).toBeVisible();
    });

    test("should failed creating monthly budget with invalid fields", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      const invalidEntry = { name: " ", amount: "-10" };
      await page.getByTestId("create-nav").click();

      await fillNewEntry(page, "incomes", invalidEntry);

      await page.getByTestId("submit-monthly-budget").click();

      await expect(page).toHaveURL("app/create");
      await expect(page.getByTestId("name-input-error")).toBeVisible();
      await expect(page.getByTestId("amount-input-error")).toBeVisible();
    });
  });

  test.describe("Current budget display", () => {
    let currentBudget: Awaited<ReturnType<typeof createMonthlyBudgetInDB>>;

    test.beforeEach(async ({ user }) => {
      currentBudget = await createMonthlyBudgetInDB(user.id);
    });
    test.afterEach(async ({ user }) => {
      await deleteAllMonthlyBudgetsInDB(user.id);
    });

    test(
      "dashboard should display user's current monthly budget if exists",
      { tag: ["@smoke", "@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);

        const remainingBudget = page.getByTestId("remaining-budget");
        const chargesCard = page.getByTestId("total-card-charges");
        const incomesCard = page.getByTestId("total-card-revenus");
        const budgetData = page.getByTestId("budget-data");
        const { totalRemaining, totalWeekly } = await getMonthlyBudgetTotals(
          remainingBudget,
          budgetData,
        );

        await expect(remainingBudget).toBeVisible();
        expect(totalRemaining).toBe(currentBudget.remainingBudget);
        await expect(chargesCard).toBeVisible();
        await expect(incomesCard).toBeVisible();
        await expect(budgetData).toBeVisible();
        expect(totalWeekly).toBe(totalRemaining / currentBudget.numberOfWeeks);
      },
    );

    test(
      "authenticated user should be redirected to their dashboard when accessing the app",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);

        await page.goto("/");
        await expect(page).toHaveURL("/app");
      },
    );
  });

  test.describe("Current budget managment", () => {
    let currentBudget: Awaited<ReturnType<typeof createMonthlyBudgetInDB>>;

    test.beforeEach(async ({ user }) => {
      currentBudget = await createMonthlyBudgetInDB(user.id);
    });
    test.afterEach(async ({ user }) => {
      await deleteAllMonthlyBudgetsInDB(user.id);
    });

    test(
      "should delete current budget and dashboard should display action buttons",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        await loginUser(page, user.email, user.password);

        await page.getByTestId("budget-options-menu").click();
        await page.getByTestId("delete-budget-btn").click();
        await expect(page.getByTestId("delete-modal")).toBeVisible();
        await page.getByTestId("confirm-delete-btn").click();

        await expect(page.getByTestId("delete-modal")).not.toBeVisible();
        await expect(
          page.getByTestId("budget-actions-container"),
        ).toBeVisible();
      },
    );

    test("should cancel budget deletion before request and dashboard should display current budget", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      await page.getByTestId("budget-options-menu").click();
      await page.getByTestId("delete-budget-btn").click();
      await expect(page.getByTestId("delete-modal")).toBeVisible();
      await page.getByTestId("cancel-delete-btn").click();

      await expect(page.getByTestId("delete-modal")).not.toBeVisible();
      await expect(page.getByTestId("remaining-budget")).toBeVisible();
      await expect(page.getByTestId("budget-data")).toBeVisible();
    });

    test("should archive current budget in the history and update dashboard", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      await page.getByTestId("budget-options-menu").click();
      await page.getByTestId("update-budget-status").click();

      await expect(page.getByTestId("budget-actions-container")).toBeVisible();

      await page.getByTestId("history-nav").click();
      await expect(page).toHaveURL("/app/history");

      const oldBudgetDate = displayedDate(
        currentBudget.year,
        currentBudget.month,
      );
      const oldBudgetCard = page.getByTestId("history-card").filter({
        hasText: new RegExp(oldBudgetDate, "i"),
      });
      await expect(oldBudgetCard).toBeVisible();
    });
  });
});
