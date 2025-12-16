import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "../helpers/auth";
import {
  createMonthlyBudgetInBD,
  deleteAllMonthlyBudgetsInDB,
} from "helpers/db-helpers";

test.describe("Monthly budget", () => {
  test.afterAll(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });
  test.describe("Budget creation", async () => {
    test.beforeEach(async ({ user }) => {
      await deleteAllMonthlyBudgetsInDB(user.id);
    });

    test("should create new current budget and update dashboard with it", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      const charges = [
        { name: "charge 1", amount: "10" },
        { name: "charge 2", amount: "10" },
      ];
      const incomes = [
        { name: "income 1", amount: "100" },
        { name: "income 2", amount: "100" },
      ];
      const totalCharges = charges
        .map((c) => Number(c.amount))
        .reduce((acc, curr) => acc + curr, 0);
      const totalIncomes = incomes
        .map((i) => Number(i.amount))
        .reduce((acc, curr) => acc + curr, 0);

      await page.click('[data-testid="create-nav"]');

      for (let i = 0; i < incomes.length; i++) {
        await page.click('[data-testid="add-incomes-input"]');
        await page.fill(
          `[data-testid="incomes-name-input-${i}"]`,
          incomes[i].name
        );
        await page.fill(
          `[data-testid="incomes-amount-input-${i}"]`,
          incomes[i].amount
        );
      }

      for (let i = 0; i < charges.length; i++) {
        await page.click('[data-testid="add-charges-input"]');
        await page.fill(
          `[data-testid="charges-name-input-${i}"]`,
          charges[i].name
        );
        await page.fill(
          `[data-testid="charges-amount-input-${i}"]`,
          charges[i].amount
        );
      }

      await page.click('[data-testid="submit-monthly-budget"]');
      await expect(page).toHaveURL("app");

      const date = new Date();
      const displayedDate = new Intl.DateTimeFormat("fr-FR", {
        month: "long",
        year: "numeric",
      }).format(date);

      await expect(page.locator('[data-testid="app-banner"]')).toContainText(
        new RegExp(displayedDate, "i")
      );
      await expect(
        page.locator('[data-testid="remaining-budget"]')
      ).toContainText(String(totalIncomes - totalCharges));
    });

    test("should failed creating monthly budget if already exists for this month", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      await page.click('[data-testid="create-nav"]');
      await page.click('[data-testid="submit-monthly-budget"]');

      await page.click('[data-testid="create-nav"]');
      await page.click('[data-testid="submit-monthly-budget"]');

      await expect(
        page.locator('[data-testid="create-req-error"]', {
          hasText: "Un budget mensuel pour ce mois existe déjà",
        })
      ).toBeVisible();
    });

    test("should failed creating monthly budget if empty/invalid fields", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      await page.click('[data-testid="create-nav"]');

      await page.click('[data-testid="add-incomes-input"]');
      await page.fill(`[data-testid="incomes-name-input-0"]`, " ");
      await page.fill(`[data-testid="incomes-amount-input-0"]`, "-10");

      await page.click('[data-testid="submit-monthly-budget"]');

      await expect(
        page.locator('[data-testid="name-input-error"]')
      ).toBeVisible();
      await expect(
        page.locator('[data-testid="amount-input-error"]')
      ).toBeVisible();
    });
  });

  test.describe("Current budget managment", () => {
    let currentBudget: Awaited<ReturnType<typeof createMonthlyBudgetInBD>>;

    test.beforeEach(async ({ user }) => {
      currentBudget = await createMonthlyBudgetInBD(user.id);
    });
    test.afterEach(async ({ user }) => {
      await deleteAllMonthlyBudgetsInDB(user.id);
    });

    test("dashboard should display user's current monthly budget if exists", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      const remainingBuget = page.locator('[data-testid="remaining-budget"]');
      const totalCards = page.locator('[data-testid="total-card"]');
      const budgetData = page.locator('[data-testid="budget-data"]');

      await expect(remainingBuget).toBeVisible();
      await expect(remainingBuget).toContainText(
        String(currentBudget.remainingBudget)
      );
      await expect(totalCards).toHaveCount(2);
      await expect(budgetData).toBeVisible();
    });

    test("should add monthly income and update remaining budget", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);
      const newIncome = { name: "income 1", amount: "100" };

      const incomes = page.locator('[data-testid="total-card"]', {
        hasText: "revenus",
      });
      await incomes.click();

      await page.click('[data-testid="add-incomes-input"]');
      await page.fill('[data-testid="incomes-name-input-0"]', newIncome.name);
      await page.fill(
        '[data-testid="incomes-amount-input-0"]',
        newIncome.amount
      );
      await page.click('[data-testid="add-entries-btn"]');

      const incomeItem = page.locator('[data-testid="data-item"]', {
        hasText: newIncome.name,
      });
      await expect(incomeItem).toBeVisible();
      await expect(incomeItem).toContainText(newIncome.amount);

      await page.click('[data-testid="back-arrow"]');

      const newRemaining =
        currentBudget.remainingBudget + Number(newIncome.amount);
      await expect(
        page.locator('[data-testid="remaining-budget"]')
      ).toContainText(String(newRemaining));
      await expect(incomes).toContainText(String(newRemaining));
    });

    test("should add several monthly charges and update remaining budget", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      const newCharges = [
        { name: "charge 1", amount: "10" },
        { name: "charge 2", amount: "10" },
      ];
      const totalCharges = newCharges
        .map((c) => Number(c.amount))
        .reduce((acc, curr) => acc + curr, 0);

      const charges = page.locator('[data-testid="total-card"]', {
        hasText: "charges",
      });
      await charges.click();

      for (let i = 0; i < newCharges.length; i++) {
        await page.click('[data-testid="add-charges-input"]');
        await page.fill(
          `[data-testid="charges-name-input-${i}"]`,
          newCharges[i].name
        );
        await page.fill(
          `[data-testid="charges-amount-input-${i}"]`,
          newCharges[i].amount
        );
      }

      await page.click('[data-testid="add-entries-btn"]');

      await expect(
        page.locator('[data-testid="remaining-budget"]')
      ).toContainText(String(totalCharges));

      await page.click('[data-testid="back-arrow"]');

      const newRemaining = currentBudget.remainingBudget - totalCharges;
      await expect(
        page.locator('[data-testid="remaining-budget"]')
      ).toContainText(String(newRemaining));
      await expect(charges).toContainText(String(totalCharges));
    });

    test("should delete current budget and dashboard should display action buttons", async ({
      page,
      user,
    }) => {
      await loginUser(page, user.email, user.password);

      await page.click('[data-testid="budget-options-menu"]');
      await page.click('[data-testid="delete-budget-btn"]');
      await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
      await page.click('[data-testid="confirm-delete-btn"]');

      await expect(
        page.locator('[data-testid="budget-actions-container"]')
      ).toBeVisible();
    });
  });
});
