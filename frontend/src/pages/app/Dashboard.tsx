import { CurrentBudgetLayout } from "@/components/features/dashboard/CurrentBudgetLayout";
import { useBudgetStore } from "@/stores/budgetStore";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  return currentBudget ? (
    <CurrentBudgetLayout budget={currentBudget} />
  ) : (
    <section data-testid="budget-actions-container">
      <div className="budget-actions">
        <Link to="/app/create" className="budget-actions__button">
          +
        </Link>
        <p className="budget-actions__text">Commencer un nouveau mois</p>
      </div>

      <div className="budget-actions">
        <Link to="/profile" className="budget-actions__button">
          +
        </Link>
        <p className="budget-actions__text">Mes revenus et charges fixes</p>
      </div>
    </section>
  );
};
