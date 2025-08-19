import { TotalDataDisplayProps } from "@/types";

export const TotalDataDisplay = ({
  total,
  title = "Total",
}: TotalDataDisplayProps) => {
  return (
    <div className="total-data">
      <p>{title}</p>
      <p className="total-data__amount">
        <span>€</span>
        {total.toFixed(2)}
      </p>
    </div>
  );
};
