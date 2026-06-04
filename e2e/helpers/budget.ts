import { Locator, Page } from "@playwright/test";

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
