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
      weeks.push({ start: weekStart, end: weekEnd });
    }

    current = addDays(weekStart, 7);
  }

  return weeks;
};
