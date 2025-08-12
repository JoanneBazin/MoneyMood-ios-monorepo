import { useBudgetStore } from "@/stores/budgetStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateDisplayProps } from "@/types";
import { getWeeksInMonth } from "@/lib/getWeeksInMonth";

export const DateDisplay = ({
  weekIndex,
  setIndex,
  isCurrentBudget,
  oldMonth,
  oldYear,
}: DateDisplayProps) => {
  const weeks = isCurrentBudget
    ? useBudgetStore((s) => s.weeksInMonth)
    : oldYear !== undefined && oldMonth !== undefined
    ? getWeeksInMonth(oldYear, oldMonth)
    : undefined;

  if (!weeks) return;

  return (
    <div className="week-selector">
      <button
        onClick={() => setIndex(Math.max(weekIndex - 1, 0))}
        disabled={weekIndex === 0}
        aria-label="Afficher la semaine précédente"
      >
        <ChevronLeft className="week-selector__icon" />
      </button>
      <span>
        du{" "}
        {new Date(weeks[weekIndex].start).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        })}{" "}
        au{" "}
        {new Date(weeks[weekIndex].end).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        })}
      </span>
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
