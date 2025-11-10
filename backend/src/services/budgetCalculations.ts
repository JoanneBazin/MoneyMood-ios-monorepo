import { Decimal } from "@prisma/client/runtime/library";

export const calculateRemainingBudget = (
  incomes: { amount: Decimal | number }[],
  charges: { amount: Decimal | number }[],
  expenses?: { amount: Decimal | number }[]
): number => {
  const getAmount = (amount: number | Decimal): number => {
    return typeof amount === "number" ? amount : amount.toNumber();
  };

  const totalIncomes = incomes.reduce(
    (sum: number, income: { amount: Decimal | number }) =>
      sum + getAmount(income.amount),
    0
  );

  const totalCharges = charges.reduce(
    (sum: number, charge: { amount: Decimal | number }) =>
      sum + getAmount(charge.amount),
    0
  );

  if (expenses) {
    const totalExpenses = expenses.reduce(
      (sum: number, expense: { amount: Decimal | number }) =>
        sum + getAmount(expense.amount),
      0
    );

    return totalIncomes - totalCharges - totalExpenses;
  }

  return totalIncomes - totalCharges;
};

export const calculateSpecialBudget = (
  total: Decimal | number,
  expenses: { amount: Decimal | number }[]
): number => {
  const getAmount = (amount: number | Decimal): number => {
    return typeof amount === "number" ? amount : amount.toNumber();
  };

  const totalExpenses = expenses.reduce(
    (sum: number, expense: { amount: Decimal | number }) =>
      sum + getAmount(expense.amount),
    0
  );
  const totalBudget = getAmount(total);

  return totalBudget - totalExpenses;
};

export const calculateWeeklyBudget = (
  remainingBudget: number,
  numberOfWeeks: number
) => {
  return Math.round(remainingBudget / numberOfWeeks);
};
