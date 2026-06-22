import { getCurrentWeek } from "@/lib/weeks-helpers";
import { WeeklyExpensesParams } from "@/types";
import { BaseEntryForm } from "@shared/schemas";
import { useMemo, useState } from "react";
import { useCurrentBudgetQuery } from "./queries";

export const useWeeklyExpenses = ({
  expenses,
  weeklyBudget,
  edit,
}: WeeklyExpensesParams) => {
  const { data: monthlyBudget } = useCurrentBudgetQuery();
  const [weekIndex, setWeekIndex] = useState(
    edit && monthlyBudget ? getCurrentWeek(monthlyBudget.weeksInMonth) : 0,
  );
  const [newExpenses, setNewExpenses] = useState<BaseEntryForm[]>([]);
  const currentWeekNumber = weekIndex + 1;

  const handleWeekChange = (newIndex: number) => {
    setWeekIndex(newIndex);
    setNewExpenses([]);
  };

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
    newExpenses,
    setNewExpenses,
    handleWeekChange,
    weeklyExpenses,
    remainingWeeklyBudget,
    currentWeekNumber,
  };
};
