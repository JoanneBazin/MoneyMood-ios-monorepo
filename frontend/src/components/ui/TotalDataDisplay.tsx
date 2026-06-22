import { TotalDataDisplayProps } from "@/types";

export const TotalDataDisplay = ({
  total,
  title = "Total",
}: TotalDataDisplayProps) => {
  return (
    <div className="total-data" data-testid="total-data">
      <p>{title}</p>
      <p className="total-data__amount">
        <span>€</span>
        <span data-testid="total-data-amount">{total.toFixed(2)}</span>
      </p>
    </div>
  );
};
