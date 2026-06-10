import { expect, test } from "fixtures/user.fixture";
import { loginUser } from "helpers/auth";
import { fillNewEntry, fillUpdateEntryForm } from "helpers/budget";
import {
  createFixedEntryInDb,
  deleteAllFixedEntriesInDB,
  PrismaModelSheets,
  deleteAllMonthlyBudgetsInDB,
} from "helpers/db-helpers";
import { getTotalEntries } from "helpers/profile";
import { qase } from "playwright-qase-reporter";

interface ResourcesConfig {
  label: string;
  entryType: "incomes" | "charges";
  name: string;
  table: PrismaModelSheets;
  qaseIds: Record<string, number | number[]>;
}

const resources: ResourcesConfig[] = [
  {
    label: "Fixed charges",
    entryType: "charges",
    name: "charges",
    table: "fixedCharge",
    qaseIds: {
      addEntry: 149,
      updateEntry: 150,
      deleteEntry: [151, 152],
      cancelEntryDeletion: 153,
      updateWithoutImpact: 176,
    },
  },
  {
    label: "Fixed incomes",
    entryType: "incomes",
    name: "revenus",
    table: "fixedIncome",
    qaseIds: {
      addEntry: 167,
      updateEntry: 168,
      deleteEntry: [169, 170],
      cancelEntryDeletion: 171,
      updateWithoutImpact: 177,
    },
  },
];

for (const { label, entryType, name, table, qaseIds } of resources) {
  test.describe(`${label} managment`, () => {
    test.beforeEach(async ({ user }) => {
      await deleteAllFixedEntriesInDB(user.id);
    });
    test.afterAll(async ({ user }) => {
      await deleteAllFixedEntriesInDB(user.id);
    });
    test(
      `should add fixed ${entryType} and update monthly budget creation fields`,
      { tag: ["@regression"] },
      async ({ page, user }) => {
        qase.id(qaseIds.addEntry);
        qase.title(
          `${name} fixe - Création avec données valides - Ajout réussi`,
        );

        await loginUser(page, user.email, user.password);
        const newEntry = { name: "entry 1", amount: "100" };

        await page.getByTestId("nav-menu").click();
        await page.getByTestId("profile-nav").click();
        await expect(page).toHaveURL("/profile/budget");

        const entriesContainer = page.getByTestId("budget-data").filter({
          has: page
            .getByTestId("budget-data-title")
            .getByText(name, { exact: false }),
        });
        const previousTotal = await getTotalEntries(entriesContainer);

        await fillNewEntry(page, entryType, newEntry);
        await page.getByTestId(`add-${entryType}-btn`).click();

        const entryItem = page.getByTestId("data-item").filter({
          hasText: newEntry.name,
        });
        await expect(entryItem).toBeVisible();
        await expect(entryItem).toContainText(newEntry.name);
        const updatedTotal = await getTotalEntries(entriesContainer);
        expect(updatedTotal).toBe(previousTotal + Number(newEntry.amount));

        await page.goto("/app");
        await page.getByTestId("create-nav").click();
        await expect(page.getByTestId(`${entryType}-name-input-0`)).toHaveValue(
          newEntry.name,
        );
        await expect(
          page.getByTestId(`${entryType}-amount-input-0`),
        ).toHaveValue(newEntry.amount);
      },
    );

    test(
      `should update fixed ${entryType} and update monthly budget creation fields`,
      { tag: ["@regression"] },
      async ({ page, user }) => {
        qase.id(qaseIds.updateEntry);
        qase.title(
          `${name} fixe - Modification avec données valides - Mise à jour réussie`,
        );

        const existantEntry = await createFixedEntryInDb(user.id, table);
        await loginUser(page, user.email, user.password);
        await page.goto("/profile/budget");

        const updatedAmount = "500";

        const entriesContainer = page.getByTestId("budget-data").filter({
          has: page
            .getByTestId("budget-data-title")
            .getByText(name, { exact: false }),
        });

        const entryItem = entriesContainer.getByTestId("data-item").filter({
          hasText: existantEntry.name,
        });
        await expect(entryItem).toBeVisible();

        const previousTotal = await getTotalEntries(entriesContainer);

        await entryItem.getByTestId("update-item-btn").click();
        await fillUpdateEntryForm(page, {
          name: existantEntry.name,
          amount: updatedAmount,
        });

        await expect(entryItem).toContainText(updatedAmount);

        const updatedTotal = await getTotalEntries(entriesContainer);
        const entryDifference =
          Number(updatedAmount) - Number(existantEntry.amount);

        expect(updatedTotal).toBe(previousTotal + entryDifference);

        await page.goto("/app/create");
        await expect(page.getByTestId(`${entryType}-name-input-0`)).toHaveValue(
          existantEntry.name,
        );
        await expect(
          page.getByTestId(`${entryType}-amount-input-0`),
        ).toHaveValue(updatedAmount);
      },
    );

    test(
      `should update fixed ${entryType} without impacting existant budgets`,
      { tag: ["@regression"] },
      async ({ page, user }) => {
        qase.id(qaseIds.updateWithoutImpact);
        qase.title(
          `${name} fixe - Modification réussie - Pas d'effet rétroactif`,
        );

        const existantEntry = await createFixedEntryInDb(user.id, table);
        await loginUser(page, user.email, user.password);
        const updatedAmount = "500";

        await page.goto("/app/create");
        await expect(page.getByTestId(`${entryType}-name-input-0`)).toHaveValue(
          existantEntry.name,
        );
        await expect(
          page.getByTestId(`${entryType}-amount-input-0`),
        ).toHaveValue(String(existantEntry.amount));
        await page.getByTestId("submit-monthly-budget").click();

        await expect(page).toHaveURL("app");
        await page.getByTestId(`total-card-${name}`).click();
        const monthlyEntryItem = page.getByTestId("data-item").filter({
          hasText: existantEntry.name,
        });
        await expect(monthlyEntryItem).toContainText(
          String(existantEntry.amount),
        );

        await page.goto("/profile/budget");

        const entryItem = page.getByTestId("data-item").filter({
          hasText: existantEntry.name,
        });
        await entryItem.getByTestId("update-item-btn").click();
        await fillUpdateEntryForm(page, {
          name: existantEntry.name,
          amount: updatedAmount,
        });

        await expect(entryItem).toContainText(updatedAmount);

        await page.goto("/app");
        await page.getByTestId(`total-card-${name}`).click();
        await expect(monthlyEntryItem).toContainText(
          String(existantEntry.amount),
        );

        await deleteAllMonthlyBudgetsInDB(user.id);
      },
    );

    test(
      `should delete fixed ${entryType} and update monthly budget creation fields`,
      { tag: ["@regression"] },
      async ({ page, user }) => {
        qase.id(qaseIds.deleteEntry);
        qase.title(
          `${name} fixe - Suppression - Demande de confirmation -- Suppression réussie`,
        );

        const existantEntry = await createFixedEntryInDb(user.id, table);
        await loginUser(page, user.email, user.password);
        await page.goto("/profile/budget");

        const entriesContainer = page.getByTestId("budget-data").filter({
          has: page
            .getByTestId("budget-data-title")
            .getByText(name, { exact: false }),
        });

        const entryItem = page.getByTestId("data-item").filter({
          hasText: existantEntry.name,
        });
        await entryItem.getByTestId("update-item-btn").click();
        await expect(page.getByTestId("update-item-form")).toBeVisible();

        await page.getByTestId("delete-btn").click();
        await page.getByTestId("confirm-delete-btn").click();

        await expect(entryItem).not.toBeVisible();
        await expect(page.getByTestId("data-item")).toHaveCount(0);

        const updatedTotal = await getTotalEntries(entriesContainer);
        expect(updatedTotal).toBe(0);

        await page.goto("/app/create");
        await expect(
          page.getByTestId(`${entryType}-name-input-0`),
        ).not.toBeVisible();
        await expect(
          page.getByTestId(`${entryType}-amount-input-0`),
        ).not.toBeVisible();
      },
    );

    test(`should cancel fixed ${entryType} deletion before request`, async ({
      page,
      user,
    }) => {
      qase.id(qaseIds.cancelEntryDeletion);
      qase.title(
        `${name} fixe -  Confirmation de la suppression - Suppression annulée`,
      );

      const existantEntry = await createFixedEntryInDb(user.id, table);
      await loginUser(page, user.email, user.password);
      await page.goto("/profile/budget");

      const entriesContainer = page.getByTestId("budget-data").filter({
        has: page
          .getByTestId("budget-data-title")
          .getByText(name, { exact: false }),
      });

      const entryItem = entriesContainer.getByTestId("data-item").filter({
        hasText: existantEntry.name,
      });
      await expect(entryItem).toBeVisible();

      const previousTotal = await getTotalEntries(entriesContainer);

      await entryItem.getByTestId("update-item-btn").click();
      await expect(page.getByTestId("update-item-form")).toBeVisible();

      await page.getByTestId("delete-btn").click();
      await page.getByTestId("cancel-delete-btn").click();
      await page.getByTestId("dialog-close").click();

      await expect(page.getByTestId("update-item-form")).not.toBeVisible();
      await expect(entryItem).toBeVisible();

      const updatedTotal = await getTotalEntries(entriesContainer);
      expect(updatedTotal).toBe(previousTotal);
    });
  });
}
