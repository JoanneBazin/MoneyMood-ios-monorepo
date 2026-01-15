import { formatDateTitle } from "@/lib/formatDateTitle";
import { HistoryCardProps } from "@/types";
import { Link } from "react-router-dom";

export const HistoryCard = ({ data }: HistoryCardProps) => {
  const dateTitle = formatDateTitle(data.year, data.month);
  const title = dateTitle.charAt(0).toUpperCase() + dateTitle.slice(1);
  return (
    <div className="history-card" data-testid="history-card">
      <p className="history-card__title">{title}</p>
      <div className="history-card__sold">
        <p>Solde</p>
        <p className="history-card__amount">
          <span>€</span>
          {data.remainingBudget}
        </p>
      </div>
      <Link
        to={`/app/history/${data.id}`}
        className="history-card__read"
        data-testid="history-details-btn"
      >
        consulter
      </Link>
    </div>
  );
};
