import { useFixedChargesQuery, useFixedIncomesQuery } from "@/hooks/queries";
import { AddMonthlyBudgetForm } from "@/components/forms";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { InfoMessage } from "@/components/ui";
import { usePageTitle } from "@/hooks/usePageTitle";

export const CreateBudget = () => {
  const { data: charges = [] } = useFixedChargesQuery();
  const { data: incomes = [] } = useFixedIncomesQuery();
  const { isOffline } = useOfflineStatus();

  usePageTitle("Ajouter un budget mensuel");

  return (
    <section className="create-section">
      {isOffline ? (
        <InfoMessage message="Impossible de créer un nouveau budget en mode hors-ligne" />
      ) : (
        <AddMonthlyBudgetForm incomes={incomes} charges={charges} />
      )}
    </section>
  );
};
