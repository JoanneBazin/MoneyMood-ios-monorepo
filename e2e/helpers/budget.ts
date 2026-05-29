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

type EntryType = "incomes" | "charges" | "expenses";
interface DataType {
  name: string;
  amount: string;
}

export const fillNewEntry = async (
  page: Page,
  entryType: EntryType,
  data: DataType,
  index = 0,
) => {
  await page.getByTestId(`add-${entryType}-input`).click();
  await page.getByTestId(`${entryType}-name-input-${index}`).fill(data.name);
  await page
    .getByTestId(`${entryType}-amount-input-${index}`)
    .fill(data.amount);
};
