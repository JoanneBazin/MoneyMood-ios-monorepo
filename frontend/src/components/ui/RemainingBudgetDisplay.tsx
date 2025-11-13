import { RemainingBudgetDisplayProps } from "@/types";

export const RemainingBudgetDisplay = ({
  type,
  total,
  base,
}: RemainingBudgetDisplayProps) => {
  return (
    <div className={base ? "total-secondary" : ""}>
      <p>{type}</p>
      <p className="total-budget">
        <span>€</span>
        {total.toFixed(2)}
      </p>
    </div>
  );
};
