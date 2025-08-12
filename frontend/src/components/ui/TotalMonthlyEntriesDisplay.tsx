import { TotalMonthlyEntriesProps } from "@/types";

export const TotalMonthlyEntriesDisplay = ({
  type,
  total,
}: TotalMonthlyEntriesProps) => {
  return (
    <div>
      <p>Total {type}</p>
      <p className="total-budget">
        <span>€</span>
        {total.toFixed(2)}
      </p>
    </div>
  );
};
