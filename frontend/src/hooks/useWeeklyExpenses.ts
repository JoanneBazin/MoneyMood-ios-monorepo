import { getCurrentWeek } from "@/lib/weeks-helpers";
import { WeeklyExpensesParams } from "@/types";
import { useMemo, useState } from "react";

export const useWeeklyExpenses = ({
  expenses,
  weeklyBudget,
}: WeeklyExpensesParams) => {
  const [weekIndex, setWeekIndex] = useState(getCurrentWeek());
  const currentWeekNumber = weekIndex + 1;

  const weeklyExpenses = useMemo(
    () =>
      expenses.filter((expense) => expense.weekNumber === currentWeekNumber),
    [expenses, currentWeekNumber],
  );

  const remainingWeeklyBudget = useMemo(
    () =>
      weeklyBudget -
      weeklyExpenses.reduce((acc, entry) => acc + entry.amount, 0),
    [weeklyBudget, weeklyExpenses],
  );

  return {
    weekIndex,
    setWeekIndex,
    weeklyExpenses,
    remainingWeeklyBudget,
    currentWeekNumber,
  };
};
