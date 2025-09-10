import { CurrentBudgetLayout } from "@/components/features/dashboard/CurrentBudgetLayout";
import { useBudgetStore } from "@/stores/budgetStore";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const currentBudget = useBudgetStore((s) => s.currentBudget);

  return currentBudget ? (
    <CurrentBudgetLayout budget={currentBudget} />
  ) : (
    <section data-testid="budget-actions-container">
      <Link to="/app/create" className="budget-actions">
        <div className="budget-actions__button">+</div>
        <p className="budget-actions__text">Commencer un nouveau mois</p>
      </Link>

      <Link to="/profile" className="budget-actions">
        <div className="budget-actions__button">+</div>
        <p className="budget-actions__text">Mes revenus et charges fixes</p>
      </Link>
    </section>
  );
};
