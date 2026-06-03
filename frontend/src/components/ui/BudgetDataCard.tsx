import { BudgetDataCardProps } from "@/types";
export const BudgetDataCard = ({
  title,
  children,
  color = "white",
}: BudgetDataCardProps) => {
  return (
    <article className="data-card" data-testid="budget-data">
      <div className={`data-card__title ${color}`}>
        <p data-testid="budget-data-title">{title}</p>
      </div>
      <div className="data-card__content">{children}</div>
    </article>
  );
};
