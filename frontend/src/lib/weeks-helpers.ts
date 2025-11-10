import { useBudgetStore } from "@/stores/budgetStore";
import { WeekProps } from "@/types";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export const getWeeksInMonth = (year: number, month: number): WeekProps[] => {
  const firstDayOfMonth = startOfMonth(new Date(year, month - 1));
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);

  let current = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  const end = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

  const weeks: WeekProps[] = [];

  while (current <= end) {
    let weekStart = current;
    let weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    let daysInMonth = 0;
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      if (isSameMonth(day, firstDayOfMonth)) {
        daysInMonth++;
      }
    }

    if (daysInMonth >= 4) {
      weeks.push({
        start: new Date(weekStart).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        }),
        end: new Date(weekEnd).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        }),
      });
    }

    current = addDays(weekStart, 7);
  }

  return weeks;
};

export const getCurrentWeek = () => {
  const weeksInMonth = useBudgetStore((s) => s.weeksInMonth);
  const currentDay = Number(new Date().toLocaleDateString("fr-FR").slice(0, 2));

  const currentWeekIndex = weeksInMonth.findIndex(
    (w) =>
      Number(w.start.slice(0, 2)) <= currentDay &&
      Number(w.end.slice(0, 2)) >= currentDay
  );

  if (!currentWeekIndex || currentWeekIndex === -1) {
    return 0;
  }
  return currentWeekIndex;
};
