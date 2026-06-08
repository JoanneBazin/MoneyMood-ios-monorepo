import { APIRequestContext, expect, Locator, Page } from "@playwright/test";
import { PrismaModelSheets } from "./db-helpers";

interface EntryResponse {
  data: {
    name: string;
    amount: number;
  };
  remainingBudget: number;
}

interface ExpenseResponse extends EntryResponse {
  data: {
    name: string;
    amount: number;
    weekNumber: number;
  };
}

export const displayedDate = (year: number, month: number) => {
  const date = new Date(year, month - 1);
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date);
};

export const getCurrencyValue = async (locator: Locator) => {
  const text = await locator.textContent();
  return Number(text?.replace(/[^\d.-]/g, ""));
};

type EntryType = "incomes" | "charges" | "expenses" | "special-expenses";
interface DataType {
  name: string;
  amount: string;
}

export const fillNewEntry = async (
  container: Page | Locator,
  entryType: EntryType,
  data: DataType,
  index = 0,
) => {
  await container.getByTestId(`add-${entryType}-input`).click();
  await container
    .getByTestId(`${entryType}-name-input-${index}`)
    .fill(data.name);
  await container
    .getByTestId(`${entryType}-amount-input-${index}`)
    .fill(data.amount);
};

export const getProjectTotals = async (
  remainingContainer: Locator,
  totalExpensesContainer: Locator,
  totalCatExpensesContainer?: Locator,
) => {
  const totalRemaining = await getCurrencyValue(
    remainingContainer.getByTestId("total-budget-amount"),
  );
  const totalExpenses = await getCurrencyValue(
    totalExpensesContainer.getByTestId("total-data-amount"),
  );

  let totalCatExpenses;
  if (totalCatExpensesContainer) {
    totalCatExpenses = await getCurrencyValue(
      totalCatExpensesContainer.getByTestId("total-data-amount"),
    );
  } else {
    totalCatExpenses = null;
  }

  return { totalRemaining, totalExpenses, totalCatExpenses };
};

export const getMonthlyBudgetTotals = async (
  remainingContainer: Locator,
  weeklyContainer: Locator,
) => {
  const totalRemaining = await getCurrencyValue(
    remainingContainer.getByTestId("total-budget-amount"),
  );
  const totalWeekly = await getCurrencyValue(
    weeklyContainer.getByTestId("total-data-amount"),
  );

  return { totalRemaining, totalWeekly };
};

export const seedMonthlyEntryInDb = async (
  request: APIRequestContext,
  monthlyBudgetId: string,
  table: PrismaModelSheets,
) => {
  const createReq = await request.post("/api/monthly-budgets/test/seed", {
    headers: {
      Authorization: `Bearer ${process.env.E2E_TOKEN}`,
    },
    data: {
      model: table,
      data: { monthlyBudgetId, name: "Entry Test", amount: 300 },
    },
  });

  expect(createReq.ok).toBeTruthy();
  const response: EntryResponse = await createReq.json();
  return response;
};

export const seedMonthlyExpenseInDB = async (
  request: APIRequestContext,
  monthlyBudgetId: string,
  weekNumber = 1,
) => {
  const createReq = await request.post("/api/monthly-budgets/test/seed", {
    headers: {
      Authorization: `Bearer ${process.env.E2E_TOKEN}`,
    },
    data: {
      model: "expense",
      data: { monthlyBudgetId, name: "Expense Test", amount: 30, weekNumber },
    },
  });

  expect(createReq.ok).toBeTruthy();
  const response: ExpenseResponse = await createReq.json();
  return response;
};
