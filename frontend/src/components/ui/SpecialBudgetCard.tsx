import { SpecialBudgetCardProps } from "@/types";
import { Link } from "react-router-dom";

export const SpecialBudgetCard = ({ data }: SpecialBudgetCardProps) => {
  return (
    <Link to={`/app/projects/${data.id}`} className="special-budget-card">
      <p className="special-budget-card__title">{data.name}</p>
      <p className="special-budget-card__date">{data.createdAt}</p>
    </Link>
  );
};
