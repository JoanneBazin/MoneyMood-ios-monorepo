import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "../../helpers/auth";
import {
  createMonthlyBudgetInDB,
  deleteAllMonthlyBudgetsInDB,
} from "helpers/db-helpers";
import { fillNewEntry, getCurrencyValue } from "helpers/budget";

interface ResourcesConfig {
  label: string;
  entryType: "incomes" | "charges";
  name: string;
  computeExpected: (prev: number, amount: number) => number;
}

test.describe("Monthly entries", () => {
  test.afterAll(async ({ user }) => {
    await deleteAllMonthlyBudgetsInDB(user.id);
  });

  const resources: ResourcesConfig[] = [
    {
      label: "Monthly charges",
      entryType: "charges",
      name: "charges",
      computeExpected: (prev, amount) => prev - amount,
    },
    {
      label: "Monthly incomes",
      entryType: "incomes",
      name: "revenus",
      computeExpected: (prev, amount) => prev + amount,
    },
  ];

  for (const { label, entryType, name, computeExpected } of resources) {
    test.describe(`${label} managment`, () => {
      let currentBudget: Awaited<ReturnType<typeof createMonthlyBudgetInDB>>;

      test.beforeEach(async ({ user }) => {
        currentBudget = await createMonthlyBudgetInDB(user.id);
      });
      test.afterEach(async ({ user }) => {
        await deleteAllMonthlyBudgetsInDB(user.id);
      });

      test(
        `should add monthly ${entryType} and update remaining budget`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          await loginUser(page, user.email, user.password);
          const newEntry = { name: "entry 1", amount: "100" };

          const remainingBudget = page.getByTestId("remaining-budget");
          const previousRemaining = await getCurrencyValue(
            remainingBudget.getByTestId("total-budget-amount"),
          );

          await page.getByTestId(`total-card-${name}`).click();

          const previousTotal = await getCurrencyValue(
            page.getByTestId("total-budget-amount"),
          );

          await fillNewEntry(page, entryType, newEntry);
          await page.getByTestId("add-entries-btn").click();

          const entryItem = page.getByTestId("data-item").filter({
            hasText: newEntry.name,
          });
          await expect(entryItem).toBeVisible();
          await expect(entryItem).toContainText(newEntry.amount);
          const updatedTotal = await getCurrencyValue(
            page.getByTestId("total-budget-amount"),
          );
          expect(updatedTotal).toBe(previousTotal + Number(newEntry.amount));

          await page.getByTestId("back-arrow").click();

          const updatedRemaining = await getCurrencyValue(
            remainingBudget.getByTestId("total-budget-amount"),
          );
          expect(updatedRemaining).toBe(
            computeExpected(previousRemaining, Number(newEntry.amount)),
          );
          const weeklyBudget = await getCurrencyValue(
            page.getByTestId("total-data-amount"),
          );
          expect(weeklyBudget).toBe(
            updatedRemaining / currentBudget.numberOfWeeks,
          );
        },
      );

      test(`should add monthly ${entryType} with float amounts`, async ({
        page,
        user,
      }) => {
        await loginUser(page, user.email, user.password);
        const newEntries = [
          { name: "entry 1", amount: "0.10" },
          { name: "entry 2", amount: "0.20" },
        ];
        const totalEntries = newEntries
          .map((e) => Number(e.amount))
          .reduce((acc, curr) => acc + curr, 0);

        const remainingBudget = page.getByTestId("remaining-budget");
        const previousRemaining = await getCurrencyValue(
          remainingBudget.getByTestId("total-budget-amount"),
        );

        await page.getByTestId(`total-card-${name}`).click();

        const previousTotal = await getCurrencyValue(
          page.getByTestId("total-budget-amount"),
        );

        for (let i = 0; i < newEntries.length; i++) {
          await fillNewEntry(page, entryType, newEntries[i], i);
        }
        await page.getByTestId("add-entries-btn").click();
        await expect(
          page.getByTestId("data-item").filter({
            hasText: newEntries[0].name,
          }),
        ).toBeVisible();

        const updatedTotal = await getCurrencyValue(
          page.getByTestId("total-budget-amount"),
        );

        expect(updatedTotal).toBe(previousTotal + totalEntries);

        await page.getByTestId("back-arrow").click();

        const updatedRemaining = await getCurrencyValue(
          remainingBudget.getByTestId("total-budget-amount"),
        );
        expect(updatedRemaining).toBe(
          computeExpected(previousRemaining, totalEntries),
        );
      });

      test(
        `should update monthly ${entryType} list after API confirmation`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          let receiveResponse = (value?: unknown) => {};
          const blockPromise = new Promise((resolve) => {
            receiveResponse = resolve;
          });

          await page.route(
            `${process.env.API_URL}/api/monthly-budgets/${currentBudget.id}/${entryType}`,
            async (route) => {
              await blockPromise;
              await route.continue();
            },
          );

          await loginUser(page, user.email, user.password);
          const newEntry = { name: "entry 1", amount: "100" };

          await page.getByTestId(`total-card-${name}`).click();

          const previousTotal = await getCurrencyValue(
            page.getByTestId("total-budget-amount"),
          );

          await fillNewEntry(page, entryType, newEntry);
          await page.getByTestId("add-entries-btn").click();

          const temporaryTotal = await getCurrencyValue(
            page.getByTestId("total-budget-amount"),
          );
          expect(temporaryTotal).toBe(previousTotal);
          const entryItem = page.getByTestId("data-item").filter({
            hasText: newEntry.name,
          });
          await expect(entryItem).not.toBeVisible();

          receiveResponse();

          await expect(entryItem).toBeVisible();
          const updatedTotal = await getCurrencyValue(
            page.getByTestId("total-budget-amount"),
          );
          expect(updatedTotal).toBe(
            computeExpected(previousTotal, Number(newEntry.amount)),
          );
        },
      );

      test(
        `should update monthly ${entryType} and update remaining budget`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          await loginUser(page, user.email, user.password);
          const existantEntry = currentBudget[entryType][0];
          const updatedAmount = "100";

          const remainingBudget = page.getByTestId("remaining-budget");
          const previousRemaining = await getCurrencyValue(
            remainingBudget.getByTestId("total-budget-amount"),
          );

          await page.getByTestId(`total-card-${name}`).click();

          const previousTotal = await getCurrencyValue(
            page.getByTestId("total-budget-amount"),
          );

          const entryItem = page.getByTestId("data-item").filter({
            hasText: existantEntry.name,
          });
          await entryItem.getByTestId("update-item-btn").click();
          await expect(page.getByTestId("update-item-form")).toBeVisible();

          await page.getByTestId("update-amount-input").fill(updatedAmount);
          await page.getByTestId("update-btn").click();

          await expect(entryItem).toContainText(updatedAmount);

          const updatedTotal = await getCurrencyValue(
            page.getByTestId("total-budget-amount"),
          );
          const entryDifference =
            Number(updatedAmount) - Number(existantEntry.amount);
          expect(updatedTotal).toBe(previousTotal + entryDifference);

          await page.getByTestId("back-arrow").click();

          const updatedRemaining = await getCurrencyValue(
            remainingBudget.getByTestId("total-budget-amount"),
          );
          expect(updatedRemaining).not.toBe(previousRemaining);

          const weeklyBudget = await getCurrencyValue(
            page.getByTestId("total-data-amount"),
          );
          expect(weeklyBudget).toBe(
            updatedRemaining / currentBudget.numberOfWeeks,
          );
        },
      );

      test(
        `should delete monthly ${entryType} and update remaining budget`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          await loginUser(page, user.email, user.password);
          const existantEntry = currentBudget[entryType][0];

          const remainingBudget = page.getByTestId("remaining-budget");
          const previousRemaining = await getCurrencyValue(
            remainingBudget.getByTestId("total-budget-amount"),
          );

          await page.getByTestId(`total-card-${name}`).click();

          const previousTotal = await getCurrencyValue(
            page.getByTestId("total-budget-amount"),
          );

          const entryItem = page.getByTestId("data-item").filter({
            hasText: existantEntry.name,
          });
          await entryItem.getByTestId("update-item-btn").click();
          await expect(page.getByTestId("update-item-form")).toBeVisible();

          await page.getByTestId("delete-btn").click();
          await page.getByTestId("confirm-delete-btn").click();

          await expect(entryItem).not.toBeVisible();

          const updatedTotal = await getCurrencyValue(
            page.getByTestId("total-budget-amount"),
          );
          expect(updatedTotal).toBe(
            previousTotal - Number(existantEntry.amount),
          );

          await page.getByTestId("back-arrow").click();

          const updatedRemaining = await getCurrencyValue(
            remainingBudget.getByTestId("total-budget-amount"),
          );
          expect(updatedRemaining).not.toBe(previousRemaining);

          const weeklyBudget = await getCurrencyValue(
            page.getByTestId("total-data-amount"),
          );
          expect(weeklyBudget).toBe(
            updatedRemaining / currentBudget.numberOfWeeks,
          );
        },
      );

      test(`should cancel monthly ${entryType} deletion before request`, async ({
        page,
        user,
      }) => {
        await loginUser(page, user.email, user.password);

        const remainingBudget = page.getByTestId("remaining-budget");
        const previousRemaining = await getCurrencyValue(
          remainingBudget.getByTestId("total-budget-amount"),
        );

        await page.getByTestId(`total-card-${name}`).click();

        const previousTotal = await getCurrencyValue(
          page.getByTestId("total-budget-amount"),
        );

        const entryItem = page.getByTestId("data-item").first();
        await entryItem.getByTestId("update-item-btn").click();
        await expect(page.getByTestId("update-item-form")).toBeVisible();

        await page.getByTestId("delete-btn").click();
        await page.getByTestId("cancel-delete-btn").click();
        await page.getByTestId("dialog-close").click();

        await expect(page.getByTestId("update-item-form")).not.toBeVisible();
        await expect(entryItem).toBeVisible();

        const updatedTotal = await getCurrencyValue(
          page.getByTestId("total-budget-amount"),
        );
        expect(updatedTotal).toBe(previousTotal);

        await page.getByTestId("back-arrow").click();

        const updatedRemaining = await getCurrencyValue(
          remainingBudget.getByTestId("total-budget-amount"),
        );
        expect(updatedRemaining).toBe(previousRemaining);
      });

      test(`should display monthly ${entryType} screen without ${entryType}`, async ({
        page,
        user,
      }) => {
        await loginUser(page, user.email, user.password);

        await page.getByTestId(`total-card-${name}`).click();

        const entryItem = page.getByTestId("data-item");

        while (await entryItem.first().isVisible()) {
          await entryItem.getByTestId("update-item-btn").click();
          await expect(page.getByTestId("update-item-form")).toBeVisible();

          await page.getByTestId("delete-btn").click();
          await page.getByTestId("confirm-delete-btn").click();

          await expect(page.getByTestId("update-item-form")).not.toBeVisible();
        }

        await expect(entryItem).toHaveCount(0);
        const updatedTotal = await getCurrencyValue(
          page.getByTestId("total-budget-amount"),
        );
        expect(updatedTotal).toBe(0);
      });
    });
  }
});
