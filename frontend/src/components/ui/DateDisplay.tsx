import { useBudgetStore } from "@/stores/budgetStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateDisplayProps } from "@/types";
import { getWeeksInMonth } from "@/lib/weeks-helpers";
import { useMemo } from "react";
import { useCurrentBudgetQuery } from "@/hooks/queries";

export const DateDisplay = ({
  weekIndex,
  setIndex,
  isCurrentBudget,
  oldMonth,
  oldYear,
}: DateDisplayProps) => {
  const { data } = useCurrentBudgetQuery();
  const weeks = isCurrentBudget
    ? data?.weeksInMonth
    : oldYear !== undefined && oldMonth !== undefined
    ? getWeeksInMonth(oldYear, oldMonth)
    : undefined;

  if (!weeks) return;
  const formattedWeeks = useMemo(
    () =>
      weeks.map((w) => ({
        start: w.start.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        }),
        end: w.end.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        }),
      })),
    [weeks]
  );

  return (
    <div className="week-selector">
      <button
        onClick={() => setIndex(Math.max(weekIndex - 1, 0))}
        disabled={weekIndex === 0}
        aria-label="Afficher la semaine précédente"
      >
        <ChevronLeft className="week-selector__icon" />
      </button>
      <span>{`du ${formattedWeeks[weekIndex].start} au ${formattedWeeks[weekIndex].end}`}</span>
      <button
        onClick={() => setIndex(Math.min(weekIndex + 1, weeks.length - 1))}
        disabled={weekIndex === weeks.length - 1}
        aria-label="Afficher la semaine suivante"
      >
        <ChevronRight className="week-selector__icon" />
      </button>
    </div>
  );
};
