import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "../../helpers/auth";
import {
  createMonthlyBudgetInDB,
  deleteAllMonthlyBudgetsInDB,
  PrismaModelSheets,
} from "helpers/db-helpers";
import {
  fillNewEntry,
  fillUpdateEntryForm,
  getCurrencyValue,
  seedMonthlyEntryInDb,
} from "helpers/budget";
import { qase } from "playwright-qase-reporter";

interface ResourcesConfig {
  label: string;
  entryType: "incomes" | "charges";
  name: string;
  table: PrismaModelSheets;
  computeExpected: (prev: number, amount: number) => number;
  qaseIds: Record<string, number | number[]>;
}

test.describe("Monthly entries", () => {
  const resources: ResourcesConfig[] = [
    {
      label: "Monthly charges",
      entryType: "charges",
      name: "charges",
      table: "monthlyCharge",
      computeExpected: (prev, amount) => prev - amount,
      qaseIds: {
        addEntry: 70,
        updateEntry: 72,
        deleteEntry: [73, 74],
        cancelEntryDeletion: 75,
        displayWithoutData: 80,
        updateAfterApi: 85,
        addWithFloat: 86,
      },
    },
    {
      label: "Monthly incomes",
      entryType: "incomes",
      name: "revenus",
      table: "monthlyIncome",
      computeExpected: (prev, amount) => prev + amount,
      qaseIds: {
        addEntry: 89,
        updateEntry: 90,
        deleteEntry: [91, 92],
        cancelEntryDeletion: 93,
        displayWithoutData: 98,
        updateAfterApi: 102,
        addWithFloat: 103,
      },
    },
  ];

  for (const {
    label,
    entryType,
    name,
    table,
    computeExpected,
    qaseIds,
  } of resources) {
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
          qase.id(qaseIds.addEntry);
          qase.title(
            `${name} mensuel(le) - Création avec données valides - Ajout réussi`,
          );

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
        qase.id(qaseIds.addWithFloat);
        qase.title(
          `${name} mensuel(le) - Création multiple avec décimaux - Précision numérique sur l'interface`,
        );

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

      test(`should update monthly ${entryType} list after API confirmation`, async ({
        page,
        user,
      }) => {
        qase.id(qaseIds.updateAfterApi);
        qase.title(
          `${name} mensuel(le) - Création réussie - Mise à jour de l'interface après confirmation API`,
        );

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
        expect(updatedTotal).toBe(previousTotal + Number(newEntry.amount));
      });

      test(
        `should update monthly ${entryType} and update remaining budget`,
        { tag: ["@regression"] },
        async ({ page, user, request }) => {
          qase.id(qaseIds.updateEntry);
          qase.title(
            `${name} mensuel(le) - Modification avec données valides - Mise à jour réussie`,
          );

          const { data: existantEntry } = await seedMonthlyEntryInDb(
            request,
            currentBudget.id,
            table,
          );
          await loginUser(page, user.email, user.password);
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
          await expect(entryItem).toBeVisible();
          await entryItem.getByTestId("update-item-btn").click();
          await fillUpdateEntryForm(page, {
            name: existantEntry.name,
            amount: updatedAmount,
          });

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
        async ({ page, user, request }) => {
          qase.id(qaseIds.deleteEntry);
          qase.title(
            `${name} mensuel(le) - Suppression - Demande de confirmation -- Suppression réussie`,
          );

          const { data: existantEntry } = await seedMonthlyEntryInDb(
            request,
            currentBudget.id,
            table,
          );
          await loginUser(page, user.email, user.password);

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
        qase.id(qaseIds.cancelEntryDeletion);
        qase.title(
          `${name} mensuel(le) -  Confirmation de la suppression - Suppression annulée`,
        );

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
        qase.id(qaseIds.displayWithoutData);
        qase.title(`${name} mensuel(le) - Aucune entrée - Totaux mis à jour`);

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
