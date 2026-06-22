import { Locator } from "@playwright/test";
import { getCurrencyValue } from "./budget";

export const getTotalEntries = async (container: Locator) => {
  return getCurrencyValue(container.getByTestId("total-data-amount"));
};
